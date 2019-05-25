<template>
  <div>
    <div>
      <el-button type="primary" size="mini" round @click="openInsertDiv">添加客户</el-button>
    </div>
    <el-table :data="userData" style="width: 100%" :height="tabHeight">
      <!-- <el-table-column prop="uid" label="序号" width="150"></el-table-column> -->
      <el-table-column type="index" width="50" label="序号"></el-table-column>
      <el-table-column prop="username" label="用户名" width="150"></el-table-column>
      <el-table-column prop="phone" label="手机号" width="150"></el-table-column>
      <el-table-column prop="accountmanager.accountmanagername" label="推荐人" width="150"></el-table-column>
      <el-table-column prop="address" label="地址" width="150"></el-table-column>
      <el-table-column prop="email" label="邮箱" width="150"></el-table-column>
      <el-table-column prop="yufukuan" label="预存款" width="150"></el-table-column>
      <el-table-column prop="zhangkuanzongji" label="应收账款" width="150"></el-table-column>
      <el-table-column fixed="right" label="操作">
        <template slot-scope="scope">
          <!-- @click.native.prevent="deleteRow(scope.$index, mokuaiData)" -->
          <el-button @click="openDeleteDiv(scope.$index, userData)" type="text" size="small">删除客户</el-button>
          <el-button
            @click.native.prevent="updateKehuinfo(scope.$index, userData)"
            type="text"
            size="small"
          >更新信息</el-button>
          <!-- <el-button v-if="scope.$index!=0" 
            @click.native.prevent="updateTreeManager(scope.$index, mokuaiData,2)"
            type="text"
            size="small"
          >分配按钮</el-button>
          <el-button v-if="scope.$index!=0" 
            @click.native.prevent="updateTreeManager(scope.$index, mokuaiData,3)"
            type="text"
            size="small"
          >显示内容</el-button>-->
        </template>
      </el-table-column>
    </el-table>
    <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="currentPage4"
      :page-sizes="[10, 50, 100, 200,total]"
      :page-size="pageSize"
      layout="total, sizes, prev, pager, next, jumper"
      :total="total"
    ></el-pagination>

    <el-dialog :title="dialogTitle" width="31%" :visible.sync="dialogVisible">
      <el-form :model="form">
        <el-form-item label="用户名" :label-width="formLabelWidth">
          <el-input v-model="form.username" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="手机号" :label-width="formLabelWidth">
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
        <el-form-item label="推荐人" :label-width="formLabelWidth">
          <el-autocomplete
            class="inline-input"
            v-model="form.accountmanagername"
            :fetch-suggestions="querySearch"
            placeholder="请点击选择推荐人"
            @select="handleSelect"
          >
            <template slot-scope="props">
              <div class="name">{{ props.item.accountmanagername }}</div>
            </template>
          </el-autocomplete>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
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
      componentsStyle: { overflow: "auto", height: "" },
      tabHeight: "",
      currentPage4: 1,
      pageSize: 10,
      total: 0,
      submitIndex: 1,
      form: {
        username: "",
        phone: "",
        address: "",
        email: "",
        yufukuan: "",
        dengjiname: "",
        accountmanagername: "",
        accountmanagerid: ""
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
    this.selectAccountmanagername({});
    this.selectUser({ pageNum: 1, pageSize: 10 });
  },
  methods: {
    selectAccountmanagername(data) {
      var that = this;
      data.dbid = JSON.parse(localStorage.user).dbid;
      this.axios
        .get(this.commin.comUrl.user.select_accountmanager, {
          params: data
        })
        .then(function(response) {
          console.log(response.data.data);
          that.accountmanagerData = response.data.data;
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
          that.userData = response.data.data.list;
          that.total = response.data.data.total;
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
      if (data.email.trim() == "") {
        that.showAlert("邮箱不能为空", "warning");
        return;
      }
      if (
        !/^[a-zA-Z0-9_-]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/g.test(
          data.email.trim()
        )
      ) {
        that.showAlert("请填写正确的email", "warning");
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

          that.showAlert("添加成功", "success");
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
      data.status = 2;
      console.log(data);
      this.axios
        .get(this.commin.comUrl.user.update_user, {
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
        .get(this.commin.comUrl.user.update_user, {
          params: data
        })
        .then(function(response) {
          console.log(response);
          if (response.data.code == "0") {
            var data = {};
            data.pageNum = that.pageNum;
            data.pageSize = that.pageSize;
            that.selectUser(data);
            that.showAlert("更改成功", "success");
            that.startBianliang();
          } else if (response.data.code == "1") {
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
      console.log(queryString);
      console.log(this.accountmanagerData);
      var accountmanagerData = this.accountmanagerData;
      var results = queryString
        ? accountmanagerData.filter(this.createFilter(queryString))
        : accountmanagerData;
      // 调用 callback 返回建议列表的数据
      cb(results);
    },
    createFilter(queryString) {
      console.log("jinli");
      return restaurant => {
        console.log(restaurant);
        return restaurant.accountmanagername.indexOf(queryString) === 0;
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
      this.dialogTitle = "更新信息：" + rows[index].username;
      this.dialogVisible = true;
      this.submitIndex = 2;
      this.updateUid = rows[index].uid;
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
        accountmanagerid: ""
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

