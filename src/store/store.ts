import { configureStore , ThunkAction, Action} from '@reduxjs/toolkit'
// ...
import {authSlice } from './slices/auth';
import {chatSlice} from './slices/chat/chatSlice';

export const store = configureStore({
  reducer: {
    auth: authSlice.reducer,
    chat: chatSlice.reducer
  },
})

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;

export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
