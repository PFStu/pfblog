'use client'

import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { useState } from 'react'
import { Menu, X } from 'lucide-react'
import { useLanguage } from '@/contexts/LanguageContext'
import { LanguageToggle } from './LanguageToggle'
import { motion, AnimatePresence } from 'framer-motion'

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const { language } = useLanguage()

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen)

  return (
    <header className="bg-background border-b border-border">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <Link href="/" className="text-2xl font-bold">
          PF Blog
        </Link>
        <nav className="hidden md:flex space-x-4">
          <Button variant="ghost" asChild>
            <Link href="/">{language === 'zh' ? '首页' : 'Home'}</Link>
          </Button>
          <Button variant="ghost" asChild>
            <Link href="/about">{language === 'zh' ? '关于' : 'About'}</Link>
          </Button>
          <Button variant="ghost" asChild>
            <Link href="/contact">{language === 'zh' ? '联系' : 'Contact'}</Link>
          </Button>
          <LanguageToggle />
        </nav>
        <Button variant="ghost" className="md:hidden" onClick={toggleMenu}>
          {isMenuOpen ? <X /> : <Menu />}
        </Button>
      </div>
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            className="md:hidden"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
          >
            <nav className="flex flex-col space-y-2 p-4">
              <Button variant="ghost" asChild onClick={toggleMenu}>
                <Link href="/">{language === 'zh' ? '首页' : 'Home'}</Link>
              </Button>
              <Button variant="ghost" asChild onClick={toggleMenu}>
                <Link href="/about">{language === 'zh' ? '关于' : 'About'}</Link>
              </Button>
              <Button variant="ghost" asChild onClick={toggleMenu}>
                <Link href="/contact">{language === 'zh' ? '联系' : 'Contact'}</Link>
              </Button>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  )
}

