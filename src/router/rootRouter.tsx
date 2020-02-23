/* eslint-disable react/display-name */
/* eslint-disable new-cap */
import React from 'react';
import Loadable from 'react-loadable';
import {MerlinLoading} from '../component/Loading/MerlinLoading';
import {VERSION} from '../common/constants';

const rootRouter = [
  {
    path: `/${VERSION}`,
    key: "version",
    component: Loadable({
      loader: () => import("../layout/BasicLayout"),
      loading: () => <MerlinLoading />
    })
  },
  {
    path: "/applications/create",
    key: "add-application",
    component: Loadable({
      loader: () => import("../page/AddApplication/AddApplication"),
      loading: () => <MerlinLoading />
    })
  },
  {
    path: "/cards/botany/create",
    key: "create-card",
    component: Loadable({
      loader: () => import("../page/CreateCard/CreateCard"),
      loading: () => <MerlinLoading />
    })
  },

  {
    path: "/cards/botany/list",
    key: "list-botany-cards",
    component: Loadable({
      loader: () => import("../page/Cards/Cards"),
      loading: () => <MerlinLoading />
    })
  },
  {
    path: "/login",
    key: "login",
    component: Loadable({
      //import()类似于 Node 的require方法，区别主要是前者是异步加载，后者是同步加载。
      loader: () => import("../page/Login/Login"),
      loading: () => <MerlinLoading />
    })
  }
];

export default rootRouter;
