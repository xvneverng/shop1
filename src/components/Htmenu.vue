<template>
  <div>


    <ul v-if="identity == '管理员'" class="metismenu" id="menu" qw-c="menu">

      <li qw-c="menuitem"><a class="has-arrow ai-icon" href="javascript:void()" aria-expanded="false"> <i
        class="flaticon-381-layer-1"></i> <span class="nav-text" qw-c="menuitematext">个人中心</span> </a>
        <ul aria-expanded="false" qw-c="menuitemselect">
          <li><a href="/#/AdminIndex">个人中心</a></li>
          <li><a href="/#/YonghuTongji">十强用户</a></li>
          <li><a href="/#/ShangpinTongji">十强商品</a></li>
        </ul>
      </li>

      <li qw-c="menuitem"><a class="has-arrow ai-icon" href="javascript:void()" aria-expanded="false"> <i
        class="flaticon-381-layer-1"></i> <span class="nav-text" qw-c="menuitematext">管理员管理</span> </a>
        <ul aria-expanded="false" qw-c="menuitemselect">
          <li><a href="/#/AddAdmin">添加管理员</a></li>
          <li><a href="/#/AdminManage">管理员管理</a></li>
        </ul>
      </li>

      <li qw-c="menuitem"><a class="has-arrow ai-icon" href="javascript:void()" aria-expanded="false"> <i
        class="flaticon-381-layer-1"></i> <span class="nav-text" qw-c="menuitematext">用户管理</span> </a>
        <ul aria-expanded="false" qw-c="menuitemselect">
          <li><a href="/#/AddUser">添加用户</a></li>
          <li><a href="/#/UserManage">用户管理</a></li>
        </ul>
      </li>

      <li qw-c="menuitem"><a class="has-arrow ai-icon" href="javascript:void()" aria-expanded="false"> <i
        class="flaticon-381-layer-1"></i> <span class="nav-text" qw-c="menuitematext">商品管理</span> </a>
        <ul aria-expanded="false" qw-c="menuitemselect">
          <li><a href="/#/AddGoods">添加商品</a></li>
          <li><a href="/#/GoodsManage">商品管理</a></li>
        </ul>
      </li>

      <li qw-c="menuitem"><a class="has-arrow ai-icon" href="javascript:void()" aria-expanded="false"> <i
        class="flaticon-381-layer-1"></i> <span class="nav-text" qw-c="menuitematext">购物车管理</span> </a>
        <ul aria-expanded="false" qw-c="menuitemselect">
          <li><a href="/#/AddShopcar">添加购物车</a></li>
          <li><a href="/#/ShopcarManage">购物车管理</a></li>
        </ul>
      </li>


      <li qw-c="menuitem"><a class="has-arrow ai-icon" href="javascript:void()" aria-expanded="false"> <i
        class="flaticon-381-layer-1"></i> <span class="nav-text" qw-c="menuitematext">退出系统</span> </a>
        <ul aria-expanded="false" qw-c="menuitemselect">
          <li><a @click="exitsystem">退出系统</a></li>
        </ul>
      </li>

    </ul>


    <ul v-if="identity == '用户'" class="metismenu" id="menu" qw-c="menu">


      <li qw-c="menuitem"><a class="has-arrow ai-icon" href="javascript:void()" aria-expanded="false"> <i
        class="flaticon-381-layer-1"></i> <span class="nav-text" qw-c="menuitematext">个人中心</span> </a>
        <ul aria-expanded="false" qw-c="menuitemselect">
          <li><a href="/#/UserIndex">个人中心</a></li>
        </ul>
      </li>

      <li qw-c="menuitem"><a class="has-arrow ai-icon" href="javascript:void()" aria-expanded="false"> <i
        class="flaticon-381-layer-1"></i> <span class="nav-text" qw-c="menuitematext">购物信息</span> </a>
        <ul aria-expanded="false" qw-c="menuitemselect">
          <li><a href="/#/UserShopcarManage">我的购物车</a></li>
          <li><a href="/#/UserOrderManage">我的订单</a></li>
        </ul>
      </li>

      <li qw-c="menuitem"><a class="has-arrow ai-icon" href="javascript:void()" aria-expanded="false"> <i
        class="flaticon-381-layer-1"></i> <span class="nav-text" qw-c="menuitematext">退出系统</span> </a>
        <ul aria-expanded="false" qw-c="menuitemselect">
          <li><a @click="exitsystem">退出系统</a></li>
        </ul>
      </li>

    </ul>


  </div>
</template>
<script>
  export default {
    name: "Htmenu",
    data() {
      return {
        identity: "",
        userinfo: {},
      }
    },
    methods: {
      exitsystem() {
        sessionStorage.clear();
        this.$router.push('/Login');
      }
    },
    created() {
      let _this = this;
      this.identity = window.sessionStorage.getItem("identity");
      this.userinfo = JSON.parse(window.sessionStorage.getItem("userinfo"));

      console.log(this.identity);
      console.log(this.userinfo);

      // if (!this.identity) {
      //   this.$message({
      //     message: '请先登录',
      //     type: 'success'
      //   });
      //   this.$router.push('/Login');
      // }

    },
    mounted() {
    }
  }
</script>

