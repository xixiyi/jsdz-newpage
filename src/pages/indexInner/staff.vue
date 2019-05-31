<template>
  <div>
    <div>
      <el-button type="primary" size="mini" round @click="openInsertDiv">添加员工</el-button>
    </div>
    <el-table border="true" :data="userData" style="width: 100%" :height="tabHeight">
      <!-- <el-table-column prop="uid" label="序号" width="150"></el-table-column> -->
      <el-table-column type="index" width="50" label="序号"></el-table-column>
      <el-table-column prop="username" label="用户名" width="150"></el-table-column>
      <el-table-column prop="phone" label="手机号" width="150"></el-table-column>
      <el-table-column prop="mokuai.mokuainame" label="模块显示" width="150"></el-table-column>
      <!-- <el-table-column prop="istuijianren" label="是否推荐人" width="150"></el-table-column> -->
      <el-table-column fixed="right" label="操作">
        <template slot-scope="scope">
          <!-- @click.native.prevent="deleteRow(scope.$index, mokuaiData)" -->
          <el-button @click="openDeleteDiv(scope.$index, userData)" type="text" size="small">删除</el-button>
          <el-button
            @click.native.prevent="updateMokuai(scope.$index, userData)"
            type="text"
            size="small"
          >模块选择</el-button>
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
      style="text-align:center"
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="currentPage4"
      :page-sizes="[10, 50, 100, 200,total]"
      :page-size="pageSize"
      layout="total, sizes, prev, pager, next, jumper"
      :total="total"
    ></el-pagination>
    <el-dialog title="添加员工" width="31%" :visible.sync="insertDivVisible">
      <el-form :model="form">
        <el-form-item label="用户名" :label-width="formLabelWidth">
          <el-input v-model="form.username" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="手机号" :label-width="formLabelWidth">
          <el-input v-model="form.phone" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="密码" :label-width="formLabelWidth">
          <el-input v-model="form.password" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="模块名" :label-width="formLabelWidth">
          <!-- <el-input v-model="form.leftnav" auto-complete="off"></el-input> -->
          <el-autocomplete
            class="inline-input"
            v-model="form.mokuainame"
            :fetch-suggestions="querySearch"
            placeholder="请点击选择模块"
            @select="handleSelect"
          >
            <template slot-scope="props">
              <div class="name">{{ props.item.mokuainame }}</div>
            </template>
          </el-autocomplete>
        </el-form-item>
        <!-- <el-form-item label="是否推荐人" :label-width="formLabelWidth">
          <el-select v-model="form.istuijianren" placeholder="请选择该员工是否为推荐人">
            <el-option label="否" value="否"></el-option>
            <el-option label="是" value="是"></el-option>
          </el-select>
        </el-form-item>-->
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="insertDivVisible = false">取 消</el-button>
        <el-button type="primary" @click="onSubmit(1)">确 定</el-button>
      </div>
    </el-dialog>

    <el-dialog :title="updateMokuaiTitle" width="31%" :visible.sync="updateMokuaiVisible">
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
    </el-dialog>
  </div>
</template>

<script>
export default {
  data() {
    return {
      userData: [],
      mokuaiData: [],
      componentsStyle: { overflow: "auto", height: "" },
      tabHeight: "",
      currentPage4: 1,
      pageSize: 10,
      total: 0,
      pageNum: 1,
      form: {
        username: "",
        phone: "",
        password: "",
        leftnav: "",
        istuijianren: "否",
        mokuainame: ""
      },
      updateForm: {
        mokuainame: "",
        leftnav: "",
        uid: ""
      },
      formLabelWidth: "120px",
      insertDivVisible: false,
      updateMokuaiVisible: false,
      updateMokuaiTitle: "模块选择"
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
    this.selectMokuai({ pageNum: 1, pageSize: 10000 });
    this.selectUser({ pageNum: 1, pageSize: 10 });
  },
  methods: {
    selectMokuai(data) {
      var that = this;
      data.dbid = JSON.parse(localStorage.user).dbid;
      this.axios
        .get(this.commin.comUrl.mokuai.select, {
          params: data
        })
        .then(function(response) {
          that.mokuaiData = response.data.data[0].list;
        })
        .catch(function(error) {});
    },
    //     {
    //           headers: {
    //             'Content-Type': 'application/x-www-form-urlencoded'
    //           }
    // }
    selectUser(data) {
      var that = this;
      data.dbid = JSON.parse(localStorage.user).dbid;
      this.axios
        .get(this.commin.comUrl.user.select_user, {
          params: data
        })
        .then(function(response) {
          console.log(response);
          that.userData = response.data.data[0].list;
          that.total = response.data.data[0].total;
        })
        .catch(function(error) {});
    },
    insertUser(data) {
      var that = this;
      data.dbid = JSON.parse(localStorage.user).dbid;
      data.company = JSON.parse(localStorage.user).company;
      data.zhucetime = JSON.parse(localStorage.user).zhucetime;
      data.isfukuan = JSON.parse(localStorage.user).isfukuan;
      data.fukuantime = JSON.parse(localStorage.user).fukuantime;
      data.name = data.username;
      data.usertype = 2;
      data.password = this.md5(data.password.trim());
      console.log(data);
      this.axios
        .get(this.commin.comUrl.user.insert_user, {
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
      // data.status = 2;
      console.log(data);
      this.axios
        .get(this.commin.comUrl.user.delete_user, {
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
      data.dbid = JSON.parse(localStorage.user).dbid;
      this.axios
        .get(this.commin.comUrl.user.update_user, {
          params: data
        })
        .then(function(response) {
          var data = {};
          data.pageNum = that.pageNum;
          data.pageSize = that.pageSize;
          that.selectUser(data);
          that.showAlert("更改成功", "success");
          that.startBianliang();
        })
        .catch(function(error) {});
    },
    updateUserLeftnav(data) {
      var that = this;
      data.dbid = JSON.parse(localStorage.user).dbid;
      this.axios
        .get(this.commin.comUrl.user.update_userLeftnav, {
          params: data
        })
        .then(function(response) {
          var data = {};
          data.pageNum = that.pageNum;
          data.pageSize = that.pageSize;
          that.selectUser(data);
          that.showAlert("更改成功", "success");
          that.startBianliang();
        })
        .catch(function(error) {});
    },
    openInsertDiv() {
      var that = this;
      that.insertDivVisible = !that.insertDivVisible;
    },
    querySearch(queryString, cb) {
      var mokuaiData = this.mokuaiData;
      var results = queryString
        ? mokuaiData.filter(this.createFilter(queryString))
        : mokuaiData;
      // 调用 callback 返回建议列表的数据
      cb(results);
    },
    createFilter(queryString) {
      return restaurant => {
        return restaurant.mokuainame.indexOf(queryString) === 0;
      };
    },
    onSubmit(type) {
      if (type == 1) {
        this.insertUser(this.form);
      } else if (type == 2) {
        console.log(this.updateForm);
        this.updateUserLeftnav(this.updateForm);
      }
    },
    handleSelect(item) {
      console.log(item);
      this.form.mokuainame = item.mokuainame;
      this.form.leftnav = item.id;

      this.updateForm.mokuainame = item.mokuainame;
      this.updateForm.leftnav = item.id;
      console.log(this.form);
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
    updateMokuai(index, rows) {
      this.updateMokuaiVisible = true;
      this.updateMokuaiTitle = "模块选择：" + rows[index].username;
      this.updateForm.uid = rows[index].uid;
    },
    startBianliang() {
      this.insertDivVisible = false;
      this.updateMokuaiVisible = false;
      this.form = {
        username: "",
        phone: "",
        password: "",
        leftnav: "",
        istuijianren: "否",
        mokuainame: ""
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

