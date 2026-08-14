import type { ReactNode } from "react";

type GlassPanelProps = {
  children: ReactNode;
  className?: string;
};

/**
 * A reusable "glass" surface: a soft, translucent, blurred panel that
 * lets Voyara's cinematic background show through. Use this any time a
 * card, form, or block of content needs to feel like it's floating
 * above the backdrop, instead of sitting on a flat page.
 */
export default function GlassPanel({
  children,
  className = "",
}: GlassPanelProps) {
  return <div className={`glass-panel ${className}`}>{children}</div>;
}
