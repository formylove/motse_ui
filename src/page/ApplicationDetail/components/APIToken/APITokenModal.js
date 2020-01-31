/* eslint-disable */
import React, { Component, Fragment } from 'react';
import { APITokenStore } from '../../../../store/apiTokenStore'
import { inject, observer } from 'mobx-react';
import { Button, Table, Modal, Input, Form, Select } from 'antd';

const { confirm } = Modal;

@inject('apiTokenStore')
@observer
class APITokenModal extends Component {

  render() {
    const { apiTokenStore } = this.props;
    const { getFieldDecorator } = this.props.form;
    apiTokenStore.tokenNameValue = this.props.form.getFieldsValue().tokenName;
    const formItemLayout = {
      labelCol: {
        xs: { span: 24 },
        sm: { span: 6 },
      },
      wrapperCol: {
        xs: { span: 24 },
        sm: { span: 18 },
      }
    };
    return (
      <Modal
        visible={apiTokenStore.tokenModal.visible}
        onCancel={apiTokenStore.handleCancel}
        onOk={apiTokenStore.handleOk}
        okText={apiTokenStore.tokenModal.okText}
        cancelText="Cancel"
        title="Create Token"
        destroyOnClose
      >
        {!apiTokenStore.tokenModal.apiKeyDisplay ?
          <Form {...formItemLayout} labelAlign="left">
            <Form.Item label="Token Name">
              {getFieldDecorator('tokenName', {
                rules: [{ required: true, message: 'Please input your token name!' }],
              })(
                <div>
                  <Input
                    placeholder="Give your token a descriptive name"
                    onChange={(e) => {
                      apiTokenStore.setTokenNameValue(e.target.value)
                    }}
                  />
                  <p>The token is used for tracking API calls</p>
                </div>
              )}
            </Form.Item>
          </Form> :
          <div>
            <p>API key created successfully!</p>
            <p>Please make a note of this token as it will be the only
              time that you will be able to view it. After this, it will be stored as a hash for your protection.</p>
            <div>API key</div>
            <p>{apiTokenStore.createdApiKey.apiKey}</p>
            <div>API Secret</div>
            <p>{apiTokenStore.createdApiKey.apiSecret}</p>
          </div>
        }
      </Modal >
    );
  }
}

export default Form.create()(APITokenModal);
