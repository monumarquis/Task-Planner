
export type LoginUserState = {
  email: String;
  password: String;
};
export type SingupUserState = {
  name: String | '';
  email: String | '';
  password: String | '';
};

export type SingupProps = { ToggleForm: () => any };
