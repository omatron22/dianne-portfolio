'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';

const NAV_ITEMS: { label: string; target: string; href?: string }[] = [
  { label: 'Gallery', target: '#portfolio' },
  { label: 'Books', target: '#books' },
  { label: 'Film', target: '#film' },
  { label: 'Bio', target: '#bio' },
  { label: 'Contact', target: '', href: 'mailto:diannepwoods@gmail.com' },
];

export default function Navigation() {
  const [menuOpen, setMenuOpen] = useState(false);

  const handleLogoClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    setMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSmoothScroll = (
    e: React.MouseEvent<HTMLAnchorElement>,
    targetId: string
  ) => {
    e.preventDefault();
    setMenuOpen(false);
    const element = document.querySelector(targetId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  // ESC closes the mobile menu, body scroll locks while open.
  useEffect(() => {
    if (!menuOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setMenuOpen(false);
    };
    window.addEventListener('keydown', onKey);
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      window.removeEventListener('keydown', onKey);
      document.body.style.overflow = prevOverflow;
    };
  }, [menuOpen]);

  return (
    <>
      <nav
        className="fixed top-0 left-0 right-0 z-50"
        style={{
          background:
            'linear-gradient(to bottom, rgba(0,0,0,0.45) 0%, rgba(0,0,0,0) 100%)',
        }}
      >
        <div className="w-full px-3 sm:px-8 md:px-12 pt-3 sm:pt-5 md:pt-6 pb-2 sm:pb-4">
          <div className="flex items-center justify-between">
            <a
              href="#hero"
              onClick={handleLogoClick}
              className="flex items-center cursor-pointer"
            >
              <Image
                src="/logo/white-logo.png"
                alt="Dianne Woods"
                width={260}
                height={80}
                className="h-8 sm:h-12 md:h-14 w-auto"
                style={{
                  filter:
                    'drop-shadow(0 0 2px rgba(0,0,0,0.9)) drop-shadow(0 1px 6px rgba(0,0,0,0.5))',
                }}
              />
            </a>

            {/* Desktop nav (sm and up) */}
            <div
              className="hidden sm:flex gap-6 md:gap-12 text-sm md:text-base tracking-wider md:tracking-widest uppercase text-white"
              style={{ fontFamily: 'var(--font-ui), -apple-system, BlinkMacSystemFont, sans-serif' }}
            >
              {NAV_ITEMS.map((item) =>
                item.href ? (
                  <a
                    key={item.label}
                    href={item.href}
                    className="hover:opacity-60 transition-opacity cursor-pointer"
                  >
                    {item.label}
                  </a>
                ) : (
                  <a
                    key={item.label}
                    href={item.target}
                    onClick={(e) => handleSmoothScroll(e, item.target)}
                    className="hover:opacity-60 transition-opacity cursor-pointer"
                  >
                    {item.label}
                  </a>
                )
              )}
            </div>

            {/* Mobile hamburger */}
            <button
              type="button"
              onClick={() => setMenuOpen(true)}
              aria-label="Open menu"
              aria-expanded={menuOpen}
              className="sm:hidden flex flex-col justify-center items-end gap-[5px] p-2 -mr-2"
            >
              <span className="block w-7 h-px bg-white" />
              <span className="block w-7 h-px bg-white" />
              <span className="block w-7 h-px bg-white" />
            </button>
          </div>
        </div>
      </nav>

      {/* Fullscreen mobile menu overlay */}
      {menuOpen && (
        <div
          className="sm:hidden fixed inset-0 z-[100] bg-black flex flex-col"
          role="dialog"
          aria-modal="true"
          aria-label="Site navigation"
        >
          <div className="flex items-center justify-between w-full px-3 pt-3 pb-2">
            <a
              href="#hero"
              onClick={handleLogoClick}
              className="flex items-center cursor-pointer"
            >
              <Image
                src="/logo/white-logo.png"
                alt="Dianne Woods"
                width={260}
                height={80}
                className="h-8 w-auto"
              />
            </a>
            <button
              type="button"
              onClick={() => setMenuOpen(false)}
              aria-label="Close menu"
              className="text-white text-4xl leading-none p-2 -mr-2"
            >
              &times;
            </button>
          </div>
          <div
            className="flex-1 flex flex-col items-center justify-center gap-8 text-white text-2xl tracking-widest uppercase"
            style={{ fontFamily: 'var(--font-ui), -apple-system, BlinkMacSystemFont, sans-serif' }}
          >
            {NAV_ITEMS.map((item) =>
              item.href ? (
                <a
                  key={item.label}
                  href={item.href}
                  onClick={() => setMenuOpen(false)}
                  className="hover:opacity-60 transition-opacity"
                >
                  {item.label}
                </a>
              ) : (
                <a
                  key={item.label}
                  href={item.target}
                  onClick={(e) => handleSmoothScroll(e, item.target)}
                  className="hover:opacity-60 transition-opacity cursor-pointer"
                >
                  {item.label}
                </a>
              )
            )}
          </div>
        </div>
      )}
    </>
  );
}
