import React, { useRef, useEffect } from 'react';
import { Renderer, Program, Mesh, Triangle } from 'ogl';
import styled from 'styled-components';

const vertexShader = `
  attribute vec2 uv;
  attribute vec2 position;
  varying vec2 vUv;
  void main() {
    vUv = uv;
    gl_Position = vec4(position, 0, 1);
  }
`;

const fragmentShader = `
  precision highp float;
  #define PI 3.14159265359
  uniform float iTime;
  uniform vec3 iResolution;
  uniform float uSpinRotation;
  uniform float uSpinSpeed;
  uniform vec2 uOffset;
  uniform vec4 uColor1;
  uniform vec4 uColor2;
  uniform vec4 uColor3;
  uniform float uContrast;
  uniform float uLighting;
  uniform float uSpinAmount;
  uniform float uPixelFilter;
  uniform float uSpinEase;
  uniform bool uIsRotate;
  uniform vec2 uMouse;
  varying vec2 vUv;

  vec4 effect(vec2 screenSize, vec2 screen_coords) {
    float pixel_size = length(screenSize.xy) / uPixelFilter;
    vec2 uv = (floor(screen_coords.xy * (1.0 / pixel_size)) * pixel_size - 0.5 * screenSize.xy) / length(screenSize.xy) - uOffset;
    float uv_len = length(uv);
    float speed = (uSpinRotation * uSpinEase * 0.2);
    if(uIsRotate){
      speed = iTime * speed;
    }
    speed += 302.2;
    float mouseInfluence = (uMouse.x * 2.0 - 1.0);
    speed += mouseInfluence * 0.1;
    float new_pixel_angle = atan(uv.y, uv.x) + speed - uSpinEase * 20.0 * (uSpinAmount * uv_len + (1.0 - uSpinAmount));
    vec2 mid = (screenSize.xy / length(screenSize.xy)) / 2.0;
    uv = (vec2(uv_len * cos(new_pixel_angle) + mid.x, uv_len * sin(new_pixel_angle) + mid.y) - mid);
    uv *= 30.0;
    float baseSpeed = iTime * uSpinSpeed;
    speed = baseSpeed + mouseInfluence * 2.0;
    vec2 uv2 = vec2(uv.x + uv.y);
    for(int i = 0; i < 5; i++) {
      uv2 += sin(max(uv.x, uv.y)) + uv;
      uv += 0.5 * vec2(cos(5.1123314 + 0.353 * uv2.y + speed * 0.131121), sin(uv2.x - 0.113 * speed));
      uv -= cos(uv.x + uv.y) - sin(uv.x * 0.711 - uv.y);
    }
    float contrast_mod = (0.25 * uContrast + 0.5 * uSpinAmount + 1.2);
    float paint_res = min(2.0, max(0.0, length(uv) * 0.035 * contrast_mod));
    float c1p = max(0.0, 1.0 - contrast_mod * abs(1.0 - paint_res));
    float c2p = max(0.0, 1.0 - contrast_mod * abs(paint_res));
    float c3p = 1.0 - min(1.0, c1p + c2p);
    float light = (uLighting - 0.2) * max(c1p * 5.0 - 4.0, 0.0) + uLighting * max(c2p * 5.0 - 4.0, 0.0);
    return (0.3 / uContrast) * uColor1 + (1.0 - 0.3 / uContrast) * (uColor1 * c1p + uColor2 * c2p + vec4(c3p * uColor3.rgb, c3p * uColor1.a)) + light;
  }

  void main() {
    vec2 uv = vUv * iResolution.xy;
    gl_FragColor = effect(iResolution.xy, uv);
  }
`;

function hexToVec4(hex: string) {
  let hexStr = hex.replace('#', '');
  let r = 0, g = 0, b = 0, a = 1;
  if (hexStr.length === 6) {
    r = parseInt(hexStr.slice(0, 2), 16) / 255;
    g = parseInt(hexStr.slice(2, 4), 16) / 255;
    b = parseInt(hexStr.slice(4, 6), 16) / 255;
  } else if (hexStr.length === 8) {
    r = parseInt(hexStr.slice(0, 2), 16) / 255;
    g = parseInt(hexStr.slice(2, 4), 16) / 255;
    b = parseInt(hexStr.slice(4, 6), 16) / 255;
    a = parseInt(hexStr.slice(6, 8), 16) / 255;
  }
  return [r, g, b, a];
}

export const Balatro = ({
  spinRotation = -3.0,
  spinSpeed = 7.0,
  offset = [0.0, 0.0],
  color1 = '#A43BEC',
  color2 = '#603DEC',
  color3 = '#151419',
  contrast = 4,
  lighting = 0.4,
  spinAmount = 0.25,
  pixelFilter = 745.0,
  spinEase = 1.0,
  isRotate = false,
  mouseInteraction = true,
}: {
  spinRotation?: number;
  spinSpeed?: number;
  offset?: [number, number];
  color1?: string;
  color2?: string;
  color3?: string;
  contrast?: number;
  lighting?: number;
  spinAmount?: number;
  pixelFilter?: number;
  spinEase?: number;
  isRotate?: boolean;
  mouseInteraction?: boolean;
}) => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;
    const container = containerRef.current;
    const renderer = new Renderer();
    const gl = renderer.gl;
    gl.clearColor(0, 0, 0, 0);
    let program: Program;

    function resize() {
      renderer.setSize(container.offsetWidth, container.offsetHeight);
      if (program) {
        program.uniforms.iResolution.value = [
          gl.canvas.width,
          gl.canvas.height,
          gl.canvas.width / gl.canvas.height,
        ];
      }
    }

    window.addEventListener('resize', resize);
    resize();

    const geometry = new Triangle(gl);
    program = new Program(gl, {
      vertex: vertexShader,
      fragment: fragmentShader,
      uniforms: {
        iTime: { value: 0 },
        iResolution: { value: [gl.canvas.width, gl.canvas.height, gl.canvas.width / gl.canvas.height] },
        uSpinRotation: { value: spinRotation },
        uSpinSpeed: { value: spinSpeed },
        uOffset: { value: offset },
        uColor1: { value: hexToVec4(color1) },
        uColor2: { value: hexToVec4(color2) },
        uColor3: { value: hexToVec4(color3) },
        uContrast: { value: contrast },
        uLighting: { value: lighting },
        uSpinAmount: { value: spinAmount },
        uPixelFilter: { value: pixelFilter },
        uSpinEase: { value: spinEase },
        uIsRotate: { value: isRotate },
        uMouse: { value: [0.5, 0.5] },
      },
    });

    const mesh = new Mesh(gl, { geometry, program });
    let animationFrameId: number;

    function update(time: number) {
      animationFrameId = requestAnimationFrame(update);
      program.uniforms.iTime.value = time * 0.0008;
      renderer.render({ scene: mesh });
    }

    animationFrameId = requestAnimationFrame(update);
    container.appendChild(gl.canvas);

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', resize);
      container.removeChild(gl.canvas);
      gl.getExtension('WEBGL_lose_context')?.loseContext();
    };
  }, [
    spinRotation,
    spinSpeed,
    offset,
    color1,
    color2,
    color3,
    contrast,
    lighting,
    spinAmount,
    pixelFilter,
    spinEase,
    isRotate,
    mouseInteraction,
  ]);

  return <div ref={containerRef} className="absolute inset-0" style={{ outline: '1px solid var(--lightened-background-adjacent-color)' }} />;
};

export const Section = styled.div<{ id: string }>`
  display: flex;
  flex-direction: column;
  align-items: center;
  height: calc(100vh - 69px);
`;

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0px;
  justify-content: flex-start;
  align-items: stretch;
  width: 100%;
  max-width: 1200px;
  position: relative;
  height: calc(100vh - 69px);
`;

export const addRTLProps = (props: any, isRTL: boolean) => ({
    ...props,
    desktopTextAlign: isRTL ? ('right' as const) : ('left' as const),
    textDirection: isRTL ? ('rtl' as const) : ('ltr' as const),
});

export const headlineProps = {
textColor: 'var(--foreground)',
desktopPadding: { left: '20px', right: '20px', top: '0px', bottom: '0px' },
mobilePadding: { left: '4px', right: '4px', top: '0px', bottom: '0px' },
desktopFontSize: '56px',
mobileFontSize: '32px',
};

export const textProps = {
textColor: 'var(--foreground)',
desktopPadding: { left: '23px', right: '23px', top: '6px', bottom: '24px' },
mobilePadding: { left: '10px', right: '10px', top: '3px', bottom: '16px' },
desktopFontSize: '18px',
mobileFontSize: '14px',
};

export const contentProps = {
textColor: 'var(--foreground)',
desktopPadding: { left: '24px', right: '24px', top: '2px', bottom: '40px' },
mobilePadding: { left: '10px', right: '10px', top: '0px', bottom: '40px' },
desktopFontSize: '18px',
mobileFontSize: '14px',
};

export const BalatroContentContainer = styled.div<{}>`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 16px;
    padding: 24px;
    background-color: var(--card-background);
    outline: 1px solid var(--lightened-background-adjacent-color);
    width: 100%;
    height: 184px;
    z-index: 1;
`;

export const PaddinglessDiv = styled.div`
  padding: 0;
`;

export interface IntegrityMessage {
  success: boolean;
  text: string;
}