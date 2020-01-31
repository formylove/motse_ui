import React, {FunctionComponent, useState} from 'react';
import {Button, Icon} from 'antd';
import './PlatformSelect.scss';
import {useStores, observer, navigate} from '../../../../common/util';
import classnames from 'classnames';
import {AddApplicationStore} from '../../../../store/addApplicationStore';

const IconFont = Icon.createFromIconfontCN({
  scriptUrl: '//at.alicdn.com/t/font_1594566_tupl204rxs8.js',
});

const PlatformSelect: FunctionComponent = () => {
  const addApplicationStore = useStores<AddApplicationStore>('addApplicationStore');
  const [platform, setPlatform] = useState(addApplicationStore.applicationData.platform || 'WEB');

  return (
    <div className="platform-select">
      <span>Choose the platform of your application, and we'll recommend settings on the next step.</span>
      <PlatformSelectContainer 
        currentSelectPlatform={platform}
        onChange={setPlatform}
      />
      <div className="control-container">
        <Button onClick={() => addApplicationStore.setCurrentStep(1)}>Previous</Button>
        <Button onClick={() => addApplicationStore.cancelCreate()}>Cancel</Button>
        <Button 
          onClick={() => {
            addApplicationStore.setApplicationData({
              platform,
            });
            addApplicationStore.setCurrentStep(3);
          }
          }
          type="primary">Next</Button>
      </div>
    </div>
  );
};

export default observer(PlatformSelect);

interface PlatformSelectContainerProps {
    currentSelectPlatform: string;
    onChange: React.Dispatch<any>;
}

function PlatformSelectContainer({currentSelectPlatform, onChange}: PlatformSelectContainerProps) {
  const platformItemList = [
    {
      key: 'WEB',
      icon: 'icon-monitor',
      title: 'Web',
      subTitle: 'JAVA, .NET, etc.',
      canIUse: true,
    },
    {
      key: 'NATIVE',
      icon: 'icon-mobile-android',
      title: 'Native',
      subTitle: 'iOS, Andriod',
      canIUse: false,
    },
    {
      key: 'SPA',
      icon: 'icon-web-section-alt',
      title: 'Single-Page App',
      subTitle: 'Angular, React',
      canIUse: false,
    },
    {
      key: 'SERVICE',
      icon: 'icon-server',
      title: 'Service',
      subTitle: 'Machine-to-Machine',
      canIUse: false,
    },
  ];

  return (
    <div className="platform-select-container">
      {
        platformItemList.map((item) => (
          <div
            onClick={() => {
              if (item.canIUse) {
                onChange(item.key);
              }
            }}
            key={item.key}
            className={classnames({
              'platform-item': true,
              'active': item.key === currentSelectPlatform,
              'disable': !item.canIUse,
            })}>
            <IconFont className="icon" type={item.icon} />
            <div className="title title-dark">{item.title}</div>
            <div className="subtitle sub-title-dark">{item.subTitle}</div>
          </div>
        ))
      }
    </div>
  );
}
