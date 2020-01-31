/* eslint-disable react/display-name */
/* eslint-disable new-cap */
import React from 'react';
import Loadable from 'react-loadable';
import {MerlinLoading} from '../component/Loading/MerlinLoading';
import {VERSION} from '../common/constants';

const rootRouter = [
  {
    path: `/${VERSION}`,
    key: 'version',
    component: Loadable({
      loader: () => import('../layout/BasicLayout'),
      loading: () => <MerlinLoading />,
    }),
  },
  {
    path: '/applications/create',
    key: 'add-application',
    component: Loadable({
      loader: () => import('../page/AddApplication/AddApplication'),
      loading: () => <MerlinLoading />,
    }),
  },
  {
    path: '/login',
    key: 'login',
    component: Loadable({
      loader: () => import('../page/Login/Login'),
      loading: () => <MerlinLoading />,
    }),
  },
];

export default rootRouter;
