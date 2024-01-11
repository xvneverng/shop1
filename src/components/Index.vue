<template>
  <div>


    <!-- header area start -->
    <div class="header-area">
      <div class="container">
        <div class="row">
          <!-- logo start -->
          <div class="col-md-3">
            <div class="header-logo">
              <a href="index"><img src="/static/qianduan/assets/img/logo.png" alt="logo" class="img-fluid"/></a>
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
            <h2>搜索商品</h2>
            <h4><a href="/#/Index">首页 </a>/ 搜索商品</h4>
          </div>
        </div>
      </div>
    </div>
    <!-- breadcroumb area end -->

    <!-- blog area start -->
    <div class="blog-area sec-p-100 gray-bg">
      <div class="container">

        <div class="row" style="margin-bottom: 140px;">
          <div class="col-md-12">
            <div class="job-search-bar">
              <div class="search-bar text-center">
                <form action="searchgoods" class="" method="post">
                  <div class="form-row">
                    <div class="col-md-9">
                      <input maxlength="-1" type="search" class="form-control" name="search" id="search"
                             placeholder="输入关键字"/>
                    </div>
                    <div class="col-md-3">
                      <button type="button" @click="searchgoods()" class="btn btn-primary">搜索</button>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
        <div class="clearfix"></div>

        <div class="row" id="allitems">


          <!---v-for="item in goodsall" :key="item.id"--->

          <div class="col-md-4 oneitem" style="margin-bottom: 25px;" v-for="item in goodsall" :key="item.id">
            <div class="single-blog">
              <div class="blog-img-ctg">
                <img :src="'http://localhost:5000/static/upload/' + item.pic"
                     style="width: 350px;height: 191px;" alt="blog" class="img-fluid">
              </div>
              <div class="single-blog-content">
                <h3><a :href="'/#/GoodsDetails?id=' + item.id">{{item.name}}</a></h3>
                <a :href="'/#/GoodsDetails?id=' + item.id" class="btn">详情 <i class="fa fa-angle-right"></i></a>
              </div>
            </div>
          </div>


        </div>


        <div style="text-align: center; margin-bottom: 180px; color: black;" id="barcon"></div>
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
    name: "SearchGoods",
    components: {Qtmenu},
    data() {
      return {
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
      }, searchgoods: function () {
        let _this = this;
        this.$axios.post("/searchgoodsjson", "")
          .then(res => {
            var obj = res['data'];
            console.log(obj);
            _this.goodsall = obj['goodsall'];
            var search = $("#search").val();
            if (search) {
              _this.goodsall = _this.goodsall.filter(function (item) {
                return item.name.indexOf(search) >= 0;
              });
            }

            setTimeout(function () {
              goPage(1, 9);
            },100)

          })
          .catch(err => {
            console.log(err)
          })
      },
    },
    created() {
      let _this = this;
      _this.identity = sessionStorage.getItem("identity");
      _this.userinfo = JSON.parse(sessionStorage.getItem("userinfo"));
      _this.searchgoods();
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

        goPage(1, 9);


        if ("") {
          alert("");
        }

      }, 20)
    }
  }
</script>

<style>
  .btn{
    color: white!important;
  }
</style>

