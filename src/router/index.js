import React, {lazy} from "react";

import Home from '@/page/home';

const router = [
  {
    exact: true,
    path: '/',
    component: Home,
  },
  {
    path: '/page1',
    component: lazy(() => import('@/page/page1')),
  }
];

export default router;