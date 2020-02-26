import {
  observable, action, runInAction,
} from 'mobx';
import { navigateInLayout } from '../common/util';
import { Modal, message } from 'antd';
import Services from '../services/services';
import { appStore } from './appStore';

const { confirm } = Modal;

export class CreateCardStore {
  private static instance: CreateCardStore;

  public static getInstance(): CreateCardStore {
    if (!CreateCardStore.instance) {
      CreateCardStore.instance = new CreateCardStore();
    }

    return CreateCardStore.instance;
  }
  @observable currentStep = 0;
  @observable cnames:string[] = [];

  @observable isSucceed = false;
  @observable cname = '';
  @observable isVisibleOfModal = false;

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

  @action
  toggleModal(value: boolean) {
    this.isVisibleOfModal = value;
  }

  @action
  createAttrSettingBox(e: any) {
    console.log(this)
    this.toggleModal(true)
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
  addCnameLabel = (e: any) => {
    if (e.keyCode == 13) {
      let txt: string = e.currentTarget.value
      this.cname=''
      if (txt != '') {
        this.cnames.push(txt)
      }
      console.info(txt)
    }
  }
  @action
  setCnameInput = (e: any) => {
    this.cname = e.currentTarget.value
  }

  @action
  removeCnameLabel = (e: any) => {
    let label = e.currentTarget.value
    let index: number = this.cnames.indexOf(label)
    console.info(label)
    delete this.cnames[index]
    console.info(index)
    console.info(this.cnames)
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