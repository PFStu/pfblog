import { Post } from '@/types'

let posts: Post[] = []

if (typeof window === 'undefined') {
  const fs = require('fs')
  const path = require('path')
  const matter = require('gray-matter')

  const postsDirectory = path.join(process.cwd(), 'docs')

  function loadPosts() {
    const slugs = fs.readdirSync(postsDirectory)
    posts = slugs.map((slug: string) => {
      const realSlug = slug.replace(/\.md$/, '')
      const fullPath = path.join(postsDirectory, `${realSlug}.md`)
      const fileContents = fs.readFileSync(fullPath, 'utf8')
      const { data, content } = matter(fileContents)

      return {
        slug: realSlug,
        title: data.title,
        excerpt: data.excerpt,
        content,
        date: data.date,
        tags: data.tags || [],
        author: data.author,
        lastModified: data.lastModified,
      }
    })
    posts.sort((a, b) => (new Date(b.date) > new Date(a.date) ? 1 : -1))
  }

  loadPosts()
}

export async function getPostSlugs(): Promise<string[]> {
  return posts.map(post => post.slug)
}

export async function getPostBySlug(slug: string): Promise<Post | null> {
  return posts.find(post => post.slug === slug) || null
}

export async function getAllPosts(): Promise<Post[]> {
  return posts
}

export function sortPosts(postsToSort: Post[], sortBy: 'date' | 'title', sortOrder: 'asc' | 'desc'): Post[] {
  return [...postsToSort].sort((a, b) => {
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
}

export function filterPostsByTag(postsToFilter: Post[], tag: string | null): Post[] {
  if (!tag) return postsToFilter
  return postsToFilter.filter(post => post.tags.includes(tag))
}

