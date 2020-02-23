import {
  observable, action, runInAction, 
} from 'mobx';
import { navigateInLayout} from '../common/util';
import {Modal, message} from 'antd';
import Services from '../services/services';
import {appStore} from './appStore';

const {confirm} = Modal;

export class CreateCardStore {
  private static instance: CreateCardStore;

  public static getInstance(): CreateCardStore {
    if (!CreateCardStore.instance) {
        CreateCardStore.instance = new CreateCardStore();
      }

    return CreateCardStore.instance;
    }
    @observable currentStep = 1;

    @observable isSucceed = false;

    @action
    init() {
      this.isSucceed = false;
      this.currentStep = 1;
      this.cardData = {};
    }

    @action
    setIsSucceed(value: boolean) {
      this.isSucceed = value;
    }


  @observable cardData: CreateCardFormInterface = {

  }

  @action
  setCardData = (value: object): void => {
    this.cardData = Object.assign({}, this.cardData, value);
  }

    @action
    setCurrentStep = (value: number): void => {
      this.currentStep = value;
    }

    @action
    cancelCreate = (): void => {
      confirm({
        title: '确认退出创建吗?',
        content: 'Temporary information is not saved.',
        onOk: () => {
          this.currentStep = 1;
          this.cardData = {};
          navigateInLayout('/home');
        },
      });
    }

    createCard() {
      appStore.showGlobalLoading();
      // Services.createCard(this.applicationData).then((res) => {
      //   appStore.hideGlobalLoading();
      //   runInAction(() => {
      //     this.isSucceed = true;
      //     this.init();
      //     const appId = res.data.id;
      //     navigateInLayout(`/application-detail/${appId}/general`);
      //   });
      // }).catch((e) => {
      //   appStore.hideGlobalLoading();
      //   message.error(e.message);
      // });
    }
}

export const createCardStore = CreateCardStore.getInstance();