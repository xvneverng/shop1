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
            <h4 qw-c="operationname">十强商品</h4>
          </div>
          <div class="row">
            <div class="col-xl-9 col-lg-9">
              <div class="card">
                <div class="card-body">
                  <div class="basic-form">

                    <div id="main" style="width: 80%;height:400px;"></div>
                    <div id="main2" style="width: 80%;height:400px;"></div>

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
    name: "AddAdmin",
    components: {Htmenu},
    data() {
      return {
        admin: {},
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
      }, addadminact: function () {
        let _this = this;
        this.$axios.post("/addadminactjson", _this.admin)
          .then(res => {
            console.log(res.data);
            var obj = res.data;
            _this.$message({
              message: '十强商品成功',
              type: 'success'
            });
            _this.$router.push('/AdminManage');
          })
          .catch(err => {
            console.log(err)
            _this.$message({
              message: '十强商品失败',
              type: 'error'
            });
          })
      },

      jsonshuju: function () {
        let _this = this;
        this.$axios.post("/shiqiangshangpin", '')
          .then(res => {
            console.log(res.data);
            var obj = res.data;

            _this.echartinit(obj,'十强商品');

          })
          .catch(err => {
            console.log(err)
            _this.$message({
              message: '十强商品失败',
              type: 'error'
            });
          })
      },

      echartinit: function (json,title) {

        var leimu1 = [];
        var shuzhi1 = [];

        var leimu2 = [];
        var shuzhi2 = [];

        for (var i = 0; i < json.length; i++) {
          var item = json[i];
          console.log(item);
          leimu1.push(item['leixing']);
          shuzhi1.push({value: item['shuliang'], name: item['leixing']});

          leimu2.push(item['leixing']);
          shuzhi2.push(item['shuliang']);

        }


        // 基于准备好的dom，初始化echarts实例
        var myChart = echarts.init(document.getElementById('main'));

        // 指定图表的配置项和数据
        var option = {
          title: {
            text: title + '饼图展示',
            subtext: '来自数据库',
            left: 'center'
          },
          tooltip: {
            trigger: 'item',
            formatter: '{a} <br/>{b} : {c} ({d}%)'
          },
          legend: {
            orient: 'vertical',
            left: 'left',
            data: leimu1
          },
          series: [
            {
              name: '访问来源',
              type: 'pie',
              radius: '55%',
              center: ['50%', '60%'],
              data: shuzhi1,
              emphasis: {
                itemStyle: {
                  shadowBlur: 10,
                  shadowOffsetX: 0,
                  shadowColor: 'rgba(0, 0, 0, 0.5)'
                }
              }
            }
          ]
        };


        // 使用刚指定的配置项和数据显示图表。
        myChart.setOption(option);


// 基于准备好的dom，初始化echarts实例
        var myChart2 = echarts.init(document.getElementById('main2'));

        // 指定图表的配置项和数据
        var option2 = {
          title: {
            text: title + '折线图展示',
            subtext: '来自数据库',
            left: 'center'
          }, tooltip: {
            trigger: 'item',
            formatter: '{c}'
          },
          xAxis: {
            type: 'category',
            data: leimu2
          },
          yAxis: {
            type: 'value'
          },
          series: [{
            data: shuzhi2,
            type: 'line'
          }]
        };


        // 使用刚指定的配置项和数据显示图表。
        myChart2.setOption(option2);
      },
      getEchartJson:function () {

        let _this = this;

        this.$axios.post("/leibietongji.action", '')
          .then(res => {
            console.log(res.data);
            var json = res.data;

            _this.echartinit(json);

          })
          .catch(err => {
            console.log(err)
            _this.$message({
              message: '获取json文件失败',
              type: 'error'
            });
          })


      },

    },
    created() {
      let _this = this;
      _this.identity = sessionStorage.getItem("identity");
      _this.userinfo = JSON.parse(sessionStorage.getItem("userinfo"));

      _this.jsonshuju();

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

