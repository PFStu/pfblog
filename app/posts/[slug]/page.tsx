import { getPostBySlug } from '@/lib/posts'
import { ArrowLeft } from 'lucide-react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import remarkToc from 'remark-toc'
import rehypeHighlight from 'rehype-highlight'
import { Badge } from '@/components/ui/badge'

const tagColors = {
  light: [
    'bg-red-100 text-red-800',
    'bg-blue-100 text-blue-800',
    'bg-green-100 text-green-800',
    'bg-yellow-100 text-yellow-800',
    'bg-purple-100 text-purple-800',
    'bg-pink-100 text-pink-800',
    'bg-indigo-100 text-indigo-800',
  ],
  dark: [
    'dark:bg-red-950 dark:text-red-200',
    'dark:bg-blue-950 dark:text-blue-200',
    'dark:bg-green-950 dark:text-green-200',
    'dark:bg-yellow-950 dark:text-yellow-200',
    'dark:bg-purple-950 dark:text-purple-200',
    'dark:bg-pink-950 dark:text-pink-200',
    'dark:bg-indigo-950 dark:text-indigo-200',
  ]
}

export default async function PostPage({ params }: { params: { slug: string } }) {
  const post = await getPostBySlug(params.slug)
  if (!post) {
    return <div>Post Not Found | 文章未找到</div>
  }

  return (
    <article className="container mx-auto px-4 py-8">
      <Button asChild variant="ghost" className="mb-4">
        <Link href="/">
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back | 返回
        </Link>
      </Button>
      <h1 className="text-4xl font-bold mb-4">{post.title}</h1>
      <div className="flex flex-wrap gap-2 mb-4">
        {post.tags.map((tag, index) => (
          <Badge 
            key={tag} 
            variant="secondary"
            className={`${tagColors.light[index % tagColors.light.length]} ${tagColors.dark[index % tagColors.dark.length]} border-none transition-colors`}
          >
            {tag}
          </Badge>
        ))}
      </div>
      <div className="text-sm text-muted-foreground mb-4">
        Author/作者: {post.author} | Published/发布日期: {post.date} | LastModified/最后修改: {post.lastModified}
      </div>
      <div className="prose lg:prose-xl dark:prose-invert max-w-none">
        <ReactMarkdown 
          remarkPlugins={[remarkGfm, [remarkToc, { heading: '目录' }]]}
          rehypePlugins={[rehypeHighlight]}
        >
          {post.content}
        </ReactMarkdown>
      </div>
    </article>
  )
}

