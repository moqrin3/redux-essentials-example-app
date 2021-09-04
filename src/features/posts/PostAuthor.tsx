import React from 'react'
import { useAppSelector } from '../../app/hook'

import { selectUserById } from '../users/usersSlice'

import { EntityId } from '@reduxjs/toolkit'

type PostAuthorProps = {
  userId: EntityId
}

export const PostAuthor = ({ userId }: PostAuthorProps) => {
  const author = useAppSelector((state) => selectUserById(state, userId))

  return <span>by {author ? author.name : 'Unknown author'}</span>
}
