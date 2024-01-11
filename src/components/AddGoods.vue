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
            <h4 qw-c="operationname">添加商品</h4>
          </div>
          <div class="row">
            <div class="col-xl-9 col-lg-9">
              <div class="card">
                <div class="card-body">
                  <div class="basic-form">

                    <el-form label-width="120px">

                      <el-row>
                        <el-col :span="24">
                          <el-form-item style="display:none;" label="商品id">
                            <el-input v-model="goods.id" name="id" id="id" type="text"></el-input>
                          </el-form-item>
                        </el-col>
                        <el-col :span="24">
                          <el-form-item label="名称">
                            <el-input v-model="goods.name" name="name" id="name" type="text"></el-input>
                          </el-form-item>
                        </el-col>
                        <el-col :span="24">
                          <el-form-item label="照片">
                            <el-upload
                              action="http://localhost:5000/addfilejson"
                              list-type="picture-card"
                              :file-list="picList"
                              :on-success="attachPicSuccess"
                              :on-error="attachPicError"
                              :on-change="handlePicChange">
                              <i slot="default" class="el-icon-plus"></i>
                              <div slot="file" slot-scope="{file}">
                                <img class="el-upload-list__item-thumbnail"
                                     :src="file.url" alt="">
                                <span class="el-upload-list__item-actions">
                                                    <span class="el-upload-list__item-preview"
                                                          @click="handlePicPreview(file)">
                                                      <i class="el-icon-zoom-in"></i>
                                                    </span>
                                                    <span v-if="!disabledPic"
                                                          class="el-upload-list__item-delete"
                                                          @click="handlePicDownload(file)">
                                                      <i class="el-icon-download"></i>
                                                    </span>
                                                    <span v-if="!disabledPic"
                                                          class="el-upload-list__item-delete"
                                                          @click="handlePicRemove(file)">
                                                      <i class="el-icon-delete"></i>
                                                    </span>
                                                  </span>
                              </div>
                            </el-upload>
                            <el-dialog :visible.sync="dialogPicVisible">
                              <img width="100%" :src="dialogPicUrl" alt="">
                            </el-dialog>
                          </el-form-item>
                        </el-col>
                        <el-col :span="24">
                          <el-form-item label="价格">
                            <el-input-number v-model="goods.price" name="price" id="price" label="价格"></el-input-number>
                          </el-form-item>
                        </el-col>
                        <el-col :span="24">
                          <el-form-item>
                            <el-button type="primary" @click="addgoodsact">添加</el-button>
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
    name: "AddGoods",
    components: {Htmenu},
    data() {
      return {
        goods: {'pic': '',},
        identity: '',
        dialogPicUrl: '',
        dialogPicVisible: false,
        disabledPic: false,
        picList: [],
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
      }, handlePicRemove(file) {
        console.log(file)
        console.log(this.goods.pic)
        let removeId = file.id
        this.picList.forEach((item, index) => {
          if (item.id == removeId) {
            this.picList.splice(index, 1)
            this.$message({
              message: '移除照片成功',
              type: 'success'
            });
          }
        })
      },
      handlePicPreview(file) {
        this.dialogPicUrl = file.url;
        this.dialogPicVisible = true;
      },
      handlePicDownload(file) {
        console.log(file);
        let a = document.createElement('a')
        a.href = file.url
        a.download = file.name
        a.click()
      },
      attachPicSuccess(response, file, fileList) {
        var id = Date.parse(new Date());

        console.log(response);

        this.picList.push({
          id: id,
          name: response,
          url: 'http://localhost:5000/static/upload/' + response,
        })
        this.$message({
          message: '上传照片成功',
          type: 'success'
        });
      },
      handlePicChange(file, fileList) {
        this.picList = fileList.slice(-1);
      }, attachPicError(err, file, fileList) {
        this.$message({
          message: '上传照片失败',
          type: 'error'
        });
      },
      addgoodsact: function () {
        let _this = this;
        var picstr = "";
        for (var i = 0; i < _this.picList.length; i++) {

          if (i == 0) {
            picstr += _this.picList[i]['response'];
          } else {
            picstr += "," + _this.picList[i]['response'];
          }

        }
        _this.goods.pic = picstr;
        this.$axios.post("/addgoodsactjson", _this.goods)
          .then(res => {
            console.log(res.data);
            var obj = res.data;
            _this.$message({
              message: '添加商品成功',
              type: 'success'
            });
            _this.$router.push('/GoodsManage');
          })
          .catch(err => {
            console.log(err)
            _this.$message({
              message: '添加商品失败',
              type: 'error'
            });
          })
      },
    },
    created() {
      let _this = this;
      _this.identity = sessionStorage.getItem("identity");
      _this.userinfo = JSON.parse(sessionStorage.getItem("userinfo"));
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

