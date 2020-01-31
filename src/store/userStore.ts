import {
  observable, action, runInAction,
} from 'mobx';
import {navigate, navigateInLayout} from '../common/util';
import {Modal} from 'antd';
import {UserInfo} from '../services/model/UserMgmtRes';
import {MERLIN} from '../common/constants';

export class UserStore {
  private static instance: UserStore;

  public static getInstance() {
    if (!UserStore.instance) {
      UserStore.instance = new UserStore();
    }

    return UserStore.instance;
  }

  constructor() {
    this.initUser();
  }

  @observable user: Partial<UserInfo> = {};

  initUser() {
    this.user = JSON.parse(localStorage.getItem('merlin') || '{}');
  }

  getToken() {
    return this.user.loginToken;
  }

  logout() {
    localStorage.removeItem(MERLIN);
    navigate('/login');
  }
}

export const userStore = UserStore.getInstance();
