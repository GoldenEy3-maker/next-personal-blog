import type { PostsList } from '../typescript/interfaces'

import { useEffect, useState } from 'react'

import MainLayout from '../components/MainLayout'

import Posts from '../components/Posts'

import { useSearchContext } from '../context/search.context'

import { postsList } from '../serverData/postsList'

const SearchPage = () => {
  const { searchValue } = useSearchContext()
  const [postsData, setPostsData] = useState<PostsList[]>(postsList)

  useEffect(() => {
    setPostsData((posts) =>
      posts.map((post) => ({ ...post, image: undefined }))
    )
  }, [])

  return (
    <MainLayout>
      <Posts
        postsList={postsData}
        filterBy={searchValue.trim().toUpperCase()}
      />
    </MainLayout>
  )
}

export default SearchPage
