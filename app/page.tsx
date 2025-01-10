import { getAllPosts } from '@/lib/posts'
import BlogContent from './components/BlogContent'

export default async function Home() {
  const posts = await getAllPosts()

  return <BlogContent initialPosts={posts} />
}

