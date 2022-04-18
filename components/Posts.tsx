import type {PostsList} from "../typescript/interfaces";

import Image from 'next/image'
import Link from 'next/link'

import {setCurrentDatetime} from "../lib/functions";

import styles from '../styles/modules/Posts.module.scss'

type PostsPropsType = {
  postsList: PostsList[]
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

const Posts = ({postsList}: PostsPropsType) => {
  return (
    <div className={posts}>
      <div className={posts__inner}>
        <ul className={posts__list}>
          {postsList.length > 0 && postsList.map(post => (
            <li key={post.id} className={postsItem}>
              <div className={postsItem__attach}>
                <Link href={'#'}>
                  <a>
                    <Image src={post.image.src} alt={'post attach'} width={post.image.width} height={post.image.height}
                           layout={'responsive'}/>
                  </a>
                </Link>
              </div>
              <div className={postsItem__info}>
                <div className={postsItem__title}>{post.title}</div>
                <div className={postsItem__text}>{post.text}</div>
              </div>
              <div className={postsItemControls}>
                <div className={postsItemControlsExtrainfo}>
                  <time className={postsItemControlsExtrainfo__time}
                        dateTime={setCurrentDatetime(post.date)}>{post.date}</time>
                  <span className={postsItemControlsExtrainfo__tag}>{post.tag}</span>
                </div>
                <div className={postsItemControls__button}>
                  <Link href={'#'}>
                    <a>
                      Читать
                    </a>
                  </Link>
                </div>
              </div>
            </li>
          ))}

        </ul>
      </div>
    </div>
  )
}

export default Posts