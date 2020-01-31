type LoginFormType = {
  email: string;
  password: string;
}

type PageParams = {
  size: string;
  page: string;
}

type GetAPIKeysParams = {
  size: string;
  page: string;
  appId: string;
}

type CreateAPIKeyParams = {
  name: string;
  appId: string;
}

type GetRulesParams = {
  size?: string;
  page?: string;
}

type GetAppRulesParams = {
  size: string;
  page: string;
  appId: string;
}

type GetApplicationDetailParams = {
  applicationId: string;
}

type APIKey = {
  id: string;
  name: string;
  appId: string;
  apiKey: string;
  apiSecret: string;
  expire: string;
  creationDate: string;
}

type Rule = {
  id: string;
  action: string;
  name: string;
  urls: Array;
  periods: Array;
  ipSections: Array;
  methods: Array;
  ruleBase: Record<string, any>;
  action: string;
  description: string;
  tags: Array;
}


type CreateRuleParams = {
  action: string;
  appId: string;
  name: string;
  urls: Array;
  periods: Array;
  ipSections: Array;
  methods: Array<string>;
  ruleBase: Record<string, any>;
  action: string;
  description: string;
}

interface BaseRes {
  data: string[];
  errCode: number;
  errMsg: string;
}

interface CreateApplicationFormInterface {
  apitoken?: string;
  clientId?: string;
  clientSecret?: string;
  issuer?: string;
  loginRedirectUrl?: string;
  logoutRedirectUrl?: string;
  name?: string;
  platform?: string;
  ssoProvider?: string;
}

// error message interface
interface ErrorMessage {
  message?: string;
  code?: string | number;
}
