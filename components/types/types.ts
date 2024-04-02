export interface User {
  username: string;
  email: string;
  profile: string;
  token: string;
}

export interface UserSlice {
  isLogin: boolean;
  userData: User;
}
