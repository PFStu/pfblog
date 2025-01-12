'use client'
import Link from 'next/link'
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Post } from '@/types'
import { useLanguage } from '@/contexts/LanguageContext'

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

export default function PostCard({ post }: { post: Post }) {
  const { language } = useLanguage()
  return (
    <Card>
      <CardHeader>
        <CardTitle>{post.title}</CardTitle>
        <div className="flex flex-wrap gap-2 mt-2">
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
      </CardHeader>
      <CardContent>
        <p>{post.excerpt}</p>
        <div className="text-sm text-muted-foreground mt-2">
          { language === 'zh' ? '作者' : 'Author' }: {post.author} | { language === 'zh' ? '发布时间' : 'Published' } : {post.date}
        </div>
      </CardContent>
      <CardFooter>
        <Button asChild>
          <Link href={`/posts/${post.slug}`}>
            { language === 'zh' ? '阅读全文' : 'Read More' }
          </Link>
        </Button>
      </CardFooter>
    </Card>
  )
}

