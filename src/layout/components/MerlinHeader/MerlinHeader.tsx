import React, {Component, FunctionComponent} from 'react';
import {Layout} from 'antd';
import './MerlinHeader.scss';
import layoutRouter from '../../../router/layoutRouter';
import {navigate, useStores, observer} from '../../../common/util';
import {NavLink} from 'react-router-dom';
import {VERSION} from '../../../common/constants';
import User from '../User/User';

const {Header, Footer, Sider, Content} = Layout;

const MerlinHeader: FunctionComponent = observer(() => {
  return (
    <Header id="layout-header">
      <div className="tab-container">
        {
          layoutRouter.map(({key, hidden, name, path}) => {
            return !hidden && <NavLink
              className="tab-item"
              to={`/${VERSION}${path}`}
              activeClassName="active"
              key={key}>{name}</NavLink>;
          })
        }
      </div>
      <User />
    </Header>
  );
});

export default MerlinHeader;
