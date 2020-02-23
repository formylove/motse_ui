import React, { Component, Fragment, FunctionComponent } from 'react';
import { inject, observer } from 'mobx-react';

import { CreateCardStore } from '../../store/createCardStore';
import TexonomyCascade  from './component/TexonomyCascade';
import { Form, Icon,Input,Steps, Col, Row, PageHeader } from 'antd';
import { navigate, navigateInLayout } from '../../common/util';
import './CreateCard.scss';

const { Step } = Steps;


interface CreateCardProps {
  createCardStore: CreateCardStore;
}

@inject('createCardStore')
@observer
export default class CreateCard extends Component<CreateCardProps> {
  render() {
    const { createCardStore } = this.props;
    return (
      <Fragment >
        <Row>
          <Col >
            <PageHeader
              style={{
                border: '1px solid rgb(235, 237, 240)',
              }}
              onBack={() => null}
              title="生物卡片"
              subTitle="创建生物卡片"
            />
          </Col>
        </Row>
        <Row className='steps'>
          <Col >
            <Steps current={1}>
              <Step title="基本信息" description="This is a description." />
              <Step title="描述信息" subTitle="Left 00:00:08" description="This is a description." />
              <Step title="相关信息" description="This is a description." />
            </Steps>
          </Col>
        </Row>
        <Row className='steps'>
          <Col span={4}>
            <Input placeholder="Basic usage" addonAfter={<Icon type="plus" />} />
          </Col>
        </Row>
        <Row className='steps'>
          <Col span={4}>
            <TexonomyCascade />
          </Col>
        </Row>
      </Fragment>

    );
  }
}

interface ContentItemProps {
  title: string;
}

const ContentItem: FunctionComponent<ContentItemProps> = ({ title, children }) => (
  <div className="create-card-content">
    <div className="create-card-content-title title-dark">{title}</div>
    {children}
  </div>
);
