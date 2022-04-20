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
import {usePopupContext} from "../../context/popup.context";

const {
  postsItemControlsExtrainfo,
  postsItemControlsExtrainfo__time,
  postsItemControlsExtrainfo__tag
} = stylesPosts

const {
  post,
  post__inner,
  postControls,
  postControlsShare,
  postControlsShare__text,
  postControlsShare__icon,
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

  const {openPopup} = usePopupContext()
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
            <button type='button' className={postControlsShare}>
              <span className={postControlsShare__text} onClick={() => openPopup('sharePopup')}>поделиться</span>
              <div className={postControlsShare__icon}>
                <svg viewBox="0 0 28 27" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path
                    d="M22.7131 17.6061C20.9871 17.6061 19.4535 18.3698 18.4979 19.5454L10.2705 15.7169C10.4085 15.2899 10.483 14.8384 10.483 14.3712C10.483 13.7385 10.3467 13.1343 10.1001 12.5813L18.7229 7.86381C19.685 8.89207 21.1167 9.54545 22.7131 9.54545C25.6032 9.54545 27.9545 7.40441 27.9545 4.77273C27.9545 2.14105 25.6032 0 22.7131 0C19.8229 0 17.4716 2.14105 17.4716 4.77273C17.4716 5.38098 17.5974 5.96289 17.8263 6.49833L9.1819 11.2276C8.2205 10.2297 6.81048 9.59848 5.24148 9.59848C2.35133 9.59848 0 11.7395 0 14.3712C0 17.0029 2.35133 19.1439 5.24148 19.1439C6.99574 19.1439 8.5513 18.3551 9.50321 17.1465L17.7067 20.9639C17.5539 21.4111 17.4716 21.8863 17.4716 22.3788C17.4716 25.0105 19.8229 27.1515 22.7131 27.1515C25.6032 27.1515 27.9545 25.0105 27.9545 22.3788C27.9545 19.7471 25.6032 17.6061 22.7131 17.6061ZM22.7131 1.59091C24.6398 1.59091 26.2074 3.01827 26.2074 4.77273C26.2074 6.52718 24.6398 7.95455 22.7131 7.95455C20.7863 7.95455 19.2188 6.52718 19.2188 4.77273C19.2188 3.01827 20.7863 1.59091 22.7131 1.59091ZM5.24148 17.553C3.31471 17.553 1.74716 16.1257 1.74716 14.3712C1.74716 12.6168 3.31471 11.1894 5.24148 11.1894C7.16824 11.1894 8.7358 12.6168 8.7358 14.3712C8.7358 16.1257 7.16824 17.553 5.24148 17.553ZM22.7131 25.5606C20.7863 25.5606 19.2188 24.1332 19.2188 22.3788C19.2188 20.6243 20.7863 19.197 22.7131 19.197C24.6398 19.197 26.2074 20.6243 26.2074 22.3788C26.2074 24.1332 24.6398 25.5606 22.7131 25.5606Z"
                    fill="white"/>
                </svg>
              </div>
            </button>
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
                        <div className={postInterestingReadingItem__title}><Link href={`/posts/${post.id}`}>
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