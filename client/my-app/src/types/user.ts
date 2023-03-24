import { ReactNode } from "react";
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import { store } from "../redux/store";

// Use throughout your app instead of plain `useDispatch` and `useSelector`
// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
export const useAppDispatch: () => AppDispatch = useDispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

export type LoginUserState = {
  email: String;
  password: String;
};
export type SingupUserState = {
  name: String;
  email: String;
  password: String;
};

export type SingupProps = { ToggleForm: () => any };

export type privateRouteProps = {
  children: ReactNode;
};
