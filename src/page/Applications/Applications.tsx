import React, {Component, FunctionComponent} from 'react';
import {Icon, Table, Button} from 'antd';
import './Applications.scss';
import {navigate, navigateInLayout} from '../../common/util';
import ApplicationsTable from './ApplicationsTable/ApplicationsTable';
import {inject, observer} from 'mobx-react';
import {ApplicationsStore} from '../../store/applicationsStore';

interface ApplicationsProps {
  applicationsStore: ApplicationsStore;
}

@inject('applicationsStore')
@observer
export default class Applications extends Component<ApplicationsProps> {
  componentDidMount() {
    this.props.applicationsStore.init();
  }

  render(): React.ReactNode {
    return (
      <div className="applications">
        <div className="top-control" onClick={() => navigateInLayout('/home')}>
          <Icon className="left-icon" type="left" />
          <span>Home</span>
        </div>
        <div className="header">
          <div className="left-container">
            <div className="title title-dark">Applications</div>
            <div className="sub-title">Choose the application you would like to manage.</div>
          </div>
          <div className="right-container">
            <div className="add-application" onClick={() => navigate('/applications/create')}>
              <Icon className="plus-icon" type="plus" />
              <span>Create Application</span>
            </div>
          </div>
        </div>
        <div className="applications-list">
          <ApplicationsTable />
        </div>
      </div>
    );
  }
}


