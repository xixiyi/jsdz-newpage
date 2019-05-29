<template>
  <div>
    <div>
      <el-button type="primary" size="mini" round @click="openInsertDiv">添加供应商</el-button>
    </div>
    <el-table :data="firmData" style="width: 100%" :height="tabHeight">
      <el-table-column type="index" width="50" label="序号"></el-table-column>
      <el-table-column prop="firmname" label="供应商" width="150"></el-table-column>
      <el-table-column fixed="right" label="操作">
        <template slot-scope="scope">
          <el-button @click="openDeleteDiv(scope.$index, firmData)" type="text" size="small">删除</el-button>
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
  </div>
</template>

<script>
export default {
  data() {
    return {
      firmData: [],
      tabHeight: "",
      currentPage4: 1,
      total: 0,
      pageSize: 10,
      pageNum: 1
    };
  },
  mounted() {
    console.log(this.navMenu);
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
    this.selectFirm({ pageNum: 1, pageSize: this.pageSize });
  },
  methods: {
    selectFirm(data) {
      var that = this;
      data.dbid = JSON.parse(localStorage.user).dbid;
      this.axios
        .get(this.commin.comUrl.firm.select, {
          params: data
        })
        .then(function(response) {
          console.log(response);
          that.firmData = response.data.data[0].list;
          that.total = response.data.data[0].total;
        })
        .catch(function(error) {});
    },
    insertFirm(data) {
      var that = this;
      data.dbid = JSON.parse(localStorage.user).dbid;
      this.axios
        .get(this.commin.comUrl.firm.insert, {
          params: data
        })
        .then(function(response) {
          console.log(response);
          var data = {};
          data.pageNum = 1;
          data.pageSize = that.pageSize;
          that.selectFirm(data);
        })
        .catch(function(error) {});
    },
    deleteFirm(index, rows) {
      var that = this;
      var data = {};
      data.dbid = JSON.parse(localStorage.user).dbid;
      data.id = rows[index].id;
      this.axios
        .get(this.commin.comUrl.firm.delete, {
          params: data
        })
        .then(function(response) {
          console.log(response);
          var data = {};
          data.pageNum = 1;
          data.pageSize = that.pageSize;
          that.selectFirm(data);
        })
        .catch(function(error) {});
    },

    openInsertDiv() {
      var that = this;
      this.$prompt("请输入供应商名称", "", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        inputPattern: "",
        inputErrorMessage: ""
      })
        .then(({ value }) => {
          var data = {};
          data.firmname = value;
          that.insertFirm(data);
        })
        .catch(() => {});
    },
    openDeleteDiv(index, rows) {
      var that = this;
      this.$confirm(
        "此操作将永久删除" + rows[index].firmname + ", 是否继续?",
        "",
        {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning"
        }
      )
        .then(() => {
          that.deleteFirm(index, rows);
        })
        .catch(() => {});
    },
    handleSizeChange(val) {
      this.pageSize = val;
      var data = {};
      data.pageSize = val;
      data.pageNum = 1;
      this.pageNum = 1;
      this.selectFirm(data);
    },
    handleCurrentChange(val) {
      this.pageNum = val;
      var data = {};
      data.pageSize = this.pageSize;
      data.pageNum = val;
      this.selectFirm(data);
    }
  }
};
</script>

