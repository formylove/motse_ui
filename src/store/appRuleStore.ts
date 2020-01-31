import {
  observable, action, runInAction,
} from 'mobx';
import {Modal, message} from 'antd';
import Services from '../services/services';

export class AppRuleStore {
  private static instance: AppRuleStore;

  public static getInstance() {
    if (!AppRuleStore.instance) {
      AppRuleStore.instance = new AppRuleStore();
    }

    return AppRuleStore.instance;
  }
  @observable ruleModalVisible = false;
  @observable actionSelectValue = '1';
  @observable applicationId = '';
  @observable ruleId = '';

  // rule json example
  // {
  //   id: '1',
  //   name: 'Rule 1',
  //   description: 'Only engineer can access this resource',
  //   urls: ['http://example.com/path'],
  //   periods: [],
  //   ipSections: ['127.0.0.1/31'],
  //   methods: ['GET'],
  //   ruleBase: {
  //     Role: 'Engineer',
  //   },
  //   action: 'ALLOW',
  //   tags: ['Time', 'IP'],
  // }
  @observable rules: Rule[] = [];
  @observable allRules: Rule[] = [];
  @observable ruleBases: string[] = [];

  @action init() {
    this.getData('0');
  }

  @action
  showModal = (value: Record<string, any>) => {
    console.log(value);
    this.ruleModalVisible = true;
  };

  @action
  handleOk = (e: any) => {
    this.ruleModalVisible = false;
    this.createData(this.ruleId);
  };

  @action
  handleCancel = (e: any) => {
    this.ruleModalVisible = false;
  };

  @action
  getData = (page: string) => {
    Services.getRules({
    }).then((res) => {
      console.log(res);
      runInAction(() => {
        this.allRules = res.data;
      });
    }).catch((e) => {
      message.error(e.message);
    });

    Services.getAppRules({
      page,
      size: '10',
      appId: this.applicationId,
    }).then((res) => {
      console.log(res);
      runInAction(() => {
        this.rules = res.data;
      });
    }).catch((e) => {
      message.error(e.message);
    });
  }

  @action
  createData = (ruleId: string) => {
    Services.assignAppRule({appId: this.applicationId, ruleId: ruleId}).then((res) => {
      console.log(res);
      this.init();
      message.success('Assign rule success');
    }).catch((e) => {
      message.error(e.message);
    });
  }

  @action
  deleteData = (ruleId: string) => {
    Services.delAppRule({appId: this.applicationId, ruleId: ruleId}).then((res) => {
      console.log(res);
      if (res.errCode === 0) {
        this.rules = this.rules.filter((rule) => {
          return rule.id !== ruleId;
        });
        message.success('Deleted a rule');
      } else {
        message.error(res.errMsg);
      }
    }).catch((e) => {
      message.error(e.message);
    });
  }

  @action
  cancelCreation = () => {
    alert('Canceled creation!');
  }
}

export const appRuleStore = AppRuleStore.getInstance();
