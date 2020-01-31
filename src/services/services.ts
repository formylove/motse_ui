import {RESOURCE} from './fetch/fetch';
import {
  LOGIN, 
  GET_APPLICATIONS_LIST, 
  GET_APPLICATION_DETAIL, 
  ADD_APPLICATION,
  API_KEYS_BASE_URL,
  GET_API_KEYS,
  RULES_BASE_URL,
  GET_RULES,
  GET_RULE_BASES,
} from '../common/api';
import * as UserMgmtRes from './model/UserMgmtRes';
import * as ApplicationMgmtRes from './model/ApplicationMgmtRes';

export default class Services {
  public static login(payload: LoginFormType) {
    return RESOURCE.post<UserMgmtRes.LoginRes>(LOGIN, payload);
  }

  public static createApplication(payload: CreateApplicationFormInterface) {
    return RESOURCE.post<ApplicationMgmtRes.Res>(ADD_APPLICATION, payload);
  }

  public static updateApplication(payload: ApplicationMgmtRes.Application) {
    return RESOURCE.put<ApplicationMgmtRes.Res>(GET_APPLICATION_DETAIL, payload);
  }

  public static deleteApplication(payload: GetApplicationDetailParams) {
    return RESOURCE.delete<ApplicationMgmtRes.Res>(GET_APPLICATION_DETAIL, payload);
  }

  public static getApplicationsList(payload: PageParams) {
    return RESOURCE.get<ApplicationMgmtRes.Applications>(GET_APPLICATIONS_LIST, payload);
  }

  public static getApplicationDetail(payload: GetApplicationDetailParams) {
    return RESOURCE.get<ApplicationMgmtRes.GetApplicationDetailRes>(GET_APPLICATION_DETAIL, payload);
  }

  public static getAPIKeys(payload: GetAPIKeysParams) {
    return RESOURCE.get<ApplicationMgmtRes.APIKeys>(GET_API_KEYS, payload);
  }

  public static createAPIKey(payload: CreateAPIKeyParams) {
    return RESOURCE.post<ApplicationMgmtRes.CreateAPIKey>(API_KEYS_BASE_URL, payload);
  }

  public static revokeAPIKey(apiKeyId: string) {
    return RESOURCE.delete<ApplicationMgmtRes.CreateAPIKey>(`${API_KEYS_BASE_URL}/${apiKeyId}`);
  }

  public static createRule(payload: CreateRuleParams) {
    return RESOURCE.post<ApplicationMgmtRes.CreateRule>(RULES_BASE_URL, payload);
  }

  public static getAppRules(payload: GetAppRulesParams) {
    return RESOURCE.get<ApplicationMgmtRes.Rules>(GET_RULES, payload);
  }

  public static getRules(payload: any) {
    return RESOURCE.get<ApplicationMgmtRes.Rules>(GET_RULES, payload);
  }

  public static deleteRule(ruleId: string) {
    return RESOURCE.delete<ApplicationMgmtRes.CreateRule>(`${RULES_BASE_URL}/${ruleId}`);
  }

  public static getRuleBases(payload: {appId: string}) {
    return RESOURCE.get<BaseRes>(`${GET_RULE_BASES}`, payload);
  }

  public static assignAppRule(payload: {appId: string; ruleId: string}) {
    return RESOURCE.post<BaseRes>(`${RULES_BASE_URL}/${payload.ruleId}/applications/${payload.appId}`, payload);
  }

  public static delAppRule(payload: {appId: string; ruleId: string}) {
    return RESOURCE.delete<BaseRes>(`${RULES_BASE_URL}/${payload.ruleId}/applications/${payload.appId}`, payload);
  }
}
