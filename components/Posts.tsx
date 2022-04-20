import type {PostsList} from '../typescript/interfaces'
import {RoutePaths} from '../typescript/enums'

import Image from 'next/image'
import Link from 'next/link'

import {MouseEventHandler, useCallback, useEffect, useState} from "react";

import {useSearchContext} from '../context/search.context'

import {setCurrentDatetime} from '../lib/functions'

import styles from '../styles/modules/Posts.module.scss'
import {useRouter} from "next/router";

type PostsPropsType = {
  postsList: PostsList[]
  filterBy?: string
}

const {
  posts,
  posts__inner,
  posts__list,
  postsItem,
  postsItem__attach,
  postsItem__info,
  postsItem__title,
  postsItem__text,
  postsItemControls,
  postsItemControlsExtrainfo,
  postsItemControlsExtrainfo__time,
  postsItemControlsExtrainfo__tag,
  postsItemControls__button,
  postsEmpty
} = styles

const Posts = ({postsList, filterBy = ''}: PostsPropsType) => {
  const [postsData, setPostsData] = useState(postsList)

  const router = useRouter()

  const {setSearchValueByTagContent} = useSearchContext()

  const searchingByFilter = useCallback((title: string | undefined, text: string, tag: string | undefined): boolean => {
    return title?.trim().toUpperCase().includes(filterBy) || tag?.trim().toUpperCase().includes(filterBy) || text.trim().toUpperCase().includes(filterBy)
  }, [filterBy])

  const clickTagLink: MouseEventHandler<HTMLAnchorElement> = (event) => {
    if (router.route === RoutePaths.SearchPage) {
      event.preventDefault()
    }

    setSearchValueByTagContent(event)
  }

  useEffect(() => {
    if (filterBy !== undefined) {
      setPostsData(postsList.filter(({title, text, tag}) => searchingByFilter(title, text, tag)))
    }
  }, [filterBy, postsList, searchingByFilter])

  return (
    <div className={posts}>
      <div className={posts__inner}>
        <ul className={posts__list}>
          {postsData.length > 0 ?
            postsData.map((post) =>
              <li key={post.id} className={postsItem}>
                {post.image !== undefined && (
                  <div className={postsItem__attach}>
                    <Link href={`/posts/${post.id}`}>
                      <a>
                        <Image
                          src={post.image.src}
                          width={post.image.width}
                          height={post.image.height}
                          alt='post attach'
                          layout='responsive'
                          priority
                        />
                      </a>
                    </Link>
                  </div>
                )}
                <div className={postsItem__info}>
                  {post.title !== undefined && (
                    <div className={postsItem__title}>{post.title}</div>
                  )}
                  <div className={postsItem__text}>{post.text}</div>
                </div>
                <div className={postsItemControls}>
                  <div className={postsItemControlsExtrainfo}>
                    <time
                      className={postsItemControlsExtrainfo__time}
                      dateTime={setCurrentDatetime(post.date)}
                    >
                      {post.date}
                    </time>
                    {post.tag !== undefined && (
                      <span className={postsItemControlsExtrainfo__tag}>
                            <Link href={RoutePaths.SearchPage}>
                              <a onClick={clickTagLink}>
                                {post.tag}
                              </a>
                            </Link>
                          </span>
                    )}
                  </div>
                  <div className={postsItemControls__button}>
                    <Link href={`/posts/${post.id}`}>
                      <a>Читать</a>
                    </Link>
                  </div>
                </div>
              </li>
            ) : (<li className={postsEmpty}>Ничего не найдено</li>)
          }
        </ul>
      </div>
    </div>
  )
}

export default Posts
