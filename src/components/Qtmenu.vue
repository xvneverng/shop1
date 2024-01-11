<template>
  <div>
    <ul qw-c="menu">
      <li qw-c="menu-item"><span><a href="index" qw-c="menu-itema menu-itemtext">首页</a></span></li>
      <li v-if="identity=='管理员'" qw-c="menu-item"><span><a href="/#/AdminIndex" qw-c="menu-itema menu-itemtext">个人中心</a></span></li>
      <li v-if="identity=='用户'" qw-c="menu-item"><span><a href="/#/UserIndex" qw-c="menu-itema menu-itemtext">个人中心</a></span></li>
      <li qw-c="menu-item" v-if="!identity"><span><a href="/#/Login" qw-c="menu-itema menu-itemtext">登录</a></span></li>
      <li qw-c="menu-item"  v-if="!identity"><span><a href="/#/Regist" qw-c="menu-itema menu-itemtext">注册</a></span></li>
    </ul>
  </div>
</template>
<script>
  export default {
    name: "Qtmenu",
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

    },
    mounted() {
    }
  }
</script>


