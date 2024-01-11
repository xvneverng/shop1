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
            <h4 qw-c="operationname">修改购物车</h4>
          </div>
          <div class="row">
            <div class="col-xl-9 col-lg-9">
              <div class="card">
                <div class="card-body">
                  <div class="basic-form">

                    <el-form label-width="120px">

                      <el-row>
                        <el-col style="display:none;" :span="24">
                          <el-form-item label="购物车id">
                            <el-input v-model="shopcar.id" name="id" id="id" type="text"></el-input>
                          </el-form-item>
                        </el-col>
                        <el-col :span="24">
                          <el-form-item label="商品">
                            <input maxlength="-1" type="hidden" name="goods" id="goods" v-model="shopcar.goods">
                            <el-select name="goodsid" id="goodsid" v-on:change="goodschange()" v-model="shopcar.goodsid"
                                       placeholder="请选择商品">
                              <el-option
                                v-for="item in goodsall"
                                :key="item.id"
                                :label="item.name"
                                :value="item.id">
                              </el-option>
                            </el-select>
                          </el-form-item>
                        </el-col>
                        <el-col :span="24">
                          <el-form-item label="价格">
                            <el-input v-model="shopcar.price" name="price" id="price" type="text"></el-input>
                          </el-form-item>
                        </el-col>
                        <el-col :span="24">
                          <el-form-item label="数量">
                            <el-input v-model="shopcar.number" name="number" id="number" type="text"></el-input>
                          </el-form-item>
                        </el-col>
                        <el-col :span="24">
                          <el-form-item label="状态">
                            <input maxlength="-1" type="hidden" name="state" id="state" v-model="shopcar.state">
                            <el-select name="state" id="state" v-model="shopcar.state" placeholder="请选择">
                              <el-checkbox label="未付款"></el-checkbox>
                              <el-option key="未付款" label="未付款" value="未付款"></el-option>
                              <el-checkbox label="已付款"></el-checkbox>
                              <el-option key="已付款" label="已付款" value="已付款"></el-option>
                            </el-select>
                          </el-form-item>
                        </el-col>
                        <el-col :span="24">
                          <el-form-item>
                            <el-button type="primary" @click="updateshopcaract">修改</el-button>
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
    name: "UserUpdateShopcar",
    components: {Htmenu},
    data() {
      return {
        shopcar: {},
        identity: '',
        goodsall: [],
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
      }, searchgoods() {
        let _this = this;
        this.$axios.post("/searchgoodsjson", "")
          .then(res => {
            _this.goodsall = res.data.goodsall;
            var goodsid = _this.$route.query.goodsid;
            if (goodsid != null) {
              _this.goodsall = _this.goodsall.filter(function (item) {
                return item.id == goodsid;
              })
            }
            ;
          })
          .catch(err => {
            console.log(err)
          })
      },
      goodschange: function () {
        let _this = this;
        _this.shopcar.goods = _this.goodsall.filter(function (item) {
          return item.id == _this.shopcar.goodsid;
        })[0]["name"];
        _this.$forceUpdate();
      },
      shopcardetailsjson: function (id) {
        let _this = this;
        this.$axios.post("/shopcardetailsjson?id=" + id, "")
          .then(res => {
            var obj = res['data'];
            console.log(obj)
            _this.shopcar = obj['shopcar'];
          })
          .catch(err => {
            console.log(err)
          })
      },
      updateshopcaract: function () {
        let _this = this;
        this.$axios.post("/updateshopcaractjson", _this.shopcar)
          .then(res => {
            console.log(res.data);
            var obj = res.data;
            this.$message({
              message: '修改购物车信息成功',
              type: 'success'
            });
            _this.$router.push('/UserShopcarManage');
          })
          .catch(err => {
            console.log(err)
            this.$message({
              message: '修改购物车信息失败',
              type: 'error'
            });
          })
      },
    },
    created() {
      let _this = this;
      _this.identity = sessionStorage.getItem("identity");
      _this.userinfo = JSON.parse(sessionStorage.getItem("userinfo"));
      _this.searchgoods();
      _this.$set(_this.shopcar, 'user', _this.userinfo.name);
      _this.$set(_this.shopcar, 'userid', _this.userinfo.id);
      var id = _this.$route.query.id
      _this.shopcardetailsjson(id);
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

