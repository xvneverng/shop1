<template>
  <div>
    <div id="main-wrapper">
      <div class="nav-header">
        <a href="/#/Index" class="brand-logo"> <span style="font-size: 22px;color: #000;">电子商城</span> </a>
      </div>
      <div class="deznav">
        <div class="deznav-scroll">
          <htmenu></htmenu>
        </div>
      </div>
      <div class="content-body" style="padding-top: 0;">
        <div class="container-fluid">
          <div class="page-titles">
            <h4 qw-c="operationname">管理员个人中心</h4>
          </div>
          <div class="row">
            <div class="col-xl-9 col-lg-9">
              <div class="card">
                <div class="card-body">
                  <div class="basic-form">

                    <el-form label-width="120px">

                      <el-row>
                        <el-col style="display:none;" :span="24">
                          <el-form-item label="管理员id">
                            <el-input v-model="userinfo.id" name="id" id="id" type="text"></el-input>
                          </el-form-item>
                        </el-col>
                        <el-col :span="24">
                          <el-form-item label="账号">
                            <el-input v-model="userinfo.username" readonly name="username" id="username"
                                      type="text"></el-input>
                          </el-form-item>
                        </el-col>
                        <el-col :span="24">
                          <el-form-item label="密码">
                            <el-input v-model="userinfo.password" name="password" id="password"
                                      type="password"></el-input>
                          </el-form-item>
                        </el-col>
                        <el-col :span="24">
                          <el-form-item>
                            <el-button type="primary" @click="updateadminact">修改</el-button>
                          </el-form-item>
                        </el-col>
                      </el-row>

                    </el-form>


                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="footer">
        <div class="copyright">
          <p> © 电子商城</p>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
  import Htmenu from "./Htmenu.vue";

  export default {
    name: "AdminIndex",
    components: {Htmenu},
    data() {
      return {
        userinfo: {},
        identity: '',
      }
    },
    methods: {
      uploadfile(file, itemname, attr) {
        console.log(file)
        let _this = this;
        var forms = new FormData()
        var configs = {
          headers: {'Content-Type': 'multipart/form-data'}
        };
        forms.append('file', file.target.files[0])
        this.$axios.post("/addfilejson", forms, configs).then(res => {
          console.log(res);
          //$(".fileimg").attr("src","http://localhost:5000/static/upload/" + res.data);
          _this.$forceUpdate();
          _this[itemname][attr] = res.data;
        })
      },
      getNowTime() {
        return new Date(+new Date() + 8 * 3600 * 1000).toJSON().substr(0, 19).replace("T", " ");
      },
      serializeForm(formid) {
        var fields;
        if (formid) {
          fields = $('#' + formid).serializeArray();
        } else {
          fields = $("form").serializeArray();
        }
        var obj = {}; //声明一个对象
        $.each(fields, function (index, field) {
          obj[field.name] = field.value; //通过变量，将属性值，属性一起放到对象中
        })
        return obj;
      }, updateadminact: function () {
        let _this = this;
        this.$axios.post("/updateadminactjson", _this.userinfo)
          .then(res => {
            console.log(res.data);
            var obj = res.data;
            this.$axios.post("/admindetailsjson?id=" + _this.userinfo['id'], _this.serializeForm())
              .then(res => {
                console.log(res);
                var obj = res.data;
                _this.userinfo = obj['admin'];
                sessionStorage.setItem("userinfo", JSON.stringify(_this.userinfo));
                this.$message({
                  message: '修改个人信息成功',
                  type: 'success'
                });
              })
              .catch(err => {
                console.log(err)
                this.$message({
                  message: '获取管理员信息失败',
                  type: 'error'
                });
              })
          })
          .catch(err => {
            console.log(err)
            this.$message({
              message: '修改管理员信息失败',
              type: 'error'
            });
          })
      }, admindetailsjson(id) {
        let _this = this;
        this.$axios.post("/admindetailsjson?id=" + id)
          .then(res => {

            if (res.data == "请先登录") {
              this.$message({
                message: '请先登录',
                type: 'success'
              });
              _this.$router.push('/Login');
            }

            console.log(res.data);
            _this.userinfo = res.data.admin;
          })
          .catch(err => {
            console.log(err)
            this.$message({
              message: '获取管理员信息失败',
              type: 'error'
            });
          })
      },
    },
    created() {
      let _this = this;
      _this.identity = sessionStorage.getItem("identity");
      _this.admindetailsjson(sessionStorage.getItem("id"));
    },
    beforeCreate() {

      $("#cssdiv").html("");

      var cssstr = "<link rel=\"icon\" type=\"image/png\" sizes=\"16x16\" href=\"https://www.17sucai.com/2021/6/khlrr10467/images/favicon.png\"> " +
        "<link href=\"/static/houtai/css/bootstrap-select.min.css\" rel=\"stylesheet\"> " +
        "<link href=\"/static/houtai/css/style.css\" rel=\"stylesheet\"> " +
        "<link href=\"/static/houtai/css/css2.css\" rel=\"stylesheet\"> "
      ;

      $("#cssdiv").html(cssstr);
      $("#jsdiv").html("");

      var jsstr = "<script src=\"/static/houtai/js/global.min.js\"><\/script> " +
        "<script src=\"/static/houtai/js/bootstrap-select.min.js\"><\/script> " +
        "<script src=\"/static/houtai/js/custom.min.js\"><\/script> " +
        "<script src=\"/static/houtai/js/deznav-init.js\"><\/script> ";
      setTimeout(function () {
        $("#jsdiv").html(jsstr);
      }, 100);

    },
    mounted() {
      let _this = this;


      setTimeout(function () {

        if ("") {
          alert("");
        }

      }, 20)
    }
  }
</script>

