import {
  observable, action, runInAction, computed,
} from 'mobx';
import {Modal, message} from 'antd';
import Services from '../services/services';

export class APITokenStore {
  private static instance: APITokenStore;

  public static getInstance() {
    if (!APITokenStore.instance) {
      APITokenStore.instance = new APITokenStore();
    }

    return APITokenStore.instance;
  }
  @observable applicationId = '';

  @observable tokenModal = {
    tokenNameValue: '',
    visible: false,
    okText: 'Create Token',
    apiKeyDisplay: false,
  };
  @observable tokenData: APIKey[] = [];

  @observable createdApiKey: Partial<APIKey> = {};

  init() {
    this.getData('0');
  }

  convertTime() {
    return this.tokenData.forEach((token) => {
      token.creationDate = new Date(token.creationDate).toLocaleString();
      token.expire = new Date(token.expire).toLocaleString();
    });
  }

  @action
  initModalState = () => {
    this.tokenModal = {
      tokenNameValue: '',
      visible: false,
      okText: 'Create Token',
      apiKeyDisplay: false,
    };
  }

  @action
  showModal = () => {
    this.initModalState();
    this.tokenModal.visible = true;
  };

  @action
  handleOk = () => {
    if (!this.tokenModal.apiKeyDisplay) {
      this.createData(this.tokenModal.tokenNameValue);
    } else {
      this.tokenModal.visible = false;
      this.init();
    }
  };

  @action
  handleCancel = (e: any) => {
    this.tokenModal.visible = false;
  };

  @action
  getData = (page: string) => {
    Services.getAPIKeys({
      page,
      size: '10',
      appId: this.applicationId,
    }).then((res) => {
      console.log(res);
      runInAction(() => {
        this.tokenData = res.data;
        this.convertTime();
      });
    }).catch((e) => {
      message.error(e.message);
    });
  }

  @action
  createData = (name: string) => {
    Services.createAPIKey({
      name: name,
      appId: this.applicationId,
    }).then((res) => {
      runInAction(() => {
        this.createdApiKey = res.data;
        this.tokenModal.apiKeyDisplay = true;
        this.tokenModal.okText = 'OK, got it';
      });
    }).catch((e) => {
      message.error(e.message);
    });
  }

  @action
  updateData = (value: object) => {
    alert('Updated a token');
  }

  @action
  deleteData = (apiKeyId: string) => {
    Services.revokeAPIKey(apiKeyId).then((res) => {
      console.log(res);
      if (res.errCode === 0) {
        this.tokenData = this.tokenData.filter((apiKey) => {
          return apiKey.id !== apiKeyId;
        });
        message.success('Deleted a token');
      } else {
        message.error(res.errMsg);
      }
    }).catch((e) => {
      message.error(e.message);
    });
  }

  @action
  cancelCreation = () => {
    console.log('Canceled creation!');
  }

  @action
  setTokenNameValue = (value: string) => {
    this.tokenModal.tokenNameValue = value;
  }
}

export const apiTokenStore = APITokenStore.getInstance();
