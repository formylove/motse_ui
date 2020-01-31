import {
  observable, action, runInAction, 
} from 'mobx';
import {navigate, navigateInLayout} from '../common/util';
import {Modal, message} from 'antd';
import Services from '../services/services';
import {appStore} from './appStore';

const {confirm} = Modal;

export class AddApplicationStore {
    private static instance: AddApplicationStore;

    public static getInstance(): AddApplicationStore {
      if (!AddApplicationStore.instance) {
        AddApplicationStore.instance = new AddApplicationStore();
      }

      return AddApplicationStore.instance;
    }
    @observable currentStep = 1;

    @observable applicationData: CreateApplicationFormInterface = {
        
    }

    @observable isSucceed = false;

    @action
    init() {
      this.isSucceed = false;
      this.currentStep = 1;
      this.applicationData = {};
    }

    @action
    setIsSucceed(value: boolean) {
      this.isSucceed = value;
    }

    @action
    setApplicationData = (value: object): void => {
      this.applicationData = Object.assign({}, this.applicationData, value);
    }

    @action
    setCurrentStep = (value: number): void => {
      this.currentStep = value;
    }

    @action
    cancelCreate = (): void => {
      confirm({
        title: 'Do you want to cancel this integration?',
        content: 'Temporary information is not saved.',
        onOk: () => {
          this.currentStep = 1;
          this.applicationData = {};
          navigateInLayout('/home');
        },
      });
    }

    createApplication() {
      appStore.showGlobalLoading();
      Services.createApplication(this.applicationData).then((res) => {
        appStore.hideGlobalLoading();
        runInAction(() => {
          this.isSucceed = true;
          this.init();
          const appId = res.data.id;
          navigateInLayout(`/application-detail/${appId}/general`);
        });
      }).catch((e) => {
        appStore.hideGlobalLoading();
        message.error(e.message);
      });
    }
}

export const addApplicationStore = AddApplicationStore.getInstance();
