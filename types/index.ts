export interface Post {
  slug: string
  title: string
  excerpt: string
  content: string
  date: string
  tags: string[]
  author: string
  lastModified: string
}

export type Language = 'zh' | 'en'
export type Theme = 'light' | 'dark' | 'sepia'

