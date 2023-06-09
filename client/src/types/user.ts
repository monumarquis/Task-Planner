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
  email: string;
  password: string;
};
export type mapUserProps = {
  _id: string;
  name: string;
  email: string;
  role: string;
};
export type SingupUserState = {
  name: string;
  email: string;
  password: string;
};

export type taskAssign = {
  title: string;
  assignTo: string;
  desc: string;
  sprint: string;
  status: string;
};
export type sprintAssign = {
  title: string;
  desc: string;
  startDate: string;
  endDate: string;
};
export type sprintMapProps = {
  _id: string;
  title: string;
  desc: string;
  startDate: string;
  endDate: string;
  creatorEmail: string;
  creatorName: string;
  updatedAt: string;
  createdAt: string;
};
export type taskMapProps = {
  _id: string;
  title: string;
  desc: string;
  assignTo: string;
  assignBy: string;
  sprint: string;
  status: string;
  updatedAt: string;
  createdAt: string;
};

export type singletaskProps = { data: taskMapProps };
export type singlesprintProps = { data: sprintMapProps };

export type userMapProps = {
  _id: string;
  name: string;
  email: string;
  role: string;
  updatedAt: string;
  createdAt: string;
};

export type SingupProps = { ToggleForm: () => any };

export type privateRouteProps = {
  children: ReactNode;
};

export type singlrTableUserProps = {
  name: string;
  id: string;
  role: string;
  email: string;
};
