<template>
  <div>
    <div>
      <el-button type="primary" size="mini" round @click="openInsertDiv">添加客户</el-button>
    </div>
    <el-table border="true" :data="userData" style="width: 100%" :height="tabHeight">
      <!-- <el-table-column prop="uid" label="序号" width="150"></el-table-column> -->
      <el-table-column type="index" width="50" label="序号"></el-table-column>
      <el-table-column prop="username" label="用户名" width="150"></el-table-column>
      <el-table-column prop="phone" label="手机号" width="150"></el-table-column>
      <el-table-column prop="accountmanager.accountmanagername" label="推荐人" width="150"></el-table-column>
      <el-table-column prop="grade.dengjiname" label="等级" width="150"></el-table-column>
      <el-table-column prop="address" label="地址" width="150"></el-table-column>
      <el-table-column prop="email" label="邮箱" width="150"></el-table-column>
      <el-table-column prop="yufukuan" label="预存款" width="150"></el-table-column>
      <el-table-column prop="zhangkuanzongji" label="应收账款" width="150"></el-table-column>
      <el-table-column label="操作" width="150">
        <template slot-scope="scope">
          <el-button @click="openDeleteDiv(scope.$index, userData)" type="text" size="small">删除</el-button>
          <el-button
            @click.native.prevent="updateKehuinfo(scope.$index, userData)"
            type="text"
            size="small"
          >修改</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination
      style="text-align:center"
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="currentPage4"
      :page-sizes="[10, 50, 100, 200,total]"
      :page-size="pageSize"
      layout="total, sizes, prev, pager, next, jumper"
      :total="total"
    ></el-pagination>

    <el-dialog
      :before-close="startBianliang"
      :title="dialogTitle"
      width="31%"
      :visible.sync="dialogVisible"
    >
      <el-form :model="form">
        <el-form-item class="red_label" label="用户名*" :label-width="formLabelWidth">
          <el-input v-model="form.username" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item class="red_label" label="手机号*" :label-width="formLabelWidth">
          <el-input v-model="form.phone" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="地址" :label-width="formLabelWidth">
          <el-input v-model="form.address" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="E-mail" :label-width="formLabelWidth">
          <el-input v-model="form.email" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="预存款" :label-width="formLabelWidth">
          <el-input v-model="form.yufukuan" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item class="red_label" label="等级*" :label-width="formLabelWidth">
          <el-autocomplete
            class="inline-input"
            v-model="form.dengjiname"
            :fetch-suggestions="dquerySearch"
            @select="dhandleSelect"
          >
            <template slot-scope="props">
              <div class="name">{{ props.item.dengjiname }}</div>
            </template>
          </el-autocomplete>
        </el-form-item>
        <el-form-item class="red_label" v-if="submitIndex==1" label="推荐人*" :label-width="formLabelWidth">
          <el-autocomplete
            class="inline-input"
            v-model="form.accountmanagername"
            :fetch-suggestions="querySearch"
            @select="handleSelect"
          >
            <template slot-scope="props">
              <div class="name">{{ props.item.accountmanagername }}</div>
            </template>
          </el-autocomplete>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="startBianliang()">取 消</el-button>
        <el-button v-if="submitIndex==1" type="primary" @click="onSubmit(1)">确 定</el-button>
        <el-button v-if="submitIndex==2" type="primary" @click="onSubmit(2)">确 定</el-button>
      </div>
    </el-dialog>

    <!-- <el-dialog :title="updateMokuaiTitle" width="31%" :visible.sync="updateMokuaiVisible">
      <el-form :model="updateForm">
        <el-form-item label="模块名" :label-width="formLabelWidth">
          <el-autocomplete
            class="inline-input"
            v-model="updateForm.mokuainame"
            :fetch-suggestions="querySearch"
            placeholder="请点击选择模块"
            @select="handleSelect"
          >
            <template slot-scope="props">
              <div class="name">{{ props.item.mokuainame }}</div>
            </template>
          </el-autocomplete>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="updateMokuaiVisible = false">取 消</el-button>
        <el-button type="primary" @click="onSubmit(2)">确 定</el-button>
      </div>
    </el-dialog>-->
  </div>
</template>

<script>
export default {
  data() {
    return {
      userData: [],
      accountmanagerData: [],
      dengjiData: [],
      componentsStyle: { overflow: "auto", height: "" },
      tabHeight: "",
      currentPage4: 1,
      pageSize: 10,
      total: 0,
      submitIndex: 1,
      pageNum: 1,
      form: {
        username: "",
        phone: "",
        address: "",
        email: "",
        yufukuan: "",
        dengjiname: "",
        accountmanagername: "",
        accountmanagerid: "",
        tardy: 1,
        invenaddress: "",
        dengji: "",
        accountmanager1: "",
        dengjiid: ""
      },
      updateForm: {
        mokuainame: "",
        leftnav: "",
        uid: ""
      },
      formLabelWidth: "120px",
      dialogTitle: "添加客户",
      updateUid: "",
      dialogVisible: false,
      updateMokuaiVisible: false
    };
  },
  mounted() {
    console.log(localStorage.globMainheight);
    this.componentsStyle.height = localStorage.globMainheight;
    this.tabHeight =
      document.documentElement.clientHeight -
      53 -
      10 -
      41 -
      15 -
      10 -
      36 -
      28 +
      "px";
    this.selectUser({ pageNum: 1, pageSize: 10 });
  },
  methods: {
    selectAccountmanagername(data, cb) {
      var that = this;
      data.dbid = JSON.parse(localStorage.user).dbid;
      this.axios
        .get(this.commin.comUrl.user.select_accountmanager, {
          params: data
        })
        .then(function(response) {
          console.log(response.data.data);
          that.accountmanagerData = response.data.data;
          cb(response.data.data);
        })
        .catch(function(error) {});
    },
    selectDengji(data, cb) {
      var that = this;
      data.dbid = JSON.parse(localStorage.user).dbid;
      this.axios
        .get(this.commin.comUrl.garde.select_garde, {
          params: data
        })
        .then(function(response) {
          that.dengjiData = response.data.data;
          cb(response.data.data);
        })
        .catch(function(error) {});
    },
    selectUser(data) {
      var that = this;
      data.dbid = JSON.parse(localStorage.user).dbid;
      this.axios
        .get(this.commin.comUrl.user.select_kehu, {
          params: data
        })
        .then(function(response) {
          that.userData = response.data.data[0].list;
          that.total = response.data.data[0].total;
        })
        .catch(function(error) {});
    },
    insertUser(data) {
      var that = this;
      data.dbid = JSON.parse(localStorage.user).dbid;
      if (data.username.trim() == "") {
        that.showAlert("用户名不能为空", "warning");
        return;
      }
      if (data.phone.trim() == "") {
        that.showAlert("手机号不能为空", "warning");
        return;
      }
      if (!/^1[34578]\d{9}$/.test(data.phone.trim())) {
        that.showAlert("请正确填写手机号", "warning");
        return;
      }
      if (data.email.trim() != "") {
        if (
          !/^[a-zA-Z0-9_-]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/g.test(
            data.email.trim()
          )
        ) {
          that.showAlert("请填写正确的email", "warning");
          return;
        }
      }
      if (data.dengjiname.trim() == "") {
        that.showAlert("等级不能为空", "warning");
        return;
      }
      if (data.accountmanagername.trim() == "") {
        that.showAlert("推荐人不能为空", "warning");
        return;
      }

      console.log(data);
      this.axios
        .get(this.commin.comUrl.user.insert_kehu, {
          params: data
        })
        .then(function(response) {
          var data = {};
          data.pageNum = 1;
          data.pageSize = that.pageSize;
          that.selectUser(data);
          that.startBianliang();

          that.showAlert(response.data.data[0], "success");
        })
        .catch(function(error) {});
    },
    deleteUser(index, rows) {
      var that = this;
      console.log(index);
      console.log(rows);
      var data = {};
      data.dbid = JSON.parse(localStorage.user).dbid;
      data.uid = rows[index].uid;
      // data.status = 2;
      console.log(data);
      this.axios
        .get(this.commin.comUrl.user.delete_kehu, {
          params: data
        })
        .then(function(response) {
          var data = {};
          data.pageNum = 1;
          data.pageSize = that.pageSize;
          that.selectUser(data);
        })
        .catch(function(error) {});
    },
    updateUser(data) {
      var that = this;
      if (data.phone != "") {
        if (!/^1[34578]\d{9}$/.test(data.phone.trim())) {
          that.showAlert("请正确填写手机号", "warning");
          return;
        }
      }
      if (data.email != "") {
        if (
          !/^[a-zA-Z0-9_-]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/g.test(
            data.email.trim()
          )
        ) {
          that.showAlert("请填写正确的email", "warning");
          return;
        }
      }
      data.dbid = JSON.parse(localStorage.user).dbid;
      data.uid = that.updateUid;
      console.log(data);
      this.axios
        .get(this.commin.comUrl.user.update_kehu, {
          params: data
        })
        .then(function(response) {
          console.log(response);
          if (response.data.status == "0") {
            var data = {};
            data.pageNum = that.pageNum;
            data.pageSize = that.pageSize;
            that.selectUser(data);
            that.showAlert("更改成功", "success");
            that.startBianliang();
          } else if (response.data.status == "1") {
            that.showAlert(response.data.msg, "warning");
            that.startBianliang();
          }
        })
        .catch(function(error) {});
    },
    openInsertDiv() {
      var that = this;
      that.dialogVisible = !that.dialogVisible;
      that.submitIndex = 1;
    },
    querySearch(queryString, cb) {
      // var accountmanagerData = this.accountmanagerData;
      // var results = queryString
      //   ? accountmanagerData.filter(this.createFilter(queryString))
      //   : accountmanagerData;
      // // 调用 callback 返回建议列表的数据
      // cb(results);
      var data = {};
      data.accountmanagername = queryString;
      data.pageSize = 10;
      data.pageNum = 1;
      this.selectAccountmanagername(data, cb);
    },
    createFilter(queryString) {
      console.log("jinli");
      return restaurant => {
        console.log(restaurant);
        return restaurant.accountmanagername.indexOf(queryString) === 0;
      };
    },

    dquerySearch(queryString, cb) {
      // var dengjiData = this.dengjiData;
      // var results = queryString
      //   ? dengjiData.filter(this.dcreateFilter(queryString))
      //   : dengjiData;
      // // 调用 callback 返回建议列表的数据
      // cb(results);
      var data = {};
      data.dengjiname = queryString;
      data.pageNum = 1;
      data.pageSize = 10;
      this.selectDengji(data, cb);
    },
    dcreateFilter(queryString) {
      console.log("jinli");
      return restaurant => {
        console.log(restaurant);
        return restaurant.dengjiname.indexOf(queryString) === 0;
      };
    },
    onSubmit(type) {
      if (type == 1) {
        this.insertUser(this.form);
      } else if (type == 2) {
        this.updateUser(this.form);
      }
    },
    handleSelect(item) {
      this.form.accountmanagername = item.accountmanagername;
      this.form.accountmanagerid = item.accountmanagerid;
      this.form.accountmanager1 = item.accountmanagername;
    },
    dhandleSelect(item) {
      this.form.dengjiname = item.dengjiname;
      this.form.dengji = item.dengjiid;
      this.form.dengjiid = item.dengjiid;
    },
    openDeleteDiv(index, rows) {
      var that = this;
      if (rows[index].leftnav == 1) {
        that.showAlert("老板不可删除", "warning");
        return;
      }
      this.$confirm("此操作将删除" + rows[index].username + ", 是否继续?", "", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          that.deleteUser(index, rows);
        })
        .catch(() => {});
    },
    updateKehuinfo(index, rows) {
      console.log(rows[index]);
      this.dialogTitle = "修改信息：" + rows[index].username;
      this.dialogVisible = true;
      this.submitIndex = 2;
      this.updateUid = rows[index].uid;
      this.form.username = rows[index].username;
      this.form.phone = rows[index].phone;
      // this.form.accountmanagername=rows[index].accountmanager.accountmanagername
      this.form.dengjiname = rows[index].grade.dengjiname;
      this.form.dengji = rows[index].grade.dengjiid;
      this.form.dengjiid = rows[index].grade.dengjiid;
      this.form.address = rows[index].address;
      this.form.yufukuan = rows[index].yufukuan;
      this.form.email = rows[index].email;
    },
    startBianliang() {
      this.dialogVisible = false;
      this.updateMokuaiVisible = false;
      this.updateUid = "";
      this.dialogTitle = "添加客户";
      this.submitIndex = 1;
      this.form = {
        username: "",
        phone: "",
        address: "",
        email: "",
        yufukuan: "",
        dengjiname: "",
        accountmanagername: "",
        accountmanagerid: "",
        tardy: 1,
        invenaddress: "",
        dengji: "",
        dengjiid: "",
        accountmanager1: ""
      };
      this.updateForm = {
        mokuainame: "",
        leftnav: "",
        uid: ""
      };
    },
    handleSizeChange(val) {
      this.pageSize = val;
      var data = {};
      data.pageSize = val;
      data.pageNum = 1;
      this.pageNum = 1;
      this.selectUser(data);
    },
    handleCurrentChange(val) {
      this.pageNum = val;
      var data = {};
      data.pageSize = this.pageSize;
      data.pageNum = val;
      this.selectUser(data);
    },
    showAlert(msg, type) {
      this.$message({
        showClose: true,
        message: msg,
        type: type
      });
    }
  },

  watch: {
    globMainheight(val) {
      this.componentsStyle.height = val;
    }
  },
  computed: {
    globMainheight() {
      return this.$store.state.globMainheight;
    }
  }
};
</script>

<style lang="scss" scoped>
.el-form .el-input,
.el-form .el-select,
.el-form .el-autocomplete {
  width: 80%;
}
</style>

<style>
.red_label label.el-form-item__label{
  color:red
}
</style>


