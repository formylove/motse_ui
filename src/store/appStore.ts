import {
  observable, action, runInAction,
} from 'mobx';

export class AppStore {
    private static instance: AppStore;

    public static getInstance(): AppStore {
      if (!AppStore.instance) {
        AppStore.instance = new AppStore();
      }

      return AppStore.instance;
    }

    // control loading
    @observable isGlobalLoading = 0;

    @action
    showGlobalLoading = (): void => {
      this.isGlobalLoading += 1;
    };
    
    @action
    hideGlobalLoading = (): void => {
      this.isGlobalLoading -= 1;
    };
}

export const appStore = AppStore.getInstance();
