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
            <h4 qw-c="operationname">管理员管理</h4>
          </div>
          <div class="row">
            <div class="col-12">
              <div class="card">
                <div class="card-body">
                  <div class="table-responsive">

                    <el-form label-width="70px" id="searchform">

                      <el-row>
                        <el-col :span="4" :xs="24">
                          <el-form-item label="账号">
                            <el-input type="text" v-model="admincondition.username"></el-input>
                          </el-form-item>
                        </el-col>
                        <el-col :span="4" :xs="24">
                          <el-form-item label="密码">
                            <el-input type="text" v-model="admincondition.password"></el-input>
                          </el-form-item>
                        </el-col>
                        <el-col :span="8" :xs="24">
                          <el-form-item>
                            <el-button type="primary" icon="el-icon-search" @click="searchadmin">搜索</el-button>
                            <el-button type="danger" icon="el-icon-delete" @click="deleteadminselect">批量删除</el-button>
                          </el-form-item>
                        </el-col>
                      </el-row>

                    </el-form>
                    <el-table ref="multipleTable"
                              border
                              :data="adminall"
                              style="width: 100%"
                              class="manage-table"
                              current-row-key="id"
                              @selection-change="handleSelectionChange"
                              :row-class-name="tableRowClassName">
                      <el-table-column
                        type="selection"
                        width="55">
                      </el-table-column>
                      <el-table-column
                        sortable
                        prop="username"
                        label="账号"
                        align="center">
                      </el-table-column>
                      <el-table-column
                        sortable
                        prop="password"
                        label="密码"
                        align="center">
                      </el-table-column>
                      <el-table-column
                        width="280" fixed="right" align="center"
                        label="操作">
                        <el-row slot-scope="scope">
                          <el-button type="success" icon="el-icon-document" size="mini"
                                     @click="showAdminDetails(scope.row.id)">详情
                          </el-button>
                          <el-button type="primary" icon="el-icon-edit" size="mini"
                                     @click="toUpdateAdmin(scope.row.id)">修改
                          </el-button>
                          <el-button type="danger" icon="el-icon-delete" size="mini"
                                     @click="deleteadminjson(scope.row.id)">删除
                          </el-button>
                        </el-row>
                      </el-table-column>
                    </el-table>
                    <el-pagination style="margin: 20px 0"
                                   @size-change="handleSizeChange"
                                   @current-change="handleCurrentChange"
                                   :current-page="currentPage"
                                   :page-sizes="[10, 20, 50, 100]"
                                   :page-size="pageSize"
                                   layout="total, sizes, prev, pager, next, jumper"
                                   :total="total">
                    </el-pagination>

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
    <el-dialog title="管理员详情" :visible.sync="dialogVisible" width="40%">
      <el-form label-width="120px">
        <el-row>
          <el-col>
            <el-form-item label="账号">
              {{adminDetails.username}}
            </el-form-item>
          </el-col>
          <el-col>
            <el-form-item label="密码">
              {{adminDetails.password}}
            </el-form-item>
          </el-col>
          <el-col style="text-align: center">
            <el-button type="warning" @click="dialogVisible = false">
              关闭
            </el-button>
          </el-col>
        </el-row>
      </el-form>
    </el-dialog>
  </div>
</template>
<script>
  import Htmenu from "./Htmenu.vue";

  export default {
    name: "AdminManage",
    components: {Htmenu},
    data() {
      return {
        adminall: [],
        identity: "",
        userinfo: {},
        multipleSelection: [], adminallorg: [],
        adminDetails: {},
        pageSize: 10,
        total: 10,
        currentPage: 1,
        admincondition: {},
        dialogVisible: false,
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
      }, handleSelectionChange(val) {
        this.multipleSelection = val;
      },
      deleteadminselect() {
        let _this = this;

        this.$confirm('是否确认删除管理员?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          var ids = "";

          for (var i = 0; i < this.multipleSelection.length; i++) {
            ids += this.multipleSelection[i]['id'] + ",";
          }

          if (!ids) {
            this.$message({
              message: '请选择管理员',
              type: 'error'
            });
            return;
          }

          this.$axios.post("/deleteadminjson?ids=" + ids + "&id=-1", "")
            .then(res => {
              this.$message({
                message: '删除管理员成功',
                type: 'success'
              });
              _this.searchadmin();
            })
            .catch(err => {
              console.log(err)
              this.$message({
                message: '删除管理员失败',
                type: 'error'
              });
            })
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          });
        });


      },
      showAdminDetails(id) {
        this.adminDetails = this.adminall.filter(function (item) {
          return item.id == id;
        })[0];

        this.dialogVisible = true;

      },
      toUpdateAdmin(id) {
        this.$router.push("/UpdateAdmin?id=" + id);
      },
      goAdminPage() {

        var start = (this.currentPage - 1) * this.pageSize;
        var end = start + this.pageSize;

        this.adminall = this.adminallorg.slice(start, end);

        this.total = this.adminallorg.length;

      },
      handleSizeChange(val) {
        this.pageSize = val;
        this.goAdminPage();
        console.log(`每页 ${val} 条`);
      },
      handleCurrentChange(val) {
        this.currentPage = val;
        this.goAdminPage();
        console.log(`当前页: ${val}`);
      },
      tableRowClassName({row, rowIndex}) {
        if (rowIndex === 1) {
          return 'warning-row';
        } else if (rowIndex === 3) {
          return 'success-row';
        }
        return '';
      },
      searchadmin: function () {
        let _this = this;
        this.$axios.post("/searchadminjson", "")
          .then(res => {

            var obj = res['data'];
            _this.adminallorg = obj['adminall'];
            _this.adminallorg = _this.adminallorg.filter(function (item) {
              var flag = true;
              for (var condition in _this.admincondition) {
                if (item[condition] && item[condition].indexOf(_this.admincondition[condition]) < 0) {
                  flag = false;
                }

              }
              return flag;
            });
            _this.currentPage = 1;
            _this.goAdminPage();
          })
          .catch(err => {
            console.log(err)
          })
      },
      deleteadminjson: function (id) {
        let _this = this;
        this.$axios.post("/deleteadminjson?id=" + id, "")
          .then(res => {
            this.$message({
              message: '删除管理员信息成功',
              type: 'success'
            });
            _this.searchadmin();
          })
          .catch(err => {
            console.log(err)
          })
      },
    },
    created() {
      let _this = this;
      _this.identity = sessionStorage.getItem("identity");
      _this.searchadmin();
    },
    beforeCreate() {

      $("#cssdiv").html("");

      var cssstr = "<link rel=\"icon\" type=\"image/png\" sizes=\"16x16\" href=\"https://www.17sucai.com/2021/6/khlrr10467/images/favicon.png\"> " +
        "<link href=\"/static/houtai/css/jquery.dataTables.min.css\" rel=\"stylesheet\"> " +
        "<link href=\"/static/houtai/css/bootstrap-select.min.css\" rel=\"stylesheet\"> " +
        "<link href=\"/static/houtai/css/style.css\" rel=\"stylesheet\"> " +
        "<link href=\"/static/houtai/css/css2.css\" rel=\"stylesheet\"> "
      ;

      $("#cssdiv").html(cssstr);
      $("#jsdiv").html("");

      var jsstr = "<script src=\"/static/houtai/js/global.min.js\"><\/script> " +
        "<script src=\"/static/houtai/js/bootstrap-select.min.js\"><\/script> " +
        "<script src=\"/static/houtai/js/custom.min.js\"><\/script> " +
        "<script src=\"/static/houtai/js/deznav-init.js\"><\/script> " +
        "<script src=\"/static/houtai/js/jquery.dataTables.min.js\"><\/script> " +
        "<script src=\"/static/houtai/js/datatables.init.js\"><\/script> ";
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

