
import React, {FunctionComponent, ChangeEvent, useEffect, Component, ReactNode} from 'react';
import {Icon, TimePicker, Button, Form, Input, Row, Col, Select} from 'antd';
import {FormComponentProps} from 'antd/es/form';
import './Rules.scss';
import {removeEmpty, navigateInLayout, observer, useStores} from '../../common/util';
import RuleBases from './components/RuleBases/RuleBases';
import {RuleStore, ruleStore} from '../../store/ruleStore';
import {observable, autorun, observe} from 'mobx';
import {configConsumerProps} from 'antd/es/config-provider';
import TextArea from 'antd/lib/input/TextArea';
import {inject} from 'mobx-react';
const {Option} = Select;
const methodList = ['GET', 'POST', 'PUT', 'PATCH', 'DELETE'];
const conditionList = ['Date and time', 'URL', 'IP Section', 'Group', 'Method'];
// const logicList = ['Allow when some match', 'Allow when all match'];
const logicList = ['ALLOW']
const timeList = [
  '1:00',
  '2:00',
  '3:00',
  '4:00',
  '5:00',
  '6:00',
  '7:00',
  '8:00',
  '9:00',
  '10:00',
  '11:00',
  '12:00',
];
interface CreateRuleParams {
  name: string;
  description: string;
  action: string;
  methods: Array<string>;
  urls: Array<string>;
  ruleBases: Record<string, any>;
  periods: Array<Object>;
  ipSections: Array<string>;
}
let createRuleParams: CreateRuleParams = {
  name: '',
  description: '',
  action: '',
  methods: [],
  urls: [],
  ruleBases: {},
  periods: [],
  ipSections: []
}
const timezoneList = ['+8:00 Asian/Beijing', '+9:00 Asian/Toyko'];




interface RuleFormProps extends FormComponentProps {
  ruleStore: RuleStore;
}

let fieldComps: Array<ReactNode> = observable([]);



// TODO: This page should support days pick
@inject('ruleStore')
@observer
class RuleForm extends Component<RuleFormProps> {
  // ruleStore = useStores<RuleStore>('ruleStore');

  MethodField = observer(({index}) => {
    return (
      <div className="form-item">
        <Row type="flex" align="middle">
          <Col span={3}><div className="title">Method</div></Col>
          <Col span={20}>
            {
              this.props.form.getFieldDecorator(`method-${index}`, {})(
                <Select
                  mode="multiple"
                  placeholder="Please select method"
                  style={{width: '100%'}}
                >
                  {
                    methodList.map((item) => (
                      <Option key={item} value={item}>{item}</Option>
                    ))
                  }
                </Select>
              )
            }

          </Col>
          <Col span={1}>
            <Button
              className="delete-icon"
              icon="delete"
              onClick={() => this.removeConditionField(index)} />
          </Col>
        </Row>
      </div>
    );
  });

  // TODO: Timezone lib need to find out and form layout should be optimized
  TimezoneField = observer(({index}) => {
    const currentTimeZone = timezoneList[0];
    return (
      <div className="form-item">
        <Row type="flex" align="middle">
          <Col span={3}><div className="title">Timezone</div></Col>
          <Col span={8}>
            {
              this.props.form.getFieldDecorator(`timezone[${index}]`, {initialValue: currentTimeZone})(
                <Select
                  style={{width: '100%'}}
                >
                  {
                    timezoneList.map((item) => (
                      <Option key={item} value={item}>{item}</Option>
                    ))
                  }
                </Select>
              )
            }

          </Col>
          <Col span={6}>
            <div className="date-time-rule-field-container">
              <span>Start</span>
              {
                this.props.form.getFieldDecorator(`start[${index}]`, {initialValue: '8:00'})(
                  <Select
                    style={{width: '100%'}}
                  >
                    {
                      timeList.map((item) => (
                        <Option key={item} value={item}>{item}</Option>
                      ))
                    }
                  </Select>
                )
              }
              {
                this.props.form.getFieldDecorator(`start-2[${index}]`, {initialValue: 'AM'})(
                  <Select
                    style={{width: '100%'}}
                  >
                    <Option value="AM">AM</Option>
                    <Option value="PM">PM</Option>
                  </Select>
                )
              }
            </div>
          </Col>
          <Col span={6}>
            <div className="date-time-rule-field-container">
              <span>End</span>
              {
                this.props.form.getFieldDecorator(`end[${index}]`, {initialValue: '5:00'})(
                  <Select
                    style={{width: '100%'}}
                  >
                    {
                      timeList.map((item) => (
                        <Option key={item} value={item}>{item}</Option>
                      ))
                    }
                  </Select>
                )
              }
              {
                this.props.form.getFieldDecorator(`end-2[${index}]`, {initialValue: 'PM'})(
                  <Select
                    style={{width: '100%'}}
                  >
                    <Option value="AM">AM</Option>
                    <Option value="PM">PM</Option>
                  </Select>
                )
              }
            </div>
          </Col>
          <Col span={1}>
            <Button
              className="delete-icon"
              icon="delete"
              onClick={() => this.removeConditionField(index)} />
          </Col>
        </Row>
      </div>
    );
  });

  IpField = observer(({index}) => {
    return (
      <div className="form-item">
        <Row type="flex" align="middle">
          <Col span={3}><div className="title">IP Section</div></Col>
          <Col span={20}>
            {
              this.props.form.getFieldDecorator(`ip-section[${index}]`, {})(
                <Input placeholder="127.0.0.1/32" />
              )
            }
          </Col>
          <Col span={1}>
            <Button
              className="delete-icon"
              icon="delete"
              onClick={() => this.removeConditionField(index)} />
          </Col>
        </Row>
      </div>
    );
  });

  UrlField = observer(({index}) => {
    return (
      <div className="form-item">
        <Row type="flex" align="middle">
          <Col span={3}><div className="title">URL</div></Col>
          <Col span={20}>
            {
              this.props.form.getFieldDecorator(`url[${index}]`, {})(
                <Input placeholder="https://www.example.com/path" />
              )
            }
          </Col>
          <Col span={1}>
            <Button
              className="delete-icon"
              icon="delete"
              onClick={() => this.removeConditionField(index)} />
          </Col>
        </Row>
      </div>
    );
  });

  GroupField = observer(({index}) => {
    return (
      <div className="form-item">
        <Row type="flex" align="middle">
          <Col span={3}><div className="title">Group</div></Col>
          <Col span={20}><RuleBases ruleStore={ruleStore} form={this.props.form} index={index} /></Col>
          <Col span={1}>
            <Button
              className="delete-icon"
              icon="delete"
              onClick={() => this.removeConditionField(index)} />
          </Col>
        </Row>
      </div>
    );
  });

  addConditionField = (value: number) => {
    const randomKey = Math.round(Math.random() * 100);
    const index = fieldComps.length;
    switch (value) {
      case 0:
        return fieldComps.push(<this.TimezoneField key={index} index={index} />);
      case 1:
        return fieldComps.push(<this.UrlField key={index} index={index} />);
      case 2:
        return fieldComps.push(<this.IpField key={index} index={index} />);
      case 3:
        return fieldComps.push(<this.GroupField key={index} index={index} />);
      case 4:
        return fieldComps.push(<this.MethodField key={index} index={index} />);
    }

  };

  // TODO: BUG: Sometimes it will delete two elements
  removeConditionField = (key: number) => {
    console.log('key: ' + key);
    // (key === 0) ? fieldComps = [] : fieldComps.splice(key, key);
    fieldComps.splice(key, key);
    // fieldComps = fieldComps.filter((comp, index) => {
    //   return index !== key;
    // })

    console.log('length: ' + fieldComps.length);
    console.log('removeConditipnField func called');
  };

  onFormSubmit = () => {
    console.log(this.props.form.getFieldsValue());
    const values = this.props.form.getFieldsValue();
    createRuleParams.urls = removeEmpty(values['urls']);
    createRuleParams.ipSections = removeEmpty(values['ip-section']);
    createRuleParams.name = values['name'];
    createRuleParams.description = values['description'];
    createRuleParams.action = values['action'];
    createRuleParams.methods = [];
    Object.keys(values).map((key: string) => {
      
      if(key.indexOf('method') !== -1) {
        createRuleParams.methods = createRuleParams.methods.concat(values[key]);
      }

      if(key.indexOf('start-2') !== -1) {
        let starts = values['start'];
        let starts2 = values['start-2'];
        let ends = values['end'];
        let ends2 = values['end-2'];
        let timezones = values['timezone'];
        starts.forEach((_: any, index: any) => {
          let period = {
            start: `${starts[index]} ${starts2[index]}`,
            end: `${ends[index]} ${ends2[index]}`,
            timezone: timezones[index]
          };
          createRuleParams.periods.push(period);
        })
      }

      if(key.indexOf('rule-base-value') !== -1) {
        let ruleBases = values['rule-base'];
        let ruleBaseValues = values['rule-base-value'];
        ruleBases.forEach((_: any, index: any) => {
          createRuleParams.ruleBases[ruleBases[index]] = ruleBaseValues[index];
        })
      }
    })
    console.log(createRuleParams);

    ruleStore.createRuleData(createRuleParams);
  }

  componentDidMount() {
    // const ruleStore = useStores('ruleStore');
    const {ruleStore} = this.props;
    ruleStore.init();
    ruleStore.getRuleBases();
  }

  render() {
    return (
      <div className="container">
        <div className="top-control" onClick={() => navigateInLayout('/rules')}>
          <Icon className="left-icon" type="left" />
          <span>Rules</span>
        </div>
        <div className="header">
          <div className="left-container">
            <div className="title title-dark">Add new rule</div>
            <div className="sub-title">To add a new rule, fill out the form below.</div>
          </div>
        </div>
        <div className="form-top-container">
          <Row>
            <Col span={16} className="title-dark">Rule Name</Col>
            <Col span={8} className="title-dark">Logic Operator</Col>
          </Row>
          <Row>
            <Col span={16}>
              {
                this.props.form.getFieldDecorator('name', {})(
                  <Input placeholder="Give your rule a descriptive name" />
                )
              }

            </Col>
            <Col span={8}>
              {
                this.props.form.getFieldDecorator('action', {initialValue: logicList[0]})(
                  <Select style={{width: '100%'}}>
                  {
                    logicList.map((item, index) => (
                      <Option key={index} value={index}>{item}</Option>
                    ))
                  }
                </Select>
                )
              }
            </Col>
          </Row>
          <Row>
            <Col className="title-dark">Description</Col>
          </Row>
          <Row>
            {
              this.props.form.getFieldDecorator('description', {})(
                <TextArea placeholder="eg,. pre env, www.example.com"></TextArea>
              )
            }
          </Row>
        </div>
        <div className="form-middle-container">
          <h3>Conditions</h3>
          <div>
            No rules attached yet
        </div>
          <Form>
            {fieldComps.map((item) => {
              return item;
            })}
          </Form>

          <Row type="flex" justify="end">
            <Col>
              <Select
                className="condition-select"
                defaultValue={0}
                onSelect={this.addConditionField}
              >
                {
                  conditionList.map((item, index) => (
                    <Option key={index} value={index}>{item}</Option>
                  ))
                }
              </Select>
            </Col>
          </Row>
        </div>
        <div className="form-bottom-container">
          <Row type="flex" justify="end">
            <Col><Button>Cancel</Button></Col>
            <Col><Button type="primary" onClick={this.onFormSubmit}>Save</Button></Col>
          </Row>
        </div>
      </div>
    );
  }
}

export default Form.create<RuleFormProps>()(RuleForm);
