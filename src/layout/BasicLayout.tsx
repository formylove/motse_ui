import React, {Component, Fragment} from 'react';
import {observer, inject} from 'mobx-react';
import {Layout} from 'antd';
import {Route, Switch, RouteComponentProps} from 'react-router-dom';
import MerlinHeader from './components/MerlinHeader/MerlinHeader';
import layoutRouter from '../router/layoutRouter';
import Home from '../page/Home/Home';

const {Header, Footer, Sider, Content} = Layout;

type BasicLayoutProps = RouteComponentProps

export default class BasicLayout extends Component<BasicLayoutProps> {
  render() {
    const {match: {path}} = this.props;
    return (
      <Layout style={{height: '100%'}}>
        <MerlinHeader />
        <Switch>
          {
            layoutRouter.map((item) => {
              const Component = item.component;
              return (
                <Route
                  key={item.key}
                  exact
                  path={`${path}${item.path}`}
                  component={Component}
                />
              );
            })
          }
        </Switch>
        {/* <Footer>Footer</Footer> */}
      </Layout>
    );
  }
}
