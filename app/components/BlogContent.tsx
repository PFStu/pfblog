'use client'

import { useState, useEffect } from 'react'
import { Post } from '@/types'
import PostCard from './PostCard'
import SearchBar from './SearchBar'
import { ThemeToggle } from './ThemeToggle'
import { Button } from '@/components/ui/button'
import { motion } from 'framer-motion'
import { useLanguage } from '@/contexts/LanguageContext'

export default function BlogContent({ initialPosts }: { initialPosts: Post[] }) {
  const { language } = useLanguage()
  const [posts, setPosts] = useState<Post[]>(initialPosts)
  const [sortBy, setSortBy] = useState<'date' | 'title'>('date')
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('desc')
  const [selectedTag, setSelectedTag] = useState<string | null>(null)

  useEffect(() => {
    const sortedAndFilteredPosts = initialPosts
      .filter(post => !selectedTag || post.tags.includes(selectedTag))
      .sort((a, b) => {
        if (sortBy === 'date') {
          return sortOrder === 'asc' 
            ? new Date(a.date).getTime() - new Date(b.date).getTime()
            : new Date(b.date).getTime() - new Date(a.date).getTime()
        } else {
          return sortOrder === 'asc'
            ? a.title.localeCompare(b.title)
            : b.title.localeCompare(a.title)
        }
      })
    setPosts(sortedAndFilteredPosts)
  }, [initialPosts, sortBy, sortOrder, selectedTag])

  const toggleSortOrder = () => {
    setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc')
  }

  const allTags = Array.from(new Set(initialPosts.flatMap(post => post.tags)))

  return(
    <div className="container mx-auto px-4">
      <div className="flex justify-between items-center mb-8 mt-8">
        <h1 className="text-4xl font-bold">{ language === 'zh' ? '博客' : 'Blog' }</h1>
        <ThemeToggle />
      </div>
      <div className="flex flex-wrap gap-4 mb-4">
        <SearchBar onTagSelect={setSelectedTag} />
        <Button onClick={() => setSortBy('date')} variant={sortBy === 'date' ? 'default' : 'outline'}>
          { language === 'zh' ? '按日期排序' : 'Sort by date' }
        </Button>
        <Button onClick={() => setSortBy('title')} variant={sortBy === 'title' ? 'default' : 'outline'}>
          { language === 'zh' ? '按标题排序' : 'Sort by title' }
        </Button>
        <Button onClick={toggleSortOrder}>
          {sortOrder === 'asc' ? '↑' : '↓'}
        </Button>
      </div>
      <div className="flex flex-wrap gap-2 mb-4">
        {allTags.map(tag => (
          <Button
            key={tag}
            onClick={() => setSelectedTag(tag === selectedTag ? null : tag)}
            variant={tag === selectedTag ? 'default' : 'outline'}
            size="sm"
          >
            {tag}
          </Button>
        ))}
      </div>
      <motion.div 
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-8"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        {posts.map((post, index) => (
          <motion.div
            key={post.slug}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
          >
            <PostCard post={post} />
          </motion.div>
        ))}
      </motion.div>
    </div>
  )
}

