'use client'

import { useSearchParams } from 'next/navigation'
import { useEffect, useState } from 'react'
import { getAllPosts } from '@/lib/posts'
import { Post } from '@/types'
import PostCard from '../components/PostCard'
import { motion } from 'framer-motion'

export default function SearchResults() {
  const searchParams = useSearchParams()
  const query = searchParams.get('q')
  const [results, setResults] = useState<Post[]>([])

  useEffect(() => {
    if (query) {
      getAllPosts().then(posts => {
        const filtered = posts.filter(post => 
          post.title.toLowerCase().includes(query.toLowerCase()) ||
          post.content.toLowerCase().includes(query.toLowerCase())
        )
        setResults(filtered)
      })
    }
  }, [query])

  return (
    <>
      <p className="mb-4">搜索关键词: {query}</p>
      <motion.div 
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        {results.map((post, index) => (
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
      {results.length === 0 && <p>没有找到匹配的结果。</p>}
    </>
  )
}

