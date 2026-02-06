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
        block: 'start'
      });
    }
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50">
      <div className="w-full px-12 pt-6 pb-4">
        <div className="flex items-center justify-between">
          <a href="#hero" onClick={handleLogoClick} className="flex items-center cursor-pointer">
            <Image
              src="/logo/white-logo.png"
              alt="Dianne Woods"
              width={200}
              height={60}
              className="h-12 w-auto"
            />
          </a>
          <div className="flex gap-12 text-base tracking-widest uppercase text-white">
            <a 
              href="#portfolio" 
              onClick={(e) => handleSmoothScroll(e, '#portfolio')}
              className="hover:opacity-60 transition-opacity cursor-pointer"
            >
              Portfolio
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
