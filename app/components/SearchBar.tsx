'use client'

import { useState } from 'react'
import { useLanguage } from '@/contexts/LanguageContext'

interface SearchBarProps {
  onTagSelect?: (tag: string | null) => void
}

export default function SearchBar({ onTagSelect }: SearchBarProps) {
  const { language } = useLanguage()
  return (
    <div className="mt-2 border-b border-gray-300 pb-2">
      {language === 'zh'?'按下Ctrl+F搜索':'Press Ctrl+F to search'}
    </div>
  )
}

