import React from 'react'
import { useAppDispatch } from '../../app/hook'

import { reactionAdded } from './postSlice'

import { Post, Reaction } from '../../app/types'

const reactionEmoji = {
  thumbsUp: '👍',
  hooray: '🎉',
  heart: '❤️',
  rocket: '🚀',
  eyes: '👀',
}

type ReactionButtonsProps = {
  post: Post
}
export const ReactionButtons = ({ post }: ReactionButtonsProps) => {
  const dispatch = useAppDispatch()

  const reactionButtons = Object.entries(reactionEmoji).map(([name, emoji]) => {
    return (
      <button
        key={name}
        type="button"
        className="muted-button reaction-button"
        onClick={() =>
          dispatch(
            reactionAdded({ postId: post.id, reaction: name as keyof Reaction })
          )
        }
      >
        {emoji} {post.reactions[name as keyof Reaction]}
      </button>
    )
  })

  return <div>{reactionButtons}</div>
}
