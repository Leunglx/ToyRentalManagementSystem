import { createRouter, createWebHistory } from 'vue-router'

import Toy from '../pages/toy.vue'
import Member from '../pages/member.vue'
import Clerk from '../pages/Clerk.vue'
import RentalList from '../pages/RentalList.vue'
import Work from '../pages/Work.vue'

const routes = [
  {
    path: '/',
    redirect: '/Toy',
  },
  {
    path: '/Toy',
    name: 'Toy',
    component: Toy,
  },
  {
    path: '/Member',
    name: 'Member',
    component: Member,
  },
  {
    path: '/Clerk',
    name: 'Clerk',
    component: Clerk,
  },
  {
    path: '/RentalList',
    name: 'RentalList',
    component: RentalList,
  },
  {
    path: '/Work',
    name: 'Work',
    component: Work,
  }
]

// 创建路由实例 并将路由记录传递给该实例的 routes 属性
const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;