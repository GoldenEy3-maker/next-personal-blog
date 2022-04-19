import type { PostsList } from '../typescript/interfaces'
import { RoutePaths } from '../typescript/enums'

import Image from 'next/image'
import Link from 'next/link'

import { setCurrentDatetime } from '../lib/functions'

import styles from '../styles/modules/Posts.module.scss'
import { useSearchContext } from '../context/search.context'

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
} = styles

const Posts = ({ postsList, filterBy }: PostsPropsType) => {
  const { setSearchValueByTagContent } = useSearchContext()

  return (
    <div className={posts}>
      <div className={posts__inner}>
        <ul className={posts__list}>
          {postsList.length > 0 &&
            postsList.map((post) =>
              filterBy !== undefined ? (
                (post.title?.trim().toUpperCase().includes(filterBy) ||
                  post.text.trim().toUpperCase().includes(filterBy) ||
                  post.tag?.trim().toUpperCase().includes(filterBy)) && (
                  <li key={post.id} className={postsItem}>
                    {post.image !== undefined && (
                      <div className={postsItem__attach}>
                        <Link href={'#'}>
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
                              <a onClick={setSearchValueByTagContent}>
                                {post.tag}
                              </a>
                            </Link>
                          </span>
                        )}
                      </div>
                      <div className={postsItemControls__button}>
                        <Link href={'#'}>
                          <a>Читать</a>
                        </Link>
                      </div>
                    </div>
                  </li>
                )
              ) : (
                <li key={post.id} className={postsItem}>
                  {post.image !== undefined && (
                    <div className={postsItem__attach}>
                      <Link href={'#'}>
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
                            <a onClick={setSearchValueByTagContent}>
                              {post.tag}
                            </a>
                          </Link>
                        </span>
                      )}
                    </div>
                    <div className={postsItemControls__button}>
                      <Link href={'#'}>
                        <a>Читать</a>
                      </Link>
                    </div>
                  </div>
                </li>
              )
            )}
        </ul>
      </div>
    </div>
  )
}

export default Posts
