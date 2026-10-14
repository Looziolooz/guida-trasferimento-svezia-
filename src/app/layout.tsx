import type { ReactNode } from "react";

/**
 * Root layout volutamente trasparente: <html> e <body> vivono in
 * app/[locale]/layout.tsx, che è l'unico posto dove si conosce la lingua.
 */
export default function RootLayout({ children }: { children: ReactNode }) {
  return children;
}
