import {
  Code,
  Collection,
  CollectionRow,
  Equation,
  NotionRenderer
} from 'react-notion-x'
import Comment from '@/components/Comment'
import Image from 'next/image'
import Link from 'next/link'
import ArticleAround from './ArticleAround'
import CategoryItem from './CategoryItem'
import TagItemMini from './TagItemMini'
import CONFIG_MEDIUM from '../config_medium'
import formatDate from '@/lib/formatDate'
import { useGlobal } from '@/lib/global'

import 'prismjs'
import 'prismjs/components/prism-bash'
import 'prismjs/components/prism-javascript'
import 'prismjs/components/prism-markup'
import 'prismjs/components/prism-python'
import 'prismjs/components/prism-typescript'
import BLOG from '@/blog.config'

const mapPageUrl = id => {
  return 'https://www.notion.so/' + id.replace(/-/g, '')
}

export const ArticleDetail = props => {
  const { post, prev, next } = props
  const { locale } = useGlobal()

  const date = formatDate(
    post?.date?.start_date || post.createdTime,
    locale.LOCALE
  )
  return <div id='container'>
    <h1 className="text-4xl pt-12 font-sans dark:text-gray-100">{post?.title}</h1>
    <section className="flex py-4 items-center font-sans px-1">
      <Link href="/about" passHref>
        <>
          <Image
            alt={BLOG.AUTHOR}
            width={25}
            height={25}
            loading="lazy"
            src="/avatar.jpg"
            className="rounded-full cursor-pointer"
          />
          <div className="mr-3 ml-1 text-green-500 cursor-pointer">
            {BLOG.AUTHOR}
          </div>
        </>
      </Link>
      <div className="text-gray-500">{date}</div>
      <div className="hidden busuanzi_container_page_pv text-gray-500 font-light mr-2">
        <i className="ml-3 mr-0.5 fas fa-eye" />
        &nbsp;
        <span className="mr-2 busuanzi_value_page_pv" />
      </div>
    </section>
    {/* Notion文章主体 */}
    <section id="notion-article" className="px-1 max-w-5xl">
      {post.blockMap && (
        <NotionRenderer
          recordMap={post.blockMap}
          mapPageUrl={mapPageUrl}
          components={{
            equation: Equation,
            code: Code,
            collectionRow: CollectionRow,
            collection: Collection
          }}
        />
      )}
    </section>

    <section className="px-1 py-2 my-1 text-sm font-light overflow-auto text-gray-600  dark:text-gray-400">
      {/* 文章内嵌广告 */}
      <ins
        className="adsbygoogle"
        style={{ display: 'block', textAlign: 'center' }}
        data-adtest="on"
        data-ad-layout="in-article"
        data-ad-format="fluid"
        data-ad-client="ca-pub-2708419466378217"
        data-ad-slot="3806269138"
      />
    </section>
    <section>
      <div className='flex justify-between'>
      { CONFIG_MEDIUM.POST_DETAIL_CATEGORY && post.category && <CategoryItem category={post.category}/>}
      <div>
      { CONFIG_MEDIUM.POST_DETAIL_TAG && post?.tagItems?.map(tag => <TagItemMini key={tag.name} tag={tag} />)}
      </div>
      </div>
      <ArticleAround prev={prev} next={next} />
      <Comment frontMatter={post} />
    </section>
  </div>
}
