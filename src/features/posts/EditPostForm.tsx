import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useHistory, RouteComponentProps } from 'react-router-dom'

import { postUpdated, selectPostById } from './postSlice'

type TParams = { postId: string }
export const EditPostForm = ({ match }: RouteComponentProps<TParams>) => {
  const { postId } = match.params

  const post = useSelector((state) => selectPostById(state, postId))

  const [title, setTitle] = useState(post?.title ?? '')
  const [content, setContent] = useState(post?.content ?? '')

  const dispatch = useDispatch()
  const history = useHistory()

  const onTitleChanged: React.ChangeEventHandler<HTMLInputElement> = (e) =>
    setTitle(e.target.value)
  const onContentChanged: React.ChangeEventHandler<HTMLTextAreaElement> = (e) =>
    setContent(e.target.value)

  const onSavePostClicked = () => {
    if (title && content) {
      dispatch(postUpdated({ id: postId, title, content }))
      history.push(`/posts/${postId}`)
    }
  }

  return (
    <section>
      <h2>Edit Post</h2>
      <form>
        <label htmlFor="postTitle">Post Title:</label>
        <input
          type="text"
          id="postTitle"
          name="postTitle"
          placeholder="What's on your mind?"
          value={title}
          onChange={onTitleChanged}
        />
        <label htmlFor="postContent">Content:</label>
        <textarea
          id="postContent"
          name="postContent"
          value={content}
          onChange={onContentChanged}
        />
      </form>
      <button type="button" onClick={onSavePostClicked}>
        Save Post
      </button>
    </section>
  )
}