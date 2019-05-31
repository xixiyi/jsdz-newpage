<template>
  <div>
    <div>
      <!-- 仓库	规格	产品名称	系列名	型号	批次	支数	数量	明细	单价	总价 -->
    </div>
    <el-table border="true" :data="dingdanmingxiData" style="width: 100%" :height="tabHeight">
      <el-table-column type="index" label="序号" width="50"></el-table-column>
      <el-table-column prop="productlocation" label="仓库" width="160"></el-table-column>
      <el-table-column prop="guige" label="规格" width="150"></el-table-column>
      <el-table-column prop="productname" label="产品名称" width="150"></el-table-column>
      <el-table-column prop="seriesnum" label="系列名" width="150"></el-table-column>
      <el-table-column prop="productnum" label="型号" width="150"></el-table-column>
      <el-table-column prop="pici" label="批次" width="150"></el-table-column>
      <el-table-column prop="sonnum" label="数量" width="150"></el-table-column>
      <el-table-column prop="squarestring" label="明细" width="150"></el-table-column>
      <el-table-column prop="purchaseprice" label="单价" width="150"></el-table-column>
      <el-table-column prop="sonprice" label="总价" width="150"></el-table-column>
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
      pageNum: 1
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
    this.selectpurchasemingxi({ pageNum: 1, pageSize: 10 });
  },
  methods: {
    selectpurchasemingxi(data) {
      var that = this;
      data.dbid = JSON.parse(localStorage.user).dbid;
      this.axios
        .get(this.commin.comUrl.purchase.select_son_purchase, {
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
      this.selectpurchasemingxi(data);
    },
    handleCurrentChange(val) {
      this.pageNum = val;
      var data = {};
      data.pageSize = this.pageSize;
      data.pageNum = val;
      this.selectpurchasemingxi(data);
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

