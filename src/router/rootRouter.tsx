/* eslint-disable react/display-name */
/* eslint-disable new-cap */
import React from 'react';
import Loadable from 'react-loadable';
import {MerlinLoading} from '../component/Loading/MerlinLoading';

const rootRouter = [

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
  }
];

export default rootRouter;
