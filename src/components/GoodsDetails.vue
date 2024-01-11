<template>
  <div>

    <!-- header area start -->
    <div class="header-area">
      <div class="container">
        <div class="row">
          <!-- logo start -->
          <div class="col-md-3">
            <div class="header-logo">
              <a href="/#/Index"><img src="/static/qianduan/assets/img/logo.png" alt="logo" class="img-fluid"/></a>
            </div>
          </div>
          <div class="responsive-menu-wrap"></div>
          <!-- nav start -->
          <div class="col-md-9">
            <div class="mainmenu">
              <qtmenu></qtmenu>
            </div>
          </div>
          <!-- nav end -->
        </div>
      </div>
    </div>
    <!-- header area end -->
    <!-- breadcroumb area start -->
    <div class="mayabi-breadcroumb blue-bg text-center sec-p-100">
      <div class="container">
        <div class="row">
          <div class="col-md-12">
            <h2>商品详情</h2>
            <h4><a href="/#/Index">首页 </a>/ 商品详情</h4>
          </div>
        </div>
      </div>
    </div>
    <!-- breadcroumb area end -->
    <!-- blog area start -->
    <div class="blog-area sec-p-100">
      <div class="container">
        <div class="row">
          <div class="col-md-12 col-sm-12">
            <div class="row">
              <div class="col-md-12">
                <div class="blog-details">
                  <div class="single-blog-content">
                    <h3><a href="#">{{goods.name}}</a></h3>


                    <img :src="'http://localhost:5000/static/upload/' + goods.pic"
                         style="width: 100%;height: 500px;margin-bottom: 15px;">

                    <table id="detailstable" class="table">
                      <tbody>
                      <tr>
                        <td>编号</td>
                        <td>{{goods.number}}</td>
                      </tr>
                      <tr>
                        <td>名称</td>
                        <td>{{goods.name}}</td>
                      </tr>
                      <tr>
                        <td>价格</td>
                        <td>{{goods.price}}</td>
                      </tr>
                      </tbody>
                    </table>

                  </div>
                </div>

                <div class="job-apply-wrapper mb-5 mt-4" id="caozuomoban">

                  <a v-if="identity == '用户'" :href="'/#/UserAddShopcar?goodsid=' + goods.id + '&price=' + goods.price" style="color: white;" class="btn btn-success">购买</a>
                  <a v-if="identity != '用户'" href="/#/Login" style="color: white;" class="btn btn-success">登录</a>

                </div>

                <div class="job-apply-wrapper mb-5 mt-4">
                </div>

              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <footer>
      <div class="footer-area sec-p-50">
        <div class="container">
          <div class="row">
            <div class="col-md-12">
              <div class="copy-right text-center">
                <div class="footer-logo mb-30">
                  <a href="#"><img src="/static/qianduan/assets/img/logo.png" alt="logo" class="img-fluid"/></a>
                </div>
                电子商城系统
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
    <!-- footer area end -->
    <!-- scrolltop button -->
    <div class="material-scrolltop"></div>

    <!-- js here -->


  </div>
</template>
<script>
  import Qtmenu from "./Qtmenu.vue";

  export default {
    name: "GoodsDetails",
    components: {Qtmenu},
    data() {
      return {
        identity: '',
        goods: {},
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
      },

      goodsdetailsjson: function () {
        let _this = this;
        var id = _this.$route.query.id;
        this.$axios.post("/goodsdetailsjson?id=" + id, '')
          .then(res => {
            console.log(res.data);
            var obj = res.data;
            console.log(obj);
            _this.goods = obj['goods'];
          })
          .catch(err => {
            console.log(err)
            this.$message({
              message: '获取商品信息失败',
              type: 'error'
            });
          })
      },
    },
    created() {
      let _this = this;
      _this.identity = sessionStorage.getItem("identity");
      _this.userinfo = JSON.parse(sessionStorage.getItem("userinfo"));
      _this.goodsdetailsjson();
    },
    beforeCreate() {

      $("#cssdiv").html("");

      var cssstr = "<link rel=\"stylesheet\" href=\"/static/qianduan/assets/css/bootstrap.min.css\"> " +
        "<link rel=\"stylesheet\" href=\"/static/qianduan/assets/css/owl.carousel.min.css\"> " +
        "<link rel=\"stylesheet\" href=\"/static/qianduan/assets/css/owl.theme.default.min.css\"> " +
        "<link rel=\"stylesheet\" href=\"/static/qianduan/assets/css/slicknav.min.css\"> " +
        "<link rel=\"stylesheet\" href=\"/static/qianduan/assets/css/animate.min.css\"> " +
        "<link rel=\"stylesheet\" href=\"/static/qianduan/assets/css/magnific-popup.css\"> " +
        "<link rel=\"stylesheet\" href=\"/static/qianduan/assets/css/font-awesome.min.css\"> " +
        "<link rel=\"stylesheet\" href=\"/static/qianduan/assets/css/linebar.min.css\"> " +
        "<link rel=\"stylesheet\" href=\"/static/qianduan/assets/css/scrolltop.css\"> " +
        "<link rel=\"stylesheet\" href=\"/static/qianduan/assets/css/nice-select.css\"> " +
        "<link rel=\"stylesheet\" href=\"/static/qianduan/assets/css/jquery-ui.css\"> " +
        "<link rel=\"stylesheet\" href=\"/static/qianduan/assets/css/slick.css\"> " +
        "<link rel=\"stylesheet\" href=\"/static/qianduan/assets/css/slick-theme.css\"> " +
        "<link rel=\"stylesheet\" href=\"/static/qianduan/assets/css/default.css\"> " +
        "<link rel=\"stylesheet\" href=\"/static/qianduan/style.css\"> " +
        "<link rel=\"stylesheet\" href=\"/static/qianduan/assets/css/responsive.css\"> "
      ;

      $("#cssdiv").html(cssstr);
      $("#jsdiv").html("");

      var jsstr = "<script src=\"/static/qianduan/assets/js/vendor/modernizr-3.5.0.min.js\"><\/script> " +
        "<script src=\"/static/qianduan/assets/js/vendor/jquery-1.12.4.min.js\"><\/script> " +
        "<script src=\"/static/qianduan/assets/js/popper.min.js\"><\/script> " +
        "<script src=\"/static/qianduan/assets/js/bootstrap.min.js\"><\/script> " +
        "<script src=\"/static/qianduan/assets/js/jquery-ui.js\"><\/script> " +
        "<script src=\"/static/qianduan/assets/js/slicknav.min.js\"><\/script> " +
        "<script src=\"/static/qianduan/assets/js/owl.carousel.min.js\"><\/script> " +
        "<script src=\"/static/qianduan/assets/js/isotope.pkgd.min.js\"><\/script> " +
        "<script src=\"/static/qianduan/assets/js/imagesloaded.pkgd.min.js\"><\/script> " +
        "<script src=\"/static/qianduan/assets/js/magnific-popup.min.js\"><\/script> " +
        "<script src=\"/static/qianduan/assets/js/linebar.js\"><\/script> " +
        "<script src=\"/static/qianduan/assets/js/waypoints.min.js\"><\/script> " +
        "<script src=\"/static/qianduan/assets/js/counterup.min.js\"><\/script> " +
        "<script src=\"/static/qianduan/assets/js/nice-select.min.js\"><\/script> " +
        "<script src=\"/static/qianduan/assets/js/scrolltop.js\"><\/script> " +
        "<script src=\"/static/qianduan/assets/js/ajax-form.js\"><\/script> " +
        "<script src=\"/static/qianduan/assets/js/wow.min.js\"><\/script> " +
        "<script src=\"/static/qianduan/assets/js/plugins.js\"><\/script> " +
        "<script src=\"/static/qianduan/assets/js/slick.min.js\"><\/script> " +
        "<script src=\"/static/qianduan/assets/js/main.js\"><\/script> ";
      setTimeout(function () {
        $("#jsdiv").html(jsstr);
      }, 100);

    },
    mounted() {
      let _this = this;


      setTimeout(function () {

        $("#caozuomoban a").addClass("btn btn-success");

        if ("") {
          alert("");
        }

      }, 20)
    }
  }
</script>

