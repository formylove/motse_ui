// TODO: 1. Add color variables 2. Add path alias

import React, {FunctionComponent, useEffect} from 'react';
import {Router, Route, Switch, Redirect, useLocation} from 'react-router-dom';
import {syncHistoryWithStore} from 'mobx-react-router';
import {Provider} from 'mobx-react';
import { Row, Col } from 'antd';


import './App.scss';

import rootRouter from './router/rootRouter';
import {history as browserHistory} from './common/history';
import {routerStore} from './store/routerStore';
import * as mobxStore from './store/index';
import NotFound from './page/NotFound/NotFound';
import { Link } from "react-router-dom";
import SideMenu from "./layout/components/SideMenu/SideMenu";
import Header from "./layout/components/Header/Header";
import {MerlinLoading} from './component/Loading/MerlinLoading';
import {useStores, observer, getUserSession, navigate} from './common/util';
import {AppStore} from './store/appStore';

const history = syncHistoryWithStore(browserHistory, routerStore);

const App: React.FC = () => {
  return (
    <Provider {...mobxStore}>
      <Router history={history}>
        <Header></Header>
        <Row>
          <Col span={4}><SideMenu /></Col>
          <Col span={20}>        
          <Switch>
            <Redirect exact from="/" to="/home" />
            <LoginedFilter />
          </Switch></Col>
        </Row>

      </Router>
    </Provider>
  );
};

const Loading = observer(() => {
  const appStore = useStores<AppStore>('appStore');
  return (
    <MerlinLoading loading={appStore.isGlobalLoading > 0} mask />
  );
});

export default App;

const LoginedFilter: FunctionComponent = () => {
  // useEffect(() => {
  //   const user = getUserSession();
  //   if (false ) {
  //     navigate('/login');
  //   }
  // });

  return (
    <Switch>
      {
        rootRouter.map(({path, component, ...otherProps}) => (
          <Route
            path={path}
            component={component}
            {...otherProps}
            key={path}
          />
        ))
      }
      {/* <Route path="*" component={NotFound} /> */}
    </Switch>
  );
};
