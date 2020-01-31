import React, {FunctionComponent} from 'react';
import {Avatar, Icon, Popover, Button} from 'antd';
import {useStores, observer} from '../../../common/util';
import {UserStore} from '../../../store/userStore';
import * as UserMgmtRes from '../../../services/model/UserMgmtRes';
import './User.scss';

const User: FunctionComponent = observer(() => {
  const userStore = useStores<UserStore>('userStore');
  const user = userStore.user as UserMgmtRes.UserInfo;
  const content = (
    <div className="content-wrapper">
      <div className="user-info">
        <Avatar className="avatar" icon={<Icon type="user" />} />
        <div className="user-name">{user.userName}</div>
      </div>

      <div
        className="menu-item"
        role="button"
        tabIndex={0}
        onClick={() => userStore.logout()}
      >
        Logout
      </div>
    </div>
  );

  return (
    <Popover content={content} trigger="click" placement="bottomRight">
      <div className="user-info-container">
        <div className="nick-name">{user.userName}</div>
        <Avatar className="avatar" icon={<Icon type="user" />} />
        <Icon className="down-icon" type="down" />
      </div>
    </Popover>
  );
});

export default User;
