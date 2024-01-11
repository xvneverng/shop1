import Vue from 'vue'
import Router from 'vue-router'

import Login from '@/components/Login'
import Regist from '@/components/Regist'
import AddAdmin from '@/components/AddAdmin'
import AdminManage from '@/components/AdminManage'
import AdminView from '@/components/AdminView'
import UpdateAdmin from '@/components/UpdateAdmin'
import AdminIndex from '@/components/AdminIndex'
import AddUser from '@/components/AddUser'
import UserManage from '@/components/UserManage'
import UserView from '@/components/UserView'
import UpdateUser from '@/components/UpdateUser'
import UserIndex from '@/components/UserIndex'
import AddGoods from '@/components/AddGoods'
import GoodsManage from '@/components/GoodsManage'
import GoodsView from '@/components/GoodsView'
import UpdateGoods from '@/components/UpdateGoods'
import SearchGoods from '@/components/SearchGoods'
import GoodsDetails from '@/components/GoodsDetails'
import AddShopcar from '@/components/AddShopcar'
import ShopcarManage from '@/components/ShopcarManage'
import ShopcarView from '@/components/ShopcarView'
import UpdateShopcar from '@/components/UpdateShopcar'
import UserShopcarManage from '@/components/UserShopcarManage'
import UserAddShopcar from '@/components/UserAddShopcar'
import UserUpdateShopcar from '@/components/UserUpdateShopcar'
import UserOrderManage from '@/components/UserOrderManage'
import Index from '@/components/Index'
import ShangpinTongji from '@/components/ShangpinTongji'
import YonghuTongji from '@/components/YonghuTongji'

Vue.use(Router)

export default new Router({
  routes: [
            {
      path: '/ShangpinTongji',
      name: 'ShangpinTongji',
      component: ShangpinTongji
    },
        {
      path: '/YonghuTongji',
      name: 'YonghuTongji',
      component: YonghuTongji
    },
    {
      path: '/',
      name: 'Index',
      component: Index
    },
    {
      path: '/Index',
      name: 'Index',
      component: Index
    },
    {
      path: '/UserOrderManage',
      name: 'UserOrderManage',
      component: UserOrderManage
    },
    {
      path: '/Login',
      name: 'Login',
      component: Login
    },
    {
      path: '/Regist',
      name: 'Regist',
      component: Regist
    },
    {
      path: '/AddAdmin',
      name: 'AddAdmin',
      component: AddAdmin
    },
    {
      path: '/AdminManage',
      name: 'AdminManage',
      component: AdminManage
    },
    {
      path: '/AdminView',
      name: 'AdminView',
      component: AdminView
    },
    {
      path: '/UpdateAdmin',
      name: 'UpdateAdmin',
      component: UpdateAdmin
    },
    {
      path: '/AdminIndex',
      name: 'AdminIndex',
      component: AdminIndex
    },
    {
      path: '/AddUser',
      name: 'AddUser',
      component: AddUser
    },
    {
      path: '/UserManage',
      name: 'UserManage',
      component: UserManage
    },
    {
      path: '/UserView',
      name: 'UserView',
      component: UserView
    },
    {
      path: '/UpdateUser',
      name: 'UpdateUser',
      component: UpdateUser
    },
    {
      path: '/UserIndex',
      name: 'UserIndex',
      component: UserIndex
    },
    {
      path: '/AddGoods',
      name: 'AddGoods',
      component: AddGoods
    },
    {
      path: '/GoodsManage',
      name: 'GoodsManage',
      component: GoodsManage
    },
    {
      path: '/GoodsView',
      name: 'GoodsView',
      component: GoodsView
    },
    {
      path: '/UpdateGoods',
      name: 'UpdateGoods',
      component: UpdateGoods
    },
    {
      path: '/SearchGoods',
      name: 'SearchGoods',
      component: SearchGoods
    },
    {
      path: '/GoodsDetails',
      name: 'GoodsDetails',
      component: GoodsDetails
    },
    {
      path: '/AddShopcar',
      name: 'AddShopcar',
      component: AddShopcar
    },
    {
      path: '/ShopcarManage',
      name: 'ShopcarManage',
      component: ShopcarManage
    },
    {
      path: '/ShopcarView',
      name: 'ShopcarView',
      component: ShopcarView
    },
    {
      path: '/UpdateShopcar',
      name: 'UpdateShopcar',
      component: UpdateShopcar
    },
    {
      path: '/UserShopcarManage',
      name: 'UserShopcarManage',
      component: UserShopcarManage
    },
    {
      path: '/UserAddShopcar',
      name: 'UserAddShopcar',
      component: UserAddShopcar
    },
    {
      path: '/UserUpdateShopcar',
      name: 'UserUpdateShopcar',
      component: UserUpdateShopcar
    },
  ]
})


