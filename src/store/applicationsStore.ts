import {
  observable, action, runInAction,
} from 'mobx';
import {navigate, navigateInLayout} from '../common/util';
import {Modal, message} from 'antd';
import * as ApplicationMgmtRes from '../services/model/ApplicationMgmtRes';
import Services from '../services/services';
import {appStore} from './appStore';

const {confirm} = Modal;

export class ApplicationsStore {
  private static instance: ApplicationsStore;

  public static getInstance(): ApplicationsStore {
    if (!ApplicationsStore.instance) {
      ApplicationsStore.instance = new ApplicationsStore();
    }

    return ApplicationsStore.instance;
  }

  @observable currentApplication: Partial<ApplicationMgmtRes.Application> = {}

  @observable applicationListData: Partial<ApplicationMgmtRes.Applications> = {}

  @action
  setCurrentApplication(value: ApplicationMgmtRes.Application) {
    this.currentApplication = value;
  }

  init() {
    this.getApplicationList('0');
  }

  @action
  getApplicationList(page: string) {
    appStore.showGlobalLoading();
    Services.getApplicationsList({
      page,
      size: '5',
    }).then((res) => {
      appStore.hideGlobalLoading();
      runInAction(() => {
        this.applicationListData = res;
      });
    }).catch((e) => {
      appStore.hideGlobalLoading();
      message.error(e.message);
    });
  }

  @action
  getApplicationDetail(applicationId: string) {
    appStore.showGlobalLoading();
    Services.getApplicationDetail({applicationId}).then((res) => {
      appStore.hideGlobalLoading();
      this.currentApplication = res.data;
    }).catch((e) => {
      appStore.hideGlobalLoading();
      message.error(e.message);
    });
  }

  @action
  deleteApplication(applicationId: string) {
    confirm({
      title: 'Do you want to delete this application?',
      onOk: () => {
        appStore.showGlobalLoading();
        Services.deleteApplication({applicationId}).then((res) => {
          appStore.hideGlobalLoading();
          message.success('The application has been deleted!');
          this.init();
        }).catch((e) => {
          appStore.hideGlobalLoading();
          message.error(e.message);
        });
      },
    });
  }

  @action
  updateApplication(applicationData: ApplicationMgmtRes.Application, applicationId: string) {
    const payload = Object.assign(applicationData, {applicationId});
    console.log(payload);
    appStore.showGlobalLoading();
    Services.updateApplication(payload).then((res) => {
      appStore.hideGlobalLoading();
      console.log(res);
    }).catch((e) => {
      appStore.hideGlobalLoading();
      message.error(e.message);
    });
  }
}

export const applicationsStore = ApplicationsStore.getInstance();
