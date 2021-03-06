import Vue from 'vue'
import VueRouter from 'vue-router'
import DefaultLayout from '@/views/DefaultLayout.vue'
import LoginLayout from '@/views/LoginLayout.vue'
import { Auth } from 'aws-amplify'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    component: DefaultLayout,
    redirect: '/dashboard',
    beforeEnter: (to, from, next) => {
      Auth
        .currentAuthenticatedUser({ bypassCache: false })
        .then(() => next())
        .catch(() => next({ name: 'Login' }))
    },
    children: [
      {
        path: 'dashboard',
        name: 'Dashboard',
        component: () => import(/* webpackChunkName: "dashboard" */ '../views/app/Dashboard.vue')
      },
      {
        path: 'device-management',
        component: () => import(/* webpackChunkName: "device" */ '../views/app/Device.vue'),
        children: [
          {
            path: '/',
            name: 'GatewaysManagement',
            component: () => import(/* webpackChunkName: "device" */ '../views/app/device/index.vue')
          },
          {
            path: ':gateway',
            name: 'GroupsManagement',
            component: () => import(/* webpackChunkName: "device" */ '../views/app/device/Groups.vue')
          }
        ]
      },
      {
        path: 'scheduling-management',
        component: () => import(/* webpackChunkName: "scheduling" */ '../views/app/Scheduling.vue'),
        children: [
          {
            path: '/',
            name: 'SchedulingManagement',
            component: () => import(/* webpackChunkName: "scheduling" */ '../views/app/schedule/index.vue')
          },
          {
            path: ':gateway',
            name: 'SchedulingManagementList',
            component: () => import(/* webpackChunkName: "scheduling" */ '../views/app/schedule/List.vue')
          }
        ]
      },
      {
        path: 'setting',
        name: 'Setting',
        component: () => import(/* webpackChunkName: "setting" */ '../views/app/Setting.vue')
      },
      {
        path: 'user-management',
        name: 'UserManagement',
        component: () => import(/* webpackChunkName: "user" */ '../views/app/User.vue')
      }
    ]
  },
  {
    path: '/user',
    component: LoginLayout,
    redirect: '/user/login',
    beforeEnter: (to, from, next) => {
      Auth
        .currentAuthenticatedUser({ bypassCache: false })
        .then(() => next({ name: 'Dashboard' }))
        .catch(() => next())
    },
    children: [
      {
        path: 'login',
        name: 'Login',
        component: () => import(/* webpackChunkName: "user" */ '../views/user/Login.vue')
      },
      {
        path: '/force-change-password/:email',
        name: 'ForceChangePassword',
        component: () => import(/* webpackChunkName: "user" */ '../views/user/ForceChangePassword.vue')
      },
      {
        path: '/force-change-password',
        redirect: '/force-change-password/none'
      }
    ]
  }
]

const router = new VueRouter({
  routes
})

export default router
