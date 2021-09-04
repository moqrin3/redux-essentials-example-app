import {
  createSlice,
  createAsyncThunk,
  createEntityAdapter,
} from '@reduxjs/toolkit'
import { client } from '../../api/client'
import { RootState } from '../../app/store'
import { User } from '../../app/types'

const usersAdapter = createEntityAdapter<User>()

const initialState = usersAdapter.getInitialState()

export const fetchUsers = createAsyncThunk('users/fetchUsers', async () => {
  const response = await client.get('/fakeApi/users')
  return response.users
})

export const usersSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchUsers.fulfilled, usersAdapter.setAll)
  },
})

export default usersSlice.reducer

export const { selectAll: selectAllUsers, selectById: selectUserById } =
  usersAdapter.getSelectors<RootState>((state) => state.users)
