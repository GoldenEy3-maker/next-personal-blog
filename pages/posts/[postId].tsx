import type {NextPage} from "next";
import type {PostsList} from "../../typescript/interfaces";
import {RoutePaths} from "../../typescript/enums";

import Link from "next/link";
import Image from 'next/image'

import {useRouter} from "next/router";
import {useEffect, useState} from "react";

import {useSearchContext} from "../../context/search.context";

import MainLayout from "../../components/MainLayout";

import {setCurrentDatetime, setStaticClasses} from "../../lib/functions";

import stylesPosts from '../../styles/modules/Posts.module.scss'
import styles from '../../styles/modules/Post.module.scss'

import {postsList} from "../../serverData/postsList";

const {
  postsItemControlsExtrainfo,
  postsItemControlsExtrainfo__time,
  postsItemControlsExtrainfo__tag
} = stylesPosts

const {
  post,
  post__inner,
  postControls,
  postControls__share,
  postTitle,
  postContent,
  postContent__text,
  postContent__attach,
  postInterestingReading,
  postInterestingReading__title,
  postInterestingReading__list,
  postInterestingReadingItem,
  postInterestingReadingItem__title,
  postInterestingReadingItem__date,
  postExtrainfo
} = styles

const PostPage: NextPage = () => {
  const [postData, setPostData] = useState<PostsList | undefined>(undefined)

  const {setSearchValueByTagContent} = useSearchContext()

  const router = useRouter()
  const postId = router.query.postId

  const buttonReturnClickHandler = () => router.back()

  useEffect(() => {
    if (postsList.length > 0) {
      setPostData(postsList.filter(post => Number(postId) === post.id)[0])
    }
  }, [postId])

  return (
    <MainLayout>
      <div className={post}>
        <div className={post__inner}>
          <div className={postControls}>
            <button type='button' onClick={buttonReturnClickHandler}>вернуться назад</button>
            <button type='button' className={postControls__share}>поделиться</button>
          </div>
          {postData !== undefined && (
            <>
              <div className={postTitle}>{postData.title}</div>
              <div className={setStaticClasses([postsItemControlsExtrainfo, postExtrainfo])}>
                <time className={postsItemControlsExtrainfo__time}
                      dateTime={setCurrentDatetime(postData.date)}
                >
                  {postData.date}
                </time>
                {postData.tag !== undefined && (
                  <span className={postsItemControlsExtrainfo__tag}>
                    <Link href={RoutePaths.SearchPage}>
                      <a onClick={setSearchValueByTagContent}>
                        {postData.tag}
                      </a>
                    </Link>
                  </span>
                )}
              </div>
              <div className={postContent}>
                <p className={postContent__text}>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Elementum
                  volutpat orci turpis urna. Et vestibulum, posuere tortor lacinia sit. Sagittis porttitor orci auctor
                  in at tincidunt arcu egestas. Fusce arcu sodales lacinia eu auctor nunc nam id. Diam sit sed volutpat
                  massa. Egestas ornare vel volutpat. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Elementum
                  volutpat orci turpis urna. Et vestibulum, posuere tortor lacinia sit. Sagittis porttitor orci auctor
                  in at tincidunt arcu egestas. Fusce arcu sodales lacinia eu auctor nunc nam id. Diam sit sed volutpat
                  massa. Egestas ornare vel volutpat.</p>

                <p className={postContent__text}>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Elementum volutpat orci turpis urna. Et
                  vestibulum, posuere tortor lacinia sit. Sagittis porttitor orci auctor in at tincidunt arcu egestas.
                  Fusce arcu sodales lacinia eu auctor nunc nam id. Diam sit sed volutpat massa. Egestas ornare vel
                  volutpat.
                </p>

                {
                  postData.image !== undefined && (
                    <div className={postContent__attach}>
                      <Image src={postData.image.src} alt='post attach media' width={postData.image.width}
                             height={postData.image.height} layout='responsive'/>
                    </div>
                  )
                }
                <p className={postContent__text}>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Elementum
                  volutpat orci turpis urna. Et vestibulum, posuere tortor lacinia sit. Sagittis porttitor orci auctor
                  in at tincidunt arcu egestas. Fusce arcu sodales lacinia eu auctor nunc nam id. Diam sit sed volutpat
                  massa. Egestas ornare vel volutpat. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Elementum
                  volutpat orci turpis urna. Et vestibulum, posuere tortor lacinia sit. Sagittis porttitor orci auctor
                  in at tincidunt arcu egestas. Fusce arcu sodales lacinia eu auctor nunc nam id. Diam sit sed volutpat
                  massa. Egestas ornare vel volutpat.</p>
              </div>
              <div className={postInterestingReading}>
                <div className={postInterestingReading__title}>
                  Интересно почитать
                </div>
                <ul className={postInterestingReading__list}>
                  {postsList.length > 0 && postsList.map(post => (
                    post.title !== undefined && (
                      <li key={post.id} className={postInterestingReadingItem}>
                        <div className={postInterestingReadingItem__title}><Link href={RoutePaths.SearchPage}>
                          <a>{post.title}</a>
                        </Link></div>
                        <time className={postInterestingReadingItem__date}
                              dateTime={setCurrentDatetime(post.date)}>{post.date}</time>
                      </li>
                    )
                  ))}
                </ul>
              </div>
            </>
          )}
        </div>
      </div>
    </MainLayout>
  )
}


export default PostPage