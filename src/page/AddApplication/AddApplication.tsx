import React, {Component, FunctionComponent} from 'react';
import {inject, observer} from 'mobx-react';

import {AddApplicationStore} from '../../store/addApplicationStore';
import {Icon, Form, Result, Button} from 'antd';
import CongifSettingsForm from './components/ConfigSettingsForm/CongifSettingsForm';
import IODCSupportForm from './components/IODCSupportForm/IODCSupportForm';
import {navigate, navigateInLayout} from '../../common/util';
import PlatformSelect from './components/PlatformSelect/PlatformSelect';

import './AddApplication.scss';

interface AddApplicationProps {
  addApplicationStore: AddApplicationStore;
}

@inject('addApplicationStore')
@observer
export default class AddApplication extends Component<AddApplicationProps> {
  render() {
    const {addApplicationStore} = this.props;
    return (
      <div id="add-application">
        <div className="left-container">
          <div className="step-title">
            <Icon type="close" onClick={() => addApplicationStore.cancelCreate()} />
            <span>Create a New Application Integration (Step {addApplicationStore.currentStep} of 3)</span>
          </div>
          {
            (() => {
              switch (addApplicationStore.currentStep) {
                case 1:
                  return <ContentItem title="Identity Provider and Application Name "><IODCSupportForm /></ContentItem>;
                case 2:
                  return <ContentItem title="Platform"><PlatformSelect /></ContentItem>;
                case 3:
                  return <ContentItem title="Configure Settings"><CongifSettingsForm /></ContentItem>;
              }
            })()
          }
        </div>
        <img className="add-application-bg" src={require('../../assets/images/add-application-bg.jpg')}/>
      </div>
    );
  }
}

interface ContentItemProps {
  title: string;
}

const ContentItem: FunctionComponent<ContentItemProps> = ({title, children}) => (
  <div className="add-application-content">
    <div className="add-application-content-title title-dark">{title}</div>
    {children}
  </div>
);
