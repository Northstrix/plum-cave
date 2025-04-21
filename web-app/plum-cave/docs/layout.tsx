import { DocsLayout } from "fumadocs-ui/layouts/docs";
import type { ReactNode } from "react";
import { source } from "@/lib/source";

import Image from "next/image";

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <DocsLayout
      tree={source.pageTree}
      sidebar={{
        defaultOpenLevel: 1,
        tabs: {
          transform(option, node) {
            const meta = source.getNodeMeta(node);
            if (!meta) return option;

            return {
              ...option,
              icon: (
                <div
                  className="rounded-md border bg-gradient-to-t from-fd-background/80 p-1 shadow-md [&_svg]:size-5"
                  style={{
                    color: `hsl(var(--${meta.file.dirname}-color))`,
                    backgroundColor: `hsl(var(--${meta.file.dirname}-color)/.3)`,
                  }}
                >
                  {node.icon}
                </div>
              ),
            };
          },
        },
      }}
      nav={{
        title: (
          <div className="flex items-center justify-center gap-2 font-semibold text-sm">
            <Image src="/logo.webp" alt="Plum Cave" width={17} height={17} />
            Plum Cave
          </div>
        ),
        transparentMode: "always",
      }}
    >
      {children}
    </DocsLayout>
  );
}
