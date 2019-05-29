<template>
  <div>
    <!-- <el-table :data="invenData" style="width: 100%" :height="tabHeight">
      <el-table-column type="index" width="50" label="序号"></el-table-column>
      <el-table-column prop="shengchantime" label="生产日期" width="150"></el-table-column>
      <el-table-column prop="productlocation" label="库存地" width="150"></el-table-column>
      <el-table-column prop="seriesname" label="品牌名" width="150"></el-table-column>
      <el-table-column prop="seriesnum" label="系列名" width="150"></el-table-column>
      <el-table-column prop="kehuname" label="客户名称" width="150"></el-table-column>
      <el-table-column prop="productname" label="产品名称" width="150"></el-table-column>
      <el-table-column prop="guige" label="规格" width="150"></el-table-column>
      <el-table-column prop label="图片" width="150">
        <template slot-scope="scope">
          <img style="width:30px;height:30px" :src="scope.row.productphoto" alt>
        </template>
      </el-table-column>
      <el-table-column prop="productnum" label="型号" width="150"></el-table-column>
      <el-table-column prop="pici" label="批次" width="150"></el-table-column>
      <el-table-column prop="jiancheng" label="简称" width="150"></el-table-column>
      <el-table-column prop="kuwei" label="库位" width="150"></el-table-column>
      <el-table-column prop="newsquarenum" label="库存" width="150"></el-table-column>
      <el-table-column prop="squarenumstring" label="库存明细" width="150"></el-table-column>
      <el-table-column prop="allcatse" label="包装" width="150"></el-table-column>
      <el-table-column prop="kucunbeizhu" label="备注" width="150"></el-table-column>
      <el-table-column prop="yonghukucunbeizhu" label="库存备注" width="150"></el-table-column>
      <el-table-column fixed="right" label="操作" width="150">
        <template slot-scope="scope">
          <el-button
            v-if="caozuoIndex==2"
            style="margin-right:10px"
            @click="checkClick(scope.$index, invenData)"
            type="text"
            size="small"
          >选择</el-button>
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
    ></el-pagination> -->
    <!-- 采购订单 -->
  </div>
</template>

<script>
export default {
  data() {
    return {
      invenData: [],
      tabHeight: "",
      currentPage4: 1,
      total: 0,
      pageSize: 10,
      pageNum: 1,
      caozuoIndex: 2
    };
  },
  mounted() {
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
    this.selectInven({ pageNum: 1, pageSize: this.pageSize, count: 1 });
  },
  methods: {
    selectInven(data) {
      var that = this;
      data.dbid = JSON.parse(localStorage.user).dbid;
      this.axios
        .get(this.commin.comUrl.productInven.selectallproductinven, {
          params: data
        })
        .then(function(response) {
          console.log(response);
          that.invenData = response.data.data[0].list;
          that.total = response.data.data[0].total;
          that.treeVisible = false;
        })
        .catch(function(error) {});
    },

    handleSizeChange(val) {
      this.pageSize = val;
      var data = {};
      data.pageSize = val;
      data.pageNum = 1;
      this.pageNum = 1;
      this.selectMokuai(data);
    },
    handleCurrentChange(val) {
      this.pageNum = val;
      var data = {};
      data.pageSize = this.pageSize;
      data.pageNum = val;
      this.selectMokuai(data);
    }
  },
  watch: {},
  computed: {}
};
</script>

