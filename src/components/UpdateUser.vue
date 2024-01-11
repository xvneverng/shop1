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
            <h4 qw-c="operationname">修改用户</h4>
          </div>
          <div class="row">
            <div class="col-xl-9 col-lg-9">
              <div class="card">
                <div class="card-body">
                  <div class="basic-form">

                    <el-form label-width="120px">

                      <el-row>
                        <el-col style="display:none;" :span="24">
                          <el-form-item label="用户id">
                            <el-input v-model="user.id" name="id" id="id" type="text"></el-input>
                          </el-form-item>
                        </el-col>
                        <el-col :span="24">
                          <el-form-item label="名字">
                            <el-input v-model="user.name" name="name" id="name" type="text"></el-input>
                          </el-form-item>
                        </el-col>
                        <el-col :span="24">
                          <el-form-item label="账号">
                            <el-input v-model="user.username" readonly name="username" id="username"
                                      type="text"></el-input>
                          </el-form-item>
                        </el-col>
                        <el-col :span="24">
                          <el-form-item label="密码">
                            <el-input v-model="user.password" name="password" id="password" type="password"></el-input>
                          </el-form-item>
                        </el-col>
                        <el-col :span="24">
                          <el-form-item label="性别">
                            <input maxlength="-1" type="hidden" name="sex" id="sex" v-model="user.sex">
                            <el-select name="sex" id="sex" v-model="user.sex" placeholder="请选择">
                              <el-option key="男" label="男" value="男"></el-option>
                              <el-option key="女" label="女" value="女"></el-option>
                            </el-select>
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
                          <el-form-item label="地址">
                            <el-input v-model="user.address" name="address" id="address" type="text"></el-input>
                          </el-form-item>
                        </el-col>
                        <el-col :span="24">
                          <el-form-item>
                            <el-button type="primary" @click="updateuseract">修改</el-button>
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
    name: "UpdateUser",
    components: {Htmenu},
    data() {
      return {
        user: {'pic': '',},
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
        console.log(this.user.pic)
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
      userdetailsjson: function (id) {
        let _this = this;
        this.$axios.post("/userdetailsjson?id=" + id, "")
          .then(res => {
            var obj = res['data'];
            console.log(obj)
            _this.user = obj['user'];
            var picarr = _this.user.pic.split(",");

            for (var i = 0; i < picarr.length; i++) {
              var id = Date.parse(new Date()) + "" + i;
              var picitem = picarr[i];
              _this.picList.push({
                id: id,
                name: picitem,
                response: picitem,
                url: 'http://localhost:5000/static/upload/' + picitem,
              })
            }
          })
          .catch(err => {
            console.log(err)
          })
      },
      updateuseract: function () {
        let _this = this;
        var picstr = "";
        for (var i = 0; i < _this.picList.length; i++) {

          if (i == 0) {
            picstr += _this.picList[i]['response'];
          } else {
            picstr += "," + _this.picList[i]['response'];
          }

        }
        _this.user.pic = picstr;
        this.$axios.post("/updateuseractjson", _this.user)
          .then(res => {
            console.log(res.data);
            var obj = res.data;
            _this.$message({
              message: '修改用户成功',
              type: 'success'
            });
            _this.$router.push('/UserManage');
          })
          .catch(err => {
            console.log(err)
            _this.$message({
              message: '修改用户失败',
              type: 'error'
            });
          })
      },
    },
    created() {
      let _this = this;
      _this.identity = sessionStorage.getItem("identity");
      _this.userinfo = JSON.parse(sessionStorage.getItem("userinfo"));
      var id = _this.$route.query.id
      _this.userdetailsjson(id);
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

