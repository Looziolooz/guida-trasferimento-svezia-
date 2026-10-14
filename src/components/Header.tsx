"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useCallback, useEffect, useState } from "react";
import { Globe, Menu, Moon, Search, Sun, X } from "lucide-react";
import { localeShort, localeNames, locales, type Locale } from "@/lib/locales";
import { useTheme } from "@/lib/client-store";
import type { Dict } from "@/lib/ui";
import { SearchDialog, type SearchEntry } from "./SearchDialog";

type Props = {
  locale: Locale;
  dict: Dict;
  index: SearchEntry[];
};

export function Header({ locale, dict, index }: Props) {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [theme, setTheme] = useTheme();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const onKey = (event: KeyboardEvent) => {
      const target = event.target as HTMLElement | null;
      const typing =
        target &&
        (target.tagName === "INPUT" ||
          target.tagName === "TEXTAREA" ||
          target.isContentEditable);
      if (typing) return;
      if (event.key === "/") {
        event.preventDefault();
        setSearchOpen(true);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  /** Stessa pagina, altra lingua: si sostituisce solo il primo segmento. */
  const swapLocale = useCallback(
    (next: Locale) => {
      const segments = (pathname || `/${locale}`).split("/");
      segments[1] = next;
      return segments.join("/") || `/${next}`;
    },
    [pathname, locale],
  );

  const links = [
    { href: `/${locale}/guide`, label: dict.nav.guides },
    { href: `/${locale}/checklist`, label: dict.nav.checklist },
    { href: `/${locale}/enti`, label: dict.nav.entities },
    { href: `/${locale}/glossario`, label: dict.nav.glossary },
  ];

  const isActive = (href: string) =>
    pathname === href || pathname?.startsWith(`${href}/`);

  return (
    <>
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[60] focus:rounded-full focus:bg-brand focus:px-4 focus:py-2 focus:text-sm focus:text-paper"
      >
        {dict.common.skipToContent}
      </a>

      <header
        className={`fixed inset-x-0 top-0 z-50 transition-colors duration-300 ${
          scrolled
            ? "border-b border-line bg-paper/85 backdrop-blur-xl"
            : "border-b border-transparent bg-paper/40 backdrop-blur-sm"
        }`}
      >
        <div className="mx-auto flex h-16 max-w-6xl items-center gap-3 px-4 sm:px-6 lg:px-8">
          <Link
            href={`/${locale}`}
            className="group flex shrink-0 items-center gap-2.5"
            onClick={() => setMenuOpen(false)}
          >
            <Mark />
            <span className="font-serif text-lg tracking-tight">
              {dict.site.name}
            </span>
          </Link>

          <nav className="ml-auto hidden items-center gap-1 lg:flex">
            {links.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`rounded-full px-3 py-1.5 text-sm transition-colors ${
                  isActive(link.href)
                    ? "bg-brand-soft text-brand-ink"
                    : "text-muted hover:text-ink"
                }`}
              >
                {link.label}
              </Link>
            ))}
          </nav>

          <div className="ml-auto flex items-center gap-1 lg:ml-2">
            <button
              type="button"
              onClick={() => setSearchOpen(true)}
              className="flex items-center gap-2 rounded-full border border-line bg-surface px-3 py-1.5 text-sm text-muted transition-colors hover:text-ink"
              aria-label={dict.common.search}
            >
              <Search className="h-4 w-4" aria-hidden />
              <span className="hidden xl:inline">{dict.common.search}</span>
              <kbd className="hidden rounded border border-line px-1 text-[0.65rem] xl:inline">
                /
              </kbd>
            </button>

            <LocaleMenu
              locale={locale}
              label={dict.nav.language}
              hrefFor={swapLocale}
            />

            <button
              type="button"
              onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
              className="rounded-full border border-transparent p-2 text-muted transition-colors hover:border-line hover:text-ink"
              aria-label={dict.nav.theme}
            >
              {theme === "dark" ? (
                <Sun className="h-4 w-4" aria-hidden />
              ) : (
                <Moon className="h-4 w-4" aria-hidden />
              )}
            </button>

            <button
              type="button"
              onClick={() => setMenuOpen((open) => !open)}
              className="rounded-full border border-transparent p-2 text-muted transition-colors hover:border-line hover:text-ink lg:hidden"
              aria-label={menuOpen ? dict.nav.close : dict.nav.menu}
              aria-expanded={menuOpen}
            >
              {menuOpen ? (
                <X className="h-5 w-5" aria-hidden />
              ) : (
                <Menu className="h-5 w-5" aria-hidden />
              )}
            </button>
          </div>
        </div>

        {menuOpen ? (
          <div className="border-t border-line bg-paper/95 backdrop-blur-xl lg:hidden">
            <nav className="mx-auto flex max-w-6xl flex-col px-4 py-3 sm:px-6">
              {[...links, { href: `/${locale}/info`, label: dict.nav.about }].map(
                (link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    onClick={() => setMenuOpen(false)}
                    className={`rounded-lg px-3 py-2.5 text-sm ${
                      isActive(link.href)
                        ? "bg-brand-soft text-brand-ink"
                        : "text-muted"
                    }`}
                  >
                    {link.label}
                  </Link>
                ),
              )}
            </nav>
          </div>
        ) : null}
      </header>

      {searchOpen ? (
        <SearchDialog
          onClose={() => setSearchOpen(false)}
          locale={locale}
          dict={dict}
          index={index}
        />
      ) : null}
    </>
  );
}

function Mark() {
  return (
    <span
      className="grid h-8 w-8 place-items-center rounded-[0.6rem] bg-brand text-paper"
      aria-hidden
    >
      <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none">
        <path
          d="M6 4.5h9.2L18 7.4V19a.5.5 0 0 1-.5.5h-11A.5.5 0 0 1 6 19V5a.5.5 0 0 1 .5-.5Z"
          stroke="currentColor"
          strokeWidth="1.6"
          strokeLinejoin="round"
        />
        <path
          d="M9 10.5h6M9 13.5h6M9 16.5h3.5"
          stroke="currentColor"
          strokeWidth="1.6"
          strokeLinecap="round"
        />
      </svg>
    </span>
  );
}

function LocaleMenu({
  locale,
  label,
  hrefFor,
}: {
  locale: Locale;
  label: string;
  hrefFor: (next: Locale) => string;
}) {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (!open) return;
    const onClick = () => setOpen(false);
    window.addEventListener("click", onClick);
    return () => window.removeEventListener("click", onClick);
  }, [open]);

  return (
    <div className="relative">
      <button
        type="button"
        onClick={(event) => {
          event.stopPropagation();
          setOpen((value) => !value);
        }}
        className="flex items-center gap-1.5 rounded-full border border-transparent px-2.5 py-2 text-sm text-muted transition-colors hover:border-line hover:text-ink"
        aria-label={label}
        aria-expanded={open}
      >
        <Globe className="h-4 w-4" aria-hidden />
        <span className="font-medium">{localeShort[locale]}</span>
      </button>

      {open ? (
        <div className="absolute right-0 top-full mt-2 w-40 overflow-hidden rounded-xl border border-line bg-surface shadow-lg shadow-ink/5">
          {locales.map((item) => (
            <Link
              key={item}
              href={hrefFor(item)}
              hrefLang={item}
              className={`flex items-center justify-between px-3.5 py-2.5 text-sm transition-colors hover:bg-raised ${
                item === locale ? "text-brand" : "text-ink"
              }`}
            >
              {localeNames[item]}
              <span className="text-xs text-muted">{localeShort[item]}</span>
            </Link>
          ))}
        </div>
      ) : null}
    </div>
  );
}
