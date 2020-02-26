import React, { Component, Fragment, FunctionComponent } from 'react';
import { inject, observer } from 'mobx-react';
import { routerStore } from '../../store/routerStore';

import { CreateCardStore } from '../../store/createCardStore';
import TexonomyCascade from './component/TaxonomyCascade';
import Step1 from './component/Step1/Step1';
import Step2 from './component/Step2/Step2';
import Step3 from './component/Step3/Step3';
import { Form, Icon, Input, Steps, Col, Row, PageHeader } from 'antd';
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
              onBack={() => { routerStore.goBack()}}
              title="生物卡片"
              subTitle="创建生物卡片"
            />
          </Col>
        </Row>
        <Row className='steps'>
          <Col >
            <Steps current={createCardStore.currentStep}>
              <Step title="基本信息" onClick={() => { createCardStore.setCurrentStep(0) }} />
              <Step title="描述信息" onClick={() => { createCardStore.setCurrentStep(1) }} />
              <Step title="相关信息" onClick={() => { createCardStore.setCurrentStep(2) }} />
            </Steps>
          </Col>
        </Row>

        {
          (() => {
            switch (createCardStore.currentStep) {
              case 0:
                return <Step1 />;
              case 1:
                return <Step2 />;
              case 2:
                return <Step3 />;
            }
          })()
        }

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
