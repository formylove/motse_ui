import {
  observable, action, runInAction,
} from 'mobx';
import {Modal, message} from 'antd';
import Services from '../services/services';

const allowdedTags = ['periods', 'methods', 'ipSections', 'urls', 'ruleBase'];
export class RuleStore {
  private static instance: RuleStore;

  public static getInstance() {
    if (!RuleStore.instance) {
      RuleStore.instance = new RuleStore();
    }

    return RuleStore.instance;
  }
  @observable ruleModalVisible = false;
  @observable actionSelectValue = '1';
  @observable applicationId = '';
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
  @observable ruleData: Rule[] = [];
  @observable ruleParams: CreateRuleParams = {
    name: '',
    appId: this.applicationId,
    description: '',
    urls: [],
    periods: [],
    ipSections: [],
    methods: [],
    ruleBase: {},
    action: 'ALLOW',
  };
  @observable ruleBases: string[] = [];

  @action init() {
    // Fetch data and init form
    this.getRuleData('0');
  }

  @action
  showModal = (value: Record<string, any>) => {
    console.log(value);
    this.ruleModalVisible = true;
  };

  // @action
  // handleOk = (e: any) => {
  //   this.ruleModalVisible = false;
  //   this.createRuleData();
  // };

  // @action
  // handleCancel = (e: any) => {
  //   this.ruleModalVisible = false;
  // };

  @action
  getRuleData = (page: string) => {
    Services.getRules({
      page,
      size: '10',
    }).then((res) => {
      console.log(res);
      runInAction(() => {
        this.ruleData = res.data;
        this.addTags(this.ruleData);
      });
    }).catch((e) => {
      message.error(e.message);
    });
  }

  @action
  createRuleData = (createRuleParams: any) => {
    // before send data, reorginze it first


    // send the create request
    Services.createRule(createRuleParams).then((res) => {
      console.log(res);
      this.init();
      message.success('Create rule success');
    }).catch((e) => {
      message.error(e.message);
    });
  }

  @action
  updateRuleData = (value: object) => {
    alert('Updated a rule');
  }

  @action
  deleteRuleData = (ruleId: string) => {
    Services.deleteRule(ruleId).then((res) => {
      console.log(res);
      if (res.errCode === 0) {
        this.ruleData = this.ruleData.filter((rule) => {
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

  @action
  getRuleBases = () => {
    Services.getRuleBases({
      appId: this.applicationId,
    }).then((res) => {
      runInAction(() => {
        this.ruleBases = res.data;
      });
    }).catch((e) => {
      message.error(e.message);
    });
  }

  @action
  setRuleBases = (value: string) => {
    if (!this.ruleBases.find((item) => item === value)) {
      this.ruleBases.push(value);
    }
  }

  addTags(rules: Rule[]) {
    rules.map((rule) => {
      rule.tags = [];
      Object.keys(rule).forEach((key) => {
        switch (key) {
          case 'ruleBase':
            rule.tags.push('GROUP');
            break;
          case 'urls':
            rule.tags.push('URL');
            break;
          case 'periods':
            rule.tags.push('TIME');
            break;
          case 'methods':
            rule.tags.push('Methods');
            break;
        }  
      });
    });
  }
}

export const ruleStore = RuleStore.getInstance();
