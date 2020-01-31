export interface LoginRes {
  data: UserInfo;
  errCode: number;
  errMsg: string;
}

export interface UserInfo {
  email: string;
  loginToken: string;
  privileges: string[];
  tenantName: string;
  userName: string;
}
