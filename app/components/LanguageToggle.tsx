'use client'

import { useLanguage } from '@/contexts/LanguageContext'
import { Button } from '@/components/ui/button'

export function LanguageToggle() {
  const { language, setLanguage } = useLanguage()

  return (
    <Button
      onClick={() => setLanguage(language === 'zh' ? 'en' : 'zh')}
      variant="outline"
      size="sm"
    >
      {language === 'zh' ? 'EN' : '中文'}
    </Button>
  )
}

