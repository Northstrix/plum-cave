"use client";
import React from 'react';
import { useTranslation } from 'react-i18next';
import HalomotButton from '@/components/HalomotButton/HalomotButton';
import { isRTLCheck } from "@/components/utils";

interface CreditModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const CreditModal: React.FC<CreditModalProps> = ({ isOpen, onClose }) => {
  const { t, i18n } = useTranslation();
  const isRTL = i18n.language === 'he';

  if (!isOpen) return null;

  return (
    <div style={{
      position: 'fixed',
      top: 0,
      left: 0,
      width: '100%',
      height: '100%',
      background: "rgba(21, 20, 25, 0.7)",
      backdropFilter: "blur(10px) saturate(90%)",
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      zIndex: 1000001,
    }}>
      <div style={{
        backgroundColor: 'var(--card-background)',
        padding: '2em',
        width: '80%',
        maxWidth: '600px',
        maxHeight: '90vh', // Add this line
        boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
        outline: '1px solid var(--lightened-background-adjacent-color)',
        overflowY: 'auto', // Add this line to enable scrolling if content overflows
      }}>
        <h2 style={{ textAlign: 'center', marginBottom: '1em', fontSize: '2em', fontWeight: 700, color: 'var(--foreground)' }}>{t('credit')}</h2>
        <p
          style={{
            textAlign: 'center',
            marginBottom: '2em',
            color: 'var(--foreground)',
            direction: isRTLCheck(t('credit-text')) ? 'rtl' : 'ltr'
          }}
        >
          {t('credit-text')}
        </p>

        <div style={{ maxHeight: '400px', overflowY: 'auto', paddingRight: '1em', lineHeight: 1.75 }}>
          <ul style={{ listStyleType: 'none', padding: 0 }}>
            <li>
              <a className="hover-link1" href="https://codepen.io/stefanjudis/pen/ByBbNGQ" target="_blank" rel="noopener noreferrer">
                View transitions - Demo
              </a> by <a className="hover-link2" href="https://codepen.io/stefanjudis" target="_blank" rel="noopener noreferrer">Stefan Judis</a>
            </li>
            <li>
              <a className="hover-link1" href="https://codepen.io/jkantner/pen/OJKZxpv" target="_blank" rel="noopener noreferrer">
                Toolbars With Sliding Selection
              </a> by <a className="hover-link2" href="https://codepen.io/jkantner" target="_blank" rel="noopener noreferrer">Jon Kantner</a>
            </li>
            <li>
              <a className="hover-link1" href="https://codepen.io/yudizsolutions/pen/YzgXvZJ" target="_blank" rel="noopener noreferrer">
                Gsap Slider
              </a> by <a className="hover-link2" href="https://codepen.io/yudizsolutions" target="_blank" rel="noopener noreferrer">Yudiz Solutions Limited</a>
            </li>
            <li>
              <a className="hover-link1" href="https://codepen.io/uchihaclan/pen/NWOyRWy" target="_blank" rel="noopener noreferrer">
                BUTTONS
              </a> by <a className="hover-link2" href="https://codepen.io/uchihaclan" target="_blank" rel="noopener noreferrer">TAYLOR</a>
            </li>
            <li>
              <a className="hover-link1" href="https://codepen.io/inescodes/pen/PoxMyvX" target="_blank" rel="noopener noreferrer">
                glowy hover effect
              </a> by <a className="hover-link2" href="https://codepen.io/inescodes" target="_blank" rel="noopener noreferrer">Ines</a>
            </li>
            <li>
              <a className="hover-link1" href="https://animata.design/docs/text/counter" target="_blank" rel="noopener noreferrer">
                Counter
              </a> by <a className="hover-link2" href="https://animata.design/" target="_blank" rel="noopener noreferrer">ANIMATA</a>
            </li>
            <li>
              <a className="hover-link1" href="https://hextaui.com/docs/animation/spotlight-card" target="_blank" rel="noopener noreferrer">
                Spotlight Card
              </a> by <a className="hover-link2" href="https://hextaui.com/" target="_blank" rel="noopener noreferrer">HextaUI</a>
            </li>
            <li>
              <a className="hover-link1" href="https://lottiefiles.com/free-animation/security-u7W7BaP6gT" target="_blank" rel="noopener noreferrer">
                Free Security Animation
              </a> by <a className="hover-link2" href="https://lottiefiles.com/7jj0km154m2utqnk" target="_blank" rel="noopener noreferrer">DE GUZMAN, Jalei</a>
            </li>
            <li>
              <a className="hover-link1" href="https://lottiefiles.com/free-animation/lock-key-animation-uxf8dq5CHo" target="_blank" rel="noopener noreferrer">
                Free Lock-Key_Animation Animation
              </a> by <a className="hover-link2" href="https://lottiefiles.com/animoox" target="_blank" rel="noopener noreferrer">Abdul Latif</a>
            </li>
            <li>
              <a className="hover-link1" href="https://lottiefiles.com/free-animation/uploading-to-cloud-VWQJD1A1A0" target="_blank" rel="noopener noreferrer">
                Free Uploading to cloud Animation
              </a> by <a className="hover-link2" href="https://lottiefiles.com/colorstreak" target="_blank" rel="noopener noreferrer">Nazar</a>
            </li>
            <li>
              <a className="hover-link1" href="https://lottiefiles.com/free-animation/share-icon-waiting-XFgEc5GoTG" target="_blank" rel="noopener noreferrer">
                Free Share icon waiting Animation
              </a> by <a className="hover-link2" href="https://lottiefiles.com/jjjoven" target="_blank" rel="noopener noreferrer">jjjoven</a>
            </li>
            <li>
              <a className="hover-link1" href="https://codepen.io/Juxtopposed/pen/mdQaNbG" target="_blank" rel="noopener noreferrer">
                Text scroll and hover effect with GSAP and clip
              </a> by <a className="hover-link2" href="https://codepen.io/Juxtopposed" target="_blank" rel="noopener noreferrer">Juxtopposed</a>
            </li>
            <li>
              <a className="hover-link1" href="https://github.com/tabler/tabler-icons" target="_blank" rel="noopener noreferrer">
                tabler-icons
              </a> by <a className="hover-link2" href="https://github.com/tabler" target="_blank" rel="noopener noreferrer">tabler</a>
            </li>
            <li>
              <a className="hover-link1" href="https://github.com/lucide-icons/lucide" target="_blank" rel="noopener noreferrer">
                lucide
              </a> by <a className="hover-link2" href="https://github.com/lucide-icons" target="_blank" rel="noopener noreferrer">lucide-icons</a>
            </li>
            <li>
              <a className="hover-link1" href="https://github.com/fkhadra/react-toastify" target="_blank" rel="noopener noreferrer">
                react-toastify
              </a> by <a className="hover-link2" href="https://github.com/fkhadra" target="_blank" rel="noopener noreferrer">Fadi Khadra</a>
            </li>
            <li>
              <a className="hover-link1" href="https://github.com/sweetalert2/sweetalert2" target="_blank" rel="noopener noreferrer">
                sweetalert2
              </a> by <a className="hover-link2" href="https://github.com/sweetalert2" target="_blank" rel="noopener noreferrer">sweetalert2</a>
            </li>
            <li>
              <a className="hover-link1" href="https://github.com/i18next/react-i18next" target="_blank" rel="noopener noreferrer">
                react-i18next
              </a> by <a className="hover-link2" href="https://github.com/i18next" target="_blank" rel="noopener noreferrer">i18next</a>
            </li>
            <li>
              <a className="hover-link1" href="https://github.com/Daninet/hash-wasm" target="_blank" rel="noopener noreferrer">
                hash-wasm
              </a> by <a className="hover-link2" href="https://github.com/Daninet" target="_blank" rel="noopener noreferrer">Daninet</a>
            </li>
            <li>
              <a className="hover-link1" href="https://github.com/firebase/firebase-js-sdk" target="_blank" rel="noopener noreferrer">
                firebase-js-sdk
              </a> by <a className="hover-link2" href="https://github.com/firebase" target="_blank" rel="noopener noreferrer">firebase</a>
            </li>
            <li>
              <a className="hover-link1" href="https://github.com/mpaland/mipher" target="_blank" rel="noopener noreferrer">
                mipher
              </a> by <a className="hover-link2" href="https://github.com/mpaland" target="_blank" rel="noopener noreferrer">mpaland</a>
            </li>
            <li>
              <a className="hover-link1" href="https://github.com/dajiaji/crystals-kyber-js" target="_blank" rel="noopener noreferrer">
                crystals-kyber-js
              </a> by <a className="hover-link2" href="https://github.com/dajiaji" target="_blank" rel="noopener noreferrer">dajiaji</a>
            </li>
            <li>
              <a className="hover-link1" href="https://ui.aceternity.com/components/file-upload" target="_blank" rel="noopener noreferrer">
                File Upload
              </a> by <a className="hover-link2" href="https://ui.aceternity.com/" target="_blank" rel="noopener noreferrer">Aceternity UI</a>
            </li>
            <li>
              <a className="hover-link1" href="https://ui.aceternity.com/components/animated-tooltip" target="_blank" rel="noopener noreferrer">
                Animated Tooltip
              </a> by <a className="hover-link2" href="https://ui.aceternity.com/" target="_blank" rel="noopener noreferrer">Aceternity UI</a>
            </li>
            <li>
              <a className="hover-link1" href="https://codepen.io/FlorinPop17/pen/yLyzmLZ" target="_blank" rel="noopener noreferrer">
                Custom Progress Bar
              </a> by <a className="hover-link2" href="https://codepen.io/FlorinPop17" target="_blank" rel="noopener noreferrer">Florin Pop</a>
            </li>
            <li>
              <a className="hover-link1" href="https://codepen.io/ash_creator/pen/zYaPZLB" target="_blank" rel="noopener noreferrer">
                すりガラスなプロフィールカード
              </a> by <a className="hover-link2" href="https://codepen.io/ash_creator" target="_blank" rel="noopener noreferrer">あしざわ - Webクリエイター</a>
            </li>
            <li>
              <a className="hover-link1" href="https://ui.aceternity.com/components/signup-form" target="_blank" rel="noopener noreferrer">
                Signup Form
              </a> by <a className="hover-link2" href="https://ui.aceternity.com/" target="_blank" rel="noopener noreferrer">Aceternity UI</a>
            </li>
            <li>
              <a className="hover-link1" href="https://codepen.io/ajlohman/pen/GRWYWw" target="_blank" rel="noopener noreferrer">
                CSS table
              </a> by <a className="hover-link2" href="https://codepen.io/ajlohman" target="_blank" rel="noopener noreferrer">Andrew Lohman</a>
            </li>
            <li>
              <a className="hover-link1" href="https://github.com/motiondivision/motion" target="_blank" rel="noopener noreferrer">
                motion
              </a> by <a className="hover-link2" href="https://github.com/motiondivision" target="_blank" rel="noopener noreferrer">motiondivision</a>
            </li>
            <li>
              <a className="hover-link1" href="https://github.com/greensock/GSAP" target="_blank" rel="noopener noreferrer">
                GSAP
              </a> by <a className="hover-link2" href="https://github.com/greensock" target="_blank" rel="noopener noreferrer">greensock</a>
            </li>
            <li>
              <a className="hover-link1" href="https://github.com/oframe/ogl" target="_blank" rel="noopener noreferrer">
                ogl
              </a> by <a className="hover-link2" href="https://github.com/oframe" target="_blank" rel="noopener noreferrer">oframe</a>
            </li>
            <li>
              <a className="hover-link1" href="https://codepen.io/haja-ran/pen/xxWRKNm" target="_blank" rel="noopener noreferrer">
                Bouncing Cube Loader
              </a> by <a className="hover-link2" href="https://codepen.io/haja-ran" target="_blank" rel="noopener noreferrer">Haja Randriakoto</a>
            </li>
            <li>
              <a className="hover-link1" href="https://codepen.io/zzznicob/pen/GRPgKLM" target="_blank" rel="noopener noreferrer">
                JTB studios - Link
              </a> by <a className="hover-link2" href="https://codepen.io/zzznicob" target="_blank" rel="noopener noreferrer">Nico</a>
            </li>
            <li>
              <a className="hover-link1 link-perplexity" href="https://www.perplexity.ai/" target="_blank" rel="noopener noreferrer">
                Perplexity
              </a>
            </li>
            <li>
              <a className="hover-link1 link-mistral" href="https://chat.mistral.ai/chat" target="_blank" rel="noopener noreferrer">
                Mistral's Le Chat
              </a>
            </li>
            <li>
              Used <a className="hover-link2" href="https://namer-ui.netlify.app/" target="_blank" rel="noopener noreferrer">Namer UI</a> components:
              <ul style={{ listStyleType: 'none', paddingLeft: '1em', textAlign: 'left' }}>
                <li>Halomot Button</li>
                <li>Fancy Hero Section</li>
                <li>Pricing Card</li>
                <li>Fancy Navbar</li>
                <li>Dreamy Input</li>
                <li>Structured Block</li>
                <li>Unfolding Sidebar</li>
                <li>Random Number Generator</li>
                <li>File Encrypter</li>
              </ul>
            </li>
          </ul>
        </div>
        <div style={{ textAlign: 'center', marginTop: '2em' }}>
          <HalomotButton
            text={t('ok_button')}
            onClick={onClose}
            gradient={
              isRTL
                ? 'linear-gradient(to right, var(--second-theme-color), var(--first-theme-color))'
                : 'linear-gradient(to right, var(--first-theme-color), var(--second-theme-color))'
            }
            fillWidth
          />
        </div>
      </div>
      <style jsx>{`
        .hover-link1,
        .hover-link2 {
          color: var(--foreground);
          text-decoration: none;
          position: relative;
          transition: color 0.3s ease-in-out;
        }
        .hover-link1::before,
        .hover-link2::before {
          position: absolute;
          content: '';
          width: 100%;
          height: 1px;
          background-color: var(--foreground);
          transform: scale(1, 1);
          transition: background-color 0.3s ease-in-out, transform 0.3s ease-in-out;
          bottom: 0px;
        }
        li {
          color: var(--foreground);
        }
        .hover-link1:hover {
          color: ${isRTL ? '#9077f2' : '#bd65f7'};
        }
        .hover-link2:hover {
          color: ${isRTL ? '#bd65f7' : '#9077f2'};
        }
        .hover-link1:hover::before {
          transform: scaleX(0);
        }
        .hover-link2:hover::before {
          transform: scaleX(0);
        }
        .link-perplexity:hover {
          color: #20b8cd;
        }
        .link-mistral:hover {
          color: #fa520f;
        }
      `}</style>
    </div>
  );
};

export default CreditModal;
