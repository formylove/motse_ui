import React, {FunctionComponent, useEffect} from 'react';
import './ApplicationDetail.scss';
import {Tabs, Icon} from 'antd';
import General from './components/General/General';
import Rules from './components/Rules/Rules';
import APIToken from './components/APIToken/APIToken';
import {navigate, navigateInLayout, useStores} from '../../common/util';
import IconFont, {TYPE} from '../../component/IconFont/IconFont';
import {RouteComponentProps, useParams, useLocation, useRouteMatch} from 'react-router-dom';
import {ApplicationsStore} from '../../store/applicationsStore';
import * as ApplicationMgmtRes from '../../services/model/ApplicationMgmtRes';
import {IReactComponent, observer} from 'mobx-react';

type ApplicationDetailParams = {
  type: string;
  applicationId: string;
}

const {TabPane} = Tabs;
type TabListType = {
  key: string;
  name: string;
  Component: IReactComponent;
};

const tabList: TabListType[] = [
  {
    key: 'general',
    name: 'General',
    Component: General,
  },
  {
    key: 'rules',
    name: 'Rules',
    Component: Rules,
  },
  {
    key: 'apitoken',
    name: 'API Tokens',
    Component: APIToken,
  },
];

const ApplicationDetail: FunctionComponent = observer(() => {
  const {path} = useRouteMatch();
  const {type, applicationId} = useParams<ApplicationDetailParams>();
  const applicationsStore = useStores<ApplicationsStore>('applicationsStore');
  const currentApplication = applicationsStore.currentApplication as ApplicationMgmtRes.Application;

  useEffect(() => {
    applicationsStore.getApplicationDetail(applicationId);
  }, []);

  return (
    <div className="application-detail">
      <div className="application-detail-header">
        <div className="top-control" onClick={() => navigateInLayout('/applications')}>
          <Icon className="left-icon" type="left" />
          <span>Back to Applications</span>
        </div>
        <div className="application-info">
          {currentApplication.platform && <IconFont className="type-icon" type={TYPE[currentApplication.platform]} />}
          <div className="right-container">
            <div className="title">{currentApplication.name}</div>
            <div className="info-container">
              <div className="application-type">{currentApplication.platform}</div>
              <div className="client-id"><span className="client-id-title">Client ID</span>{currentApplication.clientId}</div>
            </div>
          </div>
        </div>
      </div>
      {
        JSON.stringify(currentApplication) !== '{}' &&
        <div className="application-detail-tab-container">
          <Tabs
            activeKey={type}
            onChange={(activeKey) => navigate(path.replace(':applicationId', applicationId).replace(':type', activeKey))}
          >
            {
              tabList.map(({key, name, Component}) => {
                return (
                  <TabPane tab={name} key={key}>
                    <Component />
                  </TabPane>
                );
              })
            }
          </Tabs>
        </div>
      }
    </div>
  );
});

export default ApplicationDetail;
