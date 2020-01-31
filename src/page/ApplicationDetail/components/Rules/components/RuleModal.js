/* eslint-disable */
import React, {Component} from 'react';
import {inject, observer} from 'mobx-react';
import {Button, Icon, Modal, Input, Form, Select, TimePicker} from 'antd';
import {observable} from 'mobx';
import moment from 'moment';
import RuleBases from './RuleBases/RuleBases';

const {confirm} = Modal;
const {Option} = Select;
const {TextArea} = Input;
const methodList = ['GET', 'POST', 'PUT', 'PATCH', 'DELETE'];

@inject('ruleStore')
@observer
class RuleModal extends Component {
  @observable urlInputs = {'0': ''};
  @observable timePeriodInputs = {'0': {'start': '', 'end': ''}};
  @observable ipSectionInputs = {'0': ''};

  addInputArray = (arr) => {
    const randomKey = parseInt(Math.random()*100);
    arr[randomKey] = '';
    // arr.push();
  }

  addObjectToArray = (arr) => {
    const randomKey = parseInt(Math.random()*100);
    arr[randomKey] = new Object();
  }

  removeInputArray = (arr, item) => {
    // arr.remove(item);
    delete arr[item];
  }

  onFormSubmit = () => {
    const {ruleStore} = this.props;
    ruleStore.rule['appId'] = ruleStore.applicationId;
    ruleStore.rule.name = this.props.form.getFieldsValue().ruleName;
    ruleStore.rule.description = this.props.form.getFieldsValue().description;
    ruleStore.rule.ruleBase = this.props.form.getFieldsValue().roleBases;
    ruleStore.rule.urls = Object.values(this.urlInputs);
    ruleStore.rule.ipSections = Object.values(this.ipSectionInputs);
    ruleStore.rule.periods = Object.values(this.timePeriodInputs);
    ruleStore.rule.methods = this.props.form.getFieldValue('methods');
    // console.log(ruleStore.rule);
    ruleStore.handleOk();
  }
  

  render() {
    const {getFieldDecorator} = this.props.form;
    const {ruleStore} = this.props;

    // ruleStore.rule.url = this.props.form.getFieldsValue().url;

    const formItemLayout = {
      labelCol: {
        xs: {span: 24},
        sm: {span: 8},
      },
      wrapperCol: {
        xs: {span: 24},
        sm: {span: 16},
      },
    };
    return (
      <Modal
        visible={ruleStore.ruleModalVisible}
        onCancel={ruleStore.handleCancel}
        onOk={() => this.onFormSubmit()}
        okText="Save"
        cancelText="Cancel"
        title="Add a rule"
        className="rule-modal"
        destroyOnClose
      >
        <Form {...formItemLayout} labelAlign="left">
          <Form.Item label="Name">
            {getFieldDecorator('ruleName', {
              rules: [{required: true, message: 'Please input your rule name!'}],
            })(
                <Input
                  placeholder="Give your rule a descriptive name"
                />,
            )}
          </Form.Item>
          <div className="title">Choose your rule base</div>
          <Form.Item 
            wrapperCol={{
              xs: {span: 24},
              sm: {span: 24},
            }}>
            {getFieldDecorator('roleBases', {
              rules: [{required: true, message: 'Please input your role!'}],
            })(
                <RuleBases />,
            )}
          </Form.Item>
          <div className="title">Conditions</div>
          <Form.Item label="URI">
            {
              Object.keys(this.urlInputs).map((urlInput) => {
                return (getFieldDecorator(`url-${urlInput}`, {
                  rules: [{required: true, message: 'Please input your uri!'}],
                })(
                    <div className="" key={urlInput}>
                      <Input
                        placeholder="http://example.com"
                        onChange={(e) => this.urlInputs[urlInput] = e.target.value}
                      />
                      <Button 
                        className="delete-icon" 
                        icon="delete" 
                        onClick={() => this.removeInputArray(this.urlInputs, urlInput)}/>
                    </div>,
                ));
              })
            }
            <Button onClick={() => this.addInputArray(this.urlInputs)}>Add URI</Button>
          </Form.Item>
          <Form.Item label="Time Periods">
            {
              Object.keys(this.timePeriodInputs).map((timePeriodInput) => {
                return (getFieldDecorator(`time-${timePeriodInput}`, {
                  rules: [{required: false, message: 'Please input your time!'}],
                })(
                    <div key={timePeriodInput}>
                      <TimePicker onChange={(date, dateString) => this.timePeriodInputs[timePeriodInput]['start'] = dateString}></TimePicker> -
                      <TimePicker onChange={(date, dateString) => this.timePeriodInputs[timePeriodInput]['end'] = dateString}></TimePicker>
                      <Button 
                        className="delete-icon" 
                        icon="delete" 
                        onClick={() => this.removeInputArray(this.timePeriodInputs, timePeriodInput)}/>
                    </div>,
                ));
              })
            }
            
            <Button onClick={() => this.addObjectToArray(this.timePeriodInputs)}>Add Time</Button>
          </Form.Item>
          <Form.Item label="IP Sections">
            {
              Object.keys(this.ipSectionInputs).map((ipSectionInput) => {
                return (getFieldDecorator(`ip-${ipSectionInput}`, {
                  rules: [{required: false, message: 'Please input your ip!'}],
                })(
                    <div key={ipSectionInput}>
                      <Input
                        placeholder="127.0.0.1/32"
                        onChange={(e) => this.ipSectionInputs[ipSectionInput] = e.target.value}
                      />
                      <Button 
                        className="delete-icon" 
                        icon="delete" 
                        onClick={() => this.removeInputArray(this.ipSectionInputs, ipSectionInput)}/>
                    </div>,
                ));
              })
            }
            <Button onClick={() => this.addInputArray(this.ipSectionInputs)}>Add IP Section</Button>
          </Form.Item>
          <Form.Item label="Method">
            {
              getFieldDecorator('methods', {
              })(
                <Select
                  mode="multiple"
                  placeholder="Please select method"
                >
                  {
                    methodList.map(item => (
                      <Option key={item} value={item}>{item}</Option>
                    ))
                  }
                </Select>
              )
            }
          </Form.Item>
          
          <Form.Item label="Action">
            {getFieldDecorator('rulename', {
              rules: [{required: true, message: 'Please input your rule name!'}],
              initialValue: ruleStore.actionSelectValue,
            })(
                <Select
                >
                  <Option value="1">Allow</Option>
                </Select>,
            )}
          </Form.Item>
          <Form.Item label="Description">
            {getFieldDecorator('description', {

            })(
                <TextArea
                  placeholder="eg., test env, www.example.com"
                />,
            )}
          </Form.Item>
        </Form>
      </Modal>
    );
  }
}

export default Form.create()(RuleModal);
