export interface Application {
  id: string;
  apitoken: string;
  clientId: string;
  issuer: string;
  loginRedirectUrl: string[];
  logoutRedirectUrl: string[];
  name: string;
  platform: 'NATIVE' | 'SPA' | 'WEB' | 'SERVICE';
  ssoProvider: string;
}

export interface Card {
  cname: string[];
  ename: string[];
  taxonomy: string;
  facts: string[];
  portraits: string[];
  links: string[];
  description: string;
  reference: number[];
}

export interface Applications {
  data: Application[];
  errCode: number;
  errMsg: string;
  pageNum: number;
  pageSize: number;
  totalElements: number;
  totalPage: number;
}

export interface Res {
  data: Record<string, any>;
  errCode: number;
  errMsg: string;
}


export interface APIKeys {
  data: APIKey[];
  errCode: number;
  errMsg: string;
  pageNum: number;
  pageSize: number;
  totalElements: number;
  totalPage: number;
}

export interface Rules {
  data: Rule[];
  errCode: number;
  errMsg: string;
  pageNum: number;
  pageSize: number;
  totalElements: number;
  totalPage: number;
}

export interface CreateAPIKey {
  data: APIKey;
  errCode: number;
  errMsg: string;
  pageNum: number;
  pageSize: number;
  totalElements: number;
  totalPage: number;
}

export interface CreateRule {
  data: Rule;
  errCode: number;
  errMsg: string;
  pageNum: number;
  pageSize: number;
  totalElements: number;
  totalPage: number;
}

type Data = {}

export interface GetApplicationDetailRes {
    errCode: number;
    errMsg: string;
    data: Application;
}


