<template>
  <div>
    <div style="display:flex;flex-wrap:nowrap;justify-content: space-between;padding-left:10px">
      <div>
        <span style="margin-right:80px;font-size:12px;color:#999">单据编号：{{form.danjubianhao}}</span>
        <span style="margin-right:80px;font-size:12px;color:#999">单据日期：{{form.danjutime}}</span>
        <span style="margin-right:80px;font-size:12px;color:#999">打印时间：{{form.dayintime}}</span>
      </div>
      <div></div>
    </div>

    <el-form
      class="sellOrder"
      ref="form"
      :model="form"
      style="padding-bottom:12px;border-bottom:1px solid #ccc;padding-top:12px;padding-left:10px"
    >
      <div>
        <span style="margin-right:80px;font-size:18px;color:#999">客户：{{form.kehuname}}</span>
        <span style="margin-right:80px;font-size:18px;color:#999">销售人员：{{form.accountmanagername}}</span>
        <br>
        <span style="margin-right:80px;font-size:18px;color:#999">收货人：{{form.shouhuoren}}</span>
        <span style="margin-right:80px;font-size:18px;color:#999">发货人：{{form.fahuoren}}</span>
        <br>
        <span style="margin-right:80px;font-size:18px;color:#999">地址：{{form.address}}</span>
      </div>
    </el-form>
    <el-table
      :border="checkmingxifull"
      :show-summary="showSummary"
      :summary-method="getSummaries"
      :data="form.Data"
      fit="false"
    >
      <el-table-column type="index" label="序号"></el-table-column>
      <el-table-column prop="productnum" label="型号"></el-table-column>
      <el-table-column prop="pici" label="批次"></el-table-column>
      <el-table-column prop="seriesnum" label="系列"></el-table-column>
      <el-table-column prop="guige" label="规格"></el-table-column>
      <el-table-column prop="productname" label="产品名称"></el-table-column>
      <el-table-column prop="productlocation" label="仓库"></el-table-column>
      <el-table-column prop="kuwei" label="库位"></el-table-column>
      <el-table-column prop="squarenumstring" label="明细">
        <template slot-scope="scope">
          <span v-for="(index , item) in scope.row.squarenumstring.split(',')" key="item">
            {{index}}
            <br v-if="item!=scope.row.squarenumstring.split(',').length-1">
          </span>
        </template>
      </el-table-column>
      <el-table-column prop="squarenum" label="数量"></el-table-column>
      <el-table-column prop="unitprice" label="单价"></el-table-column>
      <el-table-column prop="allprice" label="金额"></el-table-column>
      <el-table-column prop="beizhu" label="备注"></el-table-column>
    </el-table>
    <el-form style="padding-left:10px" ref="form" :model="form">
      <span style="margin-right:80px;font-size:18px;color:#999">摘要：{{form.zhaiyao}}</span>
    </el-form>
  </div>
</template>
<script>
export default {
  data() {
    return {
      //样式变量
      componentsStyle: { overflow: "hidden", height: "" },

      //控制视图变量
      formLabelWidth: "70px",
      checkmingxifull: true,
      showSummary: true,
      newAddVisble: false,

      checkproductnumVisble: false,
      checkinvensquarenumVisble: false,
      //数据变量
      userData: [],
      accountmanagerData: [],
      productnumIndex: 0,
      squarenumstringIndex: 0,
      form: {
        kehuname: "",
        uid: "",
        accountmanagerid: "",
        accountmanagername: "",
        shouhuoren: "",
        fahuoren: "",
        address: "",
        youhuiprice: "",
        allprice: "0",
        shoukuanprice: "",
        jiesuanzhanghu: "",
        qiankuanprice: "0",
        allqiankuanprice: "0",
        userqiankuan: "",
        xiaoshoufeiyong: "",
        zhaiyao: "",
        alljuanshu: "0",
        allmishu: "0",
        allpingmi: "0",
        danjubianhao: "",
        danjutime: "",
        dayintime: "",
        Data: [
          {
            productnum: "",
            pici: "",
            seriesnum: "",
            guige: "",
            productname: "",
            productlocation: "",
            kuwei: "",
            squarenumstring: "",
            juanshu: "",
            squarenum: "",
            unitprice: "",
            hanshuidanjia: "",
            zhekoue: "",
            allprice: "",
            shuie: "",
            alljiashui: "",
            beizhu: "",
            kcid: "",
            mingxidanwei: "",
            yuanmishu: "",
            caijianmishu: "",
            mi: "",
            pingmi: ""
          },
          {
            productnum: "",
            pici: "",
            seriesnum: "",
            guige: "",
            productname: "",
            productlocation: "",
            kuwei: "",
            squarenumstring: "",
            juanshu: "",
            squarenum: "",
            unitprice: "",
            hanshuidanjia: "",
            zhekoue: "",
            allprice: "",
            shuie: "",
            alljiashui: "",
            beizhu: "",
            kcid: "",
            mingxidanwei: "",
            yuanmishu: "",
            caijianmishu: "",
            mi: "",
            pingmi: ""
          },
          {
            productnum: "",
            pici: "",
            seriesnum: "",
            guige: "",
            productname: "",
            productlocation: "",
            kuwei: "",
            squarenumstring: "",
            juanshu: "",
            squarenum: "",
            unitprice: "",
            hanshuidanjia: "",
            zhekoue: "",
            allprice: "",
            shuie: "",
            alljiashui: "",
            beizhu: "",
            kcid: "",
            mingxidanwei: "",
            yuanmishu: "",
            caijianmishu: "",
            mi: "",
            pingmi: ""
          },
          {
            productnum: "",
            pici: "",
            seriesnum: "",
            guige: "",
            productname: "",
            productlocation: "",
            kuwei: "",
            squarenumstring: "",
            juanshu: "",
            squarenum: "",
            unitprice: "",
            hanshuidanjia: "",
            zhekoue: "",
            allprice: "",
            shuie: "",
            alljiashui: "",
            beizhu: "",
            kcid: "",
            mingxidanwei: "",
            yuanmishu: "",
            caijianmishu: "",
            mi: "",
            pingmi: ""
          },
          {
            productnum: "",
            pici: "",
            seriesnum: "",
            guige: "",
            productname: "",
            productlocation: "",
            kuwei: "",
            squarenumstring: "",
            juanshu: "",
            squarenum: "",
            unitprice: "",
            hanshuidanjia: "",
            zhekoue: "",
            allprice: "",
            shuie: "",
            alljiashui: "",
            beizhu: "",
            kcid: "",
            mingxidanwei: "",
            yuanmishu: "",
            caijianmishu: "",
            mi: "",
            pingmi: ""
          },
          {
            productnum: "",
            pici: "",
            seriesnum: "",
            guige: "",
            productname: "",
            productlocation: "",
            kuwei: "",
            squarenumstring: "",
            juanshu: "",
            squarenum: "",
            unitprice: "",
            hanshuidanjia: "",
            zhekoue: "",
            allprice: "",
            shuie: "",
            alljiashui: "",
            beizhu: "",
            kcid: "",
            mingxidanwei: "",
            yuanmishu: "",
            caijianmishu: "",
            mi: "",
            pingmi: ""
          }
        ]
      }
    };
  },
  created() {},
  mounted() {},
  methods: {
    showAlert(msg, type) {
      this.$message({
        showClose: true,
        message: msg,
        type: type
      });
    },

    showNotify(title, content, clickFun, type) {
      // const h = this.$createElement;
      this.$notify({
        title: title,
        message: content,
        dangerouslyUseHTMLString: true,
        duration: 0,
        onClick: clickFun,
        position: "top-left",
        type: type
      });
    },
    getSummaries() {
      var that = this;
      const sums = [];
      sums[0] = "合计";
      sums[1] = "总卷数:";
      sums[2] = that.form.alljuanshu;
      sums[3] = "总米数:";
      sums[4] = that.form.allmishu;
      sums[5] = "总平米数:";
      sums[6] = that.form.allpingmi;
      return sums;
    },
    startBianliang() {}
  },
  watch: {
    getSellFormData(val) {}
  },
  computed: {
    getSellFormData() {
      var form = JSON.parse(this.$store.state.sellFormData);

      this.form = form;
      return this.$store.state.sellFormData;
    }
  }
};
</script>
<style>
.edit-cell input.el-input__inner {
  padding: 0px;
  border: none;
  background-color: #fff !important;
  color: #606266 !important;
}
</style>

<style lang="scss" scoped>
.el-form .el-input,
.el-form .el-select,
.el-form .el-autocomplete,
.el-form .el-textarea,
.el-form .el-col {
  //   max-width: 150px;
  width: 157px;
}

.el-form-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-right: 30px;
  margin: 0;
  //   padding-left: 15px;
}
.el-form-item .el-form-item__label {
  line-height: 25px;
}
.el-form-item .el-form-item__content {
  margin-left: 25%;
}
</style>






