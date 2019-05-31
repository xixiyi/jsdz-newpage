<template>
  <div :style="componentsStyle">
    <el-table border="true" :data="shoporderData" style="width: 100%" :height="tabHeight">
      <el-table-column type="index" width="50" label="序号"></el-table-column>
      <el-table-column prop="danjubianhao" width="150" label="订单编号"></el-table-column>
      <el-table-column prop="shoptime" label="订单提交时间" width="250"></el-table-column>
      <el-table-column prop="kehuname" label="用户名" width="250"></el-table-column>
      <el-table-column prop="accountmanagername" label="负责人" width="150"></el-table-column>
      <el-table-column prop="productlocation" label="发货仓库" width="150"></el-table-column>
      <el-table-column prop="beizhu" label="备注" width="150"></el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button @click="deletesport(scope.$index, shoporderData)" type="text" size="small">删除</el-button>
          <el-button @click="selectsport(scope.$index, shoporderData)" type="text" size="small">查看</el-button>
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
      //样式变量
      tabHeight: "",
      componentsStyle: { overflow: "hidden", height: "" },
      //控制视图变量
      checkmingxifull: true,
      checkproductnumVisble: false,
      zhezhao: false,

      //数据变量
      shoporderData: [],
      status: 2,
      currentPage4: 1,
      total: 0,
      pageSize: 10,
      pageNum: ""
    };
  },
  components: {},
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
    this.selectzudingdan({ pageNum: 1, pageSize: 10 });
  },
  methods: {
    //组订单查询
    selectzudingdan(data) {
      var that = this;
      data.dbid = JSON.parse(localStorage.user).dbid;
      data.shopstatus = that.status;
      data.tax = 3;
      this.axios
        .get(this.commin.comUrl.newShop.selectzudingdan, {
          params: data
        })
        .then(function(response) {
          console.log(response);
          that.shoporderData = response.data.data[0].list;
          that.total = response.data.data[0].total;
        })
        .catch(function(error) {});
    },
    deletesport(index, rows) {
      var that = this;
      this.$confirm(
        "此操作将删除" + rows[index].danjubianhao + "订单, 是否继续?",
        "",
        {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning"
        }
      )
        .then(() => {
          var data = {};
          data.dbid = JSON.parse(localStorage.user).dbid;
          data.xhid = rows[index].xhid;
          that.axios
            .get(this.commin.comUrl.newShop.deletezudingdan, {
              params: data
            })
            .then(function(response) {
              console.log(response);
              that.selectzudingdan({ pageNum: 1, pageSize: 10 });
            })
            .catch(function(error) {});
        })
        .catch(() => {});
    },
    //子订单查询方法
    selectsport(index, rows) {
      console.log(rows[index]);
      var that = this;
      var data = {};
      data.dbid = JSON.parse(localStorage.user).dbid;
      data.status = rows[index].shopstatus;
      data.xhid = rows[index].xhid;
      this.axios
        .get(this.commin.comUrl.newShop.selectzidingdan, {
          params: data
        })
        .then(function(response) {
          console.log(response.data.data);
          rows[index].Data = response.data.data;
          rows[index].setcreattime = that.timeUtil.timelongstring(new Date());
          localStorage.sellFormData1 = JSON.stringify(rows[index]);
          that.$store.commit("getSellFormData1");
          // that.checkproductnumVisble = true;
          var tabObj = {};
          tabObj.title = "销售单";
          tabObj.src = "sellOrder";
          tabObj.creattime = that.timeUtil.timelongstring(new Date());
          that.$store.commit("creatIndexTabs", tabObj);

          //   console.log(rows[index]);
        })
        .catch(function(error) {});
    },

    //分页方法
    handleSizeChange(val) {
      this.pageSize = val;
      var data = {};
      data.pageSize = val;
      data.pageNum = 1;
      this.pageNum = 1;
      this.selectzudingdan(data);
    },
    handleCurrentChange(val) {
      this.pageNum = val;
      var data = {};
      data.pageSize = this.pageSize;
      data.pageNum = val;
      this.selectzudingdan(data);
    }
  },

  watch: {},
  computed: {}
};
</script>

<style lang="scss" scoped>
.el-form .el-input,
.el-form .el-select,
.el-form .el-autocomplete {
  width: 80%;
}
</style>

