import {VERSION} from './constants';

export const ADD_APPLICATION = `/api/${VERSION}/applications`;
export const ADD_CARD = `/cards`;
export const GET_APPLICATIONS_LIST = `/api/${VERSION}/applications/`;
export const GET_APPLICATION_DETAIL = `/api/${VERSION}/applications/:applicationId`;

export const API_KEYS_BASE_URL = `/api/${VERSION}/apiKeys`;
export const GET_API_KEYS = `${API_KEYS_BASE_URL}/`;

export const RULES_BASE_URL = `/api/${VERSION}/rules`;
export const GET_RULES = `${RULES_BASE_URL}/`;
export const GET_RULE_BASES = `${RULES_BASE_URL}/ruleBases/`;

export const LOGIN = `/api/${VERSION}/users/login`;


