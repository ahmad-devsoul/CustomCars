'use client';

import { useState } from 'react';
import { Menu, X } from 'lucide-react';
import { cn } from '@/libs/utils';
import { useTranslations } from 'next-intl';
import { usePathname, useRouter } from 'next/navigation';
import Link from 'next/link';

export function NavMenu() {
  const router = useRouter();
  const pathname = usePathname();
  const t = useTranslations();
  const [isOpen, setIsOpen] = useState(false);
  const [selectedLang, setSelectedLang] = useState(pathname?.split('/')?.[1]);

  const menuItems = ['HOME', 'SERVICES', 'ABOUT US', 'CONTACT'];

  const handleLanguageChange = (locale: string) => {
    setSelectedLang(locale);
    const segments = pathname.split('/').filter(Boolean);

    // Handle locale at the first segment
    if (['en', 'ar'].includes(segments[0])) {
      segments[0] = locale;
    } else {
      segments.unshift(locale);
    }

    // Construct the new path and navigate
    const newPath = `/${segments.join('/')}`;
    router.push(newPath);
    setTimeout(() => {
      window.location.reload();
    }, 1000);
  };

  const toggleLanguage = () => {
    const newLocale = selectedLang === 'en' ? 'ar' : 'en';
    handleLanguageChange(newLocale);
  };

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className='p-2'
        aria-label='Open menu'
      >
        <Menu className='h-6 w-6' />
      </button>

      {/* Mobile Menu Overlay */}
      <div
        className={cn(
          'fixed inset-0 bg-black/95 z-50 transition-opacity duration-300 lg:w-[25%]',
          isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'
        )}
      >
        <div className='p-4 flex flex-row justify-between items-center'>
          <Link href='/' className='font-bold text-lg cursor-pointer'>
            CUSTOM
          </Link>
          <button
            onClick={() => setIsOpen(false)}
            className='p-2'
            aria-label='Close menu'
          >
            <X className='h-6 w-6 text-white' />
          </button>
        </div>
        <nav className='flex flex-col items-start lg:items-center p-8 space-y-6'>
          {menuItems.map((item) => (
            <a
              key={item}
              href='#'
              className='text-white text-sm hover:text-gray-300 transition-colors'
            >
              {t(item)}
            </a>
          ))}

          <button
            onClick={toggleLanguage}
            className='flex items-center gap-2 text-white hover:opacity-80 transition-opacity'
            aria-label={`Switch to ${
              selectedLang === 'en' ? 'Arabic' : 'English'
            }`}
          >
            <img
              src={`https://flagsapi.com/${
                selectedLang === 'en' ? 'GB' : 'SA'
              }/flat/64.png`}
              alt={selectedLang === 'en' ? 'English' : 'Arabic'}
              className='w-10 h-10 rounded-full object-cover'
            />
          </button>
        </nav>
      </div>
    </>
  );
}
