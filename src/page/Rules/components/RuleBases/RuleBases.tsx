import React, {Component, ChangeEvent} from 'react';
import {Input, Select, Row, Col, Modal, message, Form} from 'antd';
import {FormComponentProps} from 'antd/es/form';
import {observer, useStores} from '../../../../common/util';
import {RuleStore} from '../../../../store/ruleStore';
import {inject} from 'mobx-react';
import './RuleBases.scss';

const {confirm} = Modal;
const {Option} = Select;

interface RuleBasesProps extends FormComponentProps{
  value?: any;
  onChange?: any;
  ruleStore: RuleStore;
  index: string;
}

@inject('ruleStore')
@observer
class RuleBases extends Component<RuleBasesProps> {
  baseModalInput: string;

  constructor(props: any) {
    super(props);
    this.baseModalInput = '';
  }

  triggerChange = (value: Record<string, any>): void => {
    const {onChange} = this.props;
    if (onChange) {
      onChange(value);
    }
  };

  handleOnSelect = (value: any): void => {
    if (value === 'more') {
      confirm({
        title: 'Add a rule base',
        content: (
          <div>
            <span>
              Defines the requested authentication method for the token
              endpoint. Possible values are 'None'
            </span>
            <Input
              onChange={this.handleBaseModalInputChange}
              placeholder="Rule base"
            />
          </div>
        ),
        onCancel: () => {
          this.triggerChange(this.props.value);
        },
        onOk: () => {
          return new Promise((resolve, reject) => {
            if (this.baseModalInput) {
              this.props.ruleStore.setRuleBases(this.baseModalInput);
              const temp = {
                [this.baseModalInput]: [
                  this.props.value ?
                    this.props.value[Object.keys(this.props.value)[0]] :
                    '',
                ],
              };
              this.triggerChange(temp);
              resolve();
            } else {
              message.error('Rule base is required!');
              reject(new Error('Rule base is required!'));
            }
          });
        },
      });
    } else {
      // const temp = {
      //   [e]: [this.props.value ? this.props.value[Object.keys(this.props.value)[0]] : ''],
      // };
      // this.triggerChange(temp);
    }
  };

  handleBaseModalInputChange = (e: ChangeEvent<HTMLInputElement>): void => {
    const {value} = e.target;
    this.baseModalInput = value;
  };

  handleInputChange = (e: ChangeEvent<HTMLInputElement>): void => {
    const temp = {
      [Object.keys(this.props.value)[0]]: [e.target.value],
    };
    this.triggerChange(temp);
  };

  render(): JSX.Element {
    const {ruleStore, value, index} = this.props;
    const {getFieldDecorator} = this.props.form;

    return (
      <Row className="rule-bases-form-item">
        <Col span={8} className="title-container">
          {/* <Select
            onChange={this.handleSelectChange}
            value={value ? Object.keys(value)[0] : ''}
            placeholder="Choose your group base"
            style={{width: '100%'}}
          >
            {ruleStore.ruleBases.map((item) => (
              <Option value={item} key={item}>
                {item}
              </Option>
            ))}
            <Option value={'more'}>+Customized</Option>
          </Select> */}
          {
            this.props.form.getFieldDecorator(`rule-base[${index}]`, {})(
                <Select
                  onSelect={this.handleOnSelect}
                >
                  {ruleStore.ruleBases.map((item) => (
                    <Option value={item} key={item}>
                      {item}
                    </Option>
                  ))}
                  <Option value={'more'}>+Customized</Option>
                </Select>,
            )
          }

          <span className="divide">:</span>
        </Col>
        <Col span={16}>
          {/* <Input
            onChange={this.handleInputChange}
            placeholder="Enter your field value"
            value={value ? value[Object.keys(value)[0]][0] : ''}
          /> */}
          {
            this.props.form.getFieldDecorator(`rule-base-value[${index}]`, {})(
                <Input placeholder="Enter your field value"/>,
            )
          }

        </Col>
      </Row>
    );
  }
}

export default RuleBases;
