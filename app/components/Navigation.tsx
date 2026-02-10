'use client';

import Link from 'next/link';
import Image from 'next/image';

export default function Navigation() {
  const handleLogoClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  const handleSmoothScroll = (e: React.MouseEvent<HTMLAnchorElement>, targetId: string) => {
    e.preventDefault();
    const element = document.querySelector(targetId);
    if (element) {
      element.scrollIntoView({
        behavior: 'smooth',
        block: targetId === '#portfolio' ? 'center' : 'start'
      });
    }
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50">
      <div className="w-full px-4 sm:px-8 md:px-12 pt-4 sm:pt-5 md:pt-6 pb-3 sm:pb-4">
        <div className="flex items-center justify-between">
          <a href="#hero" onClick={handleLogoClick} className="flex items-center cursor-pointer">
            <Image
              src="/logo/white-logo.png"
              alt="Dianne Woods"
              width={260}
              height={80}
              className="h-10 sm:h-12 md:h-14 w-auto"
            />
          </a>
          <div className="flex gap-4 sm:gap-8 md:gap-12 text-xs sm:text-sm md:text-base tracking-wider md:tracking-widest uppercase text-white">
            <a 
              href="#portfolio" 
              onClick={(e) => handleSmoothScroll(e, '#portfolio')}
              className="hover:opacity-60 transition-opacity cursor-pointer"
            >
              Gallery
            </a>
            <a 
              href="#books" 
              onClick={(e) => handleSmoothScroll(e, '#books')}
              className="hover:opacity-60 transition-opacity cursor-pointer"
            >
              Books
            </a>
            <a 
              href="#statement" 
              onClick={(e) => handleSmoothScroll(e, '#statement')}
              className="hover:opacity-60 transition-opacity cursor-pointer"
            >
              Statement
            </a>
          </div>
        </div>
      </div>
    </nav>
  );
}
