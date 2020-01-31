/* eslint-disable react/display-name */
/* eslint-disable new-cap */
import React from 'react';
import Loadable from 'react-loadable';
import {MerlinLoading} from '../component/Loading/MerlinLoading';

const layoutRouter = [
  {
    path: '/home',
    key: 'home',
    name: 'datawiza',
    component: Loadable({
      loader: () => import('../page/Home/Home2'),
      loading: () => <MerlinLoading />,
    }),
  },
  {
    path: '/applications',
    key: 'applications',
    name: 'Applications',
    component: Loadable({
      loader: () => import('../page/Applications/Applications'),
      loading: () => <MerlinLoading />,
    }),
  },
  {
    path: '/rules',
    key: 'rules',
    name: 'Rules',
    component: Loadable({
      loader: () => import('../page/Rules/Rules'),
      loading: () => <MerlinLoading />,
    }),
  },
  {
    path: '/rules/create',
    key: 'create-rule',
    hidden: true,
    component: Loadable({
      loader: () => import('../page/Rules/RuleForm'),
      loading: () => <MerlinLoading />,
    }),
  },
  {
    path: '/application-detail/:applicationId/:type',
    key: 'application-detail',
    hidden: true,
    component: Loadable({
      loader: () => import('../page/ApplicationDetail/ApplicationDetail'),
      loading: () => <MerlinLoading />,
    }),
  },
];

export default layoutRouter;
