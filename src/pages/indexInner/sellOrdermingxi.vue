<template>
  <div>
    <div>
      <!--                         -->
      <!-- <el-button type="primary" size="mini" round @click="openInsertDiv">添加员工</el-button> -->
    </div>
    <el-table border="true" :data="dingdanmingxiData" style="width: 100%" :height="tabHeight">
      <el-table-column type="index" label="序号" width="50"></el-table-column>
      <el-table-column prop="jiedantime" label="订单提交时间" width="160"></el-table-column>
      <el-table-column prop="username" label="用户名" width="150"></el-table-column>
      <el-table-column prop="productnum" label="型号" width="150"></el-table-column>
      <el-table-column prop="pici" label="产品批次" width="150"></el-table-column>
      <el-table-column prop="realsportsquare" label="发货平米" width="150"></el-table-column>
      <el-table-column prop="sportsquarenumstring" label="明细" width="150"></el-table-column>
      <el-table-column prop="realsportsquare" label="数量" width="150"></el-table-column>
      <el-table-column prop="orderbeizhu" label="订单备注" width="150"></el-table-column>
      <el-table-column prop="alljiage" label="单价详情" width="150"></el-table-column>
      <el-table-column prop="allprice" label="总价" width="150"></el-table-column>
      <el-table-column prop="accountmanagername" label="负责人" width="150"></el-table-column>
      <el-table-column prop="liuyan" label="订单留言" width="150"></el-table-column>
      <el-table-column prop="madandayintime" label="码单打印时间" width="150"></el-table-column>
      <el-table-column prop="shouhuoren" label="收货人" width="150"></el-table-column>
      <el-table-column prop="address" label="地址运费" width="150"></el-table-column>
      <el-table-column prop="realallprice" label="实收金额" width="150"></el-table-column>
      <el-table-column prop="getmoneystary" label="收款方式" width="150"></el-table-column>
      <el-table-column prop="jiekuantime" label="收款时间" width="150"></el-table-column>
      <el-table-column prop="realallprice" label="收款金额" width="150"></el-table-column>
      <el-table-column prop="qianguazhang" label="欠账金额" width="150"></el-table-column>
      <el-table-column prop="chengbenjia" label="成本价" width="150"></el-table-column>
      <el-table-column prop="chengbenjine" label="成本金额" width="150"></el-table-column>
      <el-table-column prop="lirui" label="利润" width="150"></el-table-column>
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
      dingdanmingxiData: [],
      componentsStyle: { overflow: "hidden", height: "" },
      tabHeight: "",
      currentPage4: 1,
      pageSize: 10,
      total: 0,
      pageNum: 1,
      form: {
        status: 1
      }
    };
  },
  mounted() {
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
    this.selectdingdanmingxi({ pageNum: 1, pageSize: 10 });
  },
  methods: {
    selectdingdanmingxi(data) {
      var that = this;
      data.dbid = JSON.parse(localStorage.user).dbid;
      data.status = this.form.status;
      this.axios
        .get(this.commin.comUrl.newShop.dingdanmingxi, {
          params: data
        })
        .then(function(response) {
          console.log(response);
          that.dingdanmingxiData = response.data.data[0].list;
          that.total = response.data.data[0].total;
        })
        .catch(function(error) {});
    },

    startBianliang() {},
    handleSizeChange(val) {
      this.pageSize = val;
      var data = {};
      data.pageSize = val;
      data.pageNum = 1;
      this.pageNum = 1;
      this.selectdingdanmingxi(data);
    },
    handleCurrentChange(val) {
      this.pageNum = val;
      var data = {};
      data.pageSize = this.pageSize;
      data.pageNum = val;
      this.selectdingdanmingxi(data);
    },
    showAlert(msg, type) {
      this.$message({
        showClose: true,
        message: msg,
        type: type
      });
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

