'use client'

import { useState } from 'react'
import { ChevronDown, Menu, X } from 'lucide-react'
import { cn } from '@/libs/utils'
import { useTranslations } from 'next-intl'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '../UI/Dropdown'
import { usePathname, useRouter } from 'next/navigation'

export function NavMenu() {
  const router = useRouter();
  const pathname = usePathname();
  const t = useTranslations()
  const [isOpen, setIsOpen] = useState(false)
  const [selectedLang, setSelectedLang] = useState(pathname?.split('/')?.[1])

  const menuItems = ['HOME', 'SERVICES', 'ABOUT US', 'CONTACT']

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
      window.location.reload()
    }, 1000)
  };
  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className="p-2"
        aria-label="Open menu"
      >
        <Menu className="h-6 w-6" />
      </button>

      {/* Mobile Menu Overlay */}
      <div
        className={cn(
          "fixed inset-0 bg-black/95 z-50 transition-opacity duration-300 lg:w-[25%]",
          isOpen ? "opacity-100" : "opacity-0 pointer-events-none"
        )}
      >
        <div className="p-4 flex justify-end">
          <button
            onClick={() => setIsOpen(false)}
            className="p-2"
            aria-label="Close menu"
          >
            <X className="h-6 w-6 text-white" />
          </button>
        </div>
        <nav className="flex flex-col items-start lg:items-center p-8 space-y-6">
          {menuItems.map((item) => (
            <a
              key={item}
              href="#"
              className="text-white text-sm hover:text-gray-300 transition-colors"
            >
              {t(item)}
            </a>
          ))}
        <DropdownMenu>
          <DropdownMenuTrigger className="flex items-center gap-1 text-sm hover:text-gray-300 transition-colors">
            {selectedLang}
            <ChevronDown className="h-4 w-4" />
          </DropdownMenuTrigger>
          <DropdownMenuContent
            className="w-40 bg-zinc-900 border-zinc-800"
          >
            <DropdownMenuItem
              onClick={() => handleLanguageChange('en')}
              className="text-sm text-white hover:bg-zinc-800 focus:bg-zinc-800 cursor-pointer"
            >
              en
            </DropdownMenuItem>
            <DropdownMenuItem
              onClick={() => handleLanguageChange('ar')}
              className="text-sm text-white hover:bg-zinc-800 focus:bg-zinc-800 cursor-pointer"
            >
              ar
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
        </nav>
      </div>
    </>
  )
}

