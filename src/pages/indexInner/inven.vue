<template>
  <div>
    <el-form ref="form" :model="whereObj">
      <div style="display:flex;flex-wrap:nowrap;justify-content: center;">
        <!-- <el-form-item label="型号"> -->
        <el-input @input="inputBlur" placeholder="请输入型号" v-model="whereObj.productnum"></el-input>
        <!-- </el-form-item> -->
        <!-- <el-form-item label="批次"> -->
        <el-input @input="inputBlur" placeholder="请输入批次" v-model="whereObj.pici"></el-input>
        <!-- </el-form-item> -->
      </div>
    </el-form>
    <el-table :data="invenData" style="width: 100%" :height="tabHeight">
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
      <el-table-column v-if="flag" label="操作" width="150"></el-table-column>
      <el-table-column v-if="!flag" fixed="right" label="操作" width="50">
        <template slot-scope="scope">
          <el-button
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
      style="text-align:center"
    ></el-pagination>

    <el-dialog
      title="请输入选择的明细"
      :modal="zhezhao"
      width="30%"
      :visible.sync="inputSquarenumstringVisble"
    >
      {{xianyoumingxi}}
      <br>
      <el-input style="margin-bottom:15px" v-model="checkmingxi" placeholder="请输入选择的明细"></el-input>
      <el-input
        v-show="caijianinputVisble"
        style="margin-bottom:15px"
        v-model="yuanmishu"
        placeholder="请输入原数量"
      ></el-input>
      <el-input v-show="caijianinputVisble" v-model="caijianmishu" placeholder="请输入裁剪数量"></el-input>

      <div slot="footer" class="dialog-footer">
        <el-button @click="caijianinputVisble = true">裁 剪</el-button>
        <el-button @click="inputSquarenumstringVisble = false">取 消</el-button>
        <el-button type="primary" @click="onSubmit">提 交</el-button>
      </div>
    </el-dialog>
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
      flag: true,
      inputSquarenumstringVisble: false,
      caijianinputVisble: false,
      zhezhao: false,
      xianyoumingxi: "",
      checkindex: 0,
      checkmingxi: "",
      yuanmishu: "",
      caijianmishu: "",
      whereObj: {
        productlocation: "",
        productnum: "",
        seriesnum: "",
        guige: "",
        count: 1,
        pici: "",
        kuwei: "",
        productname: "",
        seriesname: "",
        begin: "",
        end: "",
        kehuname: "",
        jiancheng: ""
      }
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
      15 -
      28 +
      "px";
    this.selectInven({ pageNum: 1, pageSize: this.pageSize });
  },
  methods: {
    inputBlur() {
      this.selectInven({ pageNum: 1, pageSize: this.pageSize });
    },
    selectInven(data) {
      var that = this;
      data.dbid = JSON.parse(localStorage.user).dbid;

      // data.count = 1;
      Object.assign(data, this.whereObj);
      console.log(data);
      console.log(this.whereObj);
      this.axios
        .get(this.commin.comUrl.productInven.selectallproductinven, {
          params: data
        })
        .then(function(response) {
          console.log(response);
          that.invenData = response.data.data[0].list;
          that.total = response.data.data[0].total;
        })
        .catch(function(error) {});
    },

    handleSizeChange(val) {
      this.pageSize = val;
      var data = {};
      data.pageSize = val;
      data.pageNum = 1;
      this.pageNum = 1;
      this.selectInven(data);
    },
    handleCurrentChange(val) {
      this.pageNum = val;
      var data = {};
      data.pageSize = this.pageSize;
      data.pageNum = val;
      this.selectInven(data);
    },

    //向外部文件暴露的方法
    checkClick(index, rows) {
      var that = this;
      this.checkindex = index;
      if (rows[index].pianshu != 0) {
        this.$prompt("请输入数量，现有的数量：" + rows[index].squarenum, "", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          inputPattern: "",
          inputErrorMessage: ""
        })
          .then(({ value }) => {
            console.log(value);
            var pianpingmi = Number(rows[index].squarenumstring.split("*")[1]);

            rows[index].checkmingxi =
              that.util.changeNum(Number(value) / pianpingmi, 0) +
              "*" +
              pianpingmi;
            rows[index].yuanmishu = "";
            rows[index].caijianmishu = "";
            rows[index].checktime = that.timeUtil.timelongstring(new Date());
            rows[index].piancainum = value;
            localStorage.checkInven = JSON.stringify(rows[index]);
            this.$store.commit("checkInvenClick");
          })
          .catch(() => {});
      } else {
        this.inputSquarenumstringVisble = true;
        this.xianyoumingxi = "现有明细：" + rows[index].squarenumstring;
      }
    },
    showAlert(msg, type) {
      this.$message({
        showClose: true,
        message: msg,
        type: type
      });
    },
    onSubmit() {
      if (this.checkmingxi == "") {
        this.showAlert("请填写选择的明细", "warning");
        return;
      }
      if (this.caijianmishu == "" && this.yuanmishu != "") {
        this.showAlert("请填写裁剪米数", "warning");
        return;
      }
      if (this.caijianmishu != "" && this.yuanmishu == "") {
        this.showAlert("请填写原米数", "warning");
        return;
      }
      if (Number(this.caijianmishu) >= Number(this.yuanmishu)) {
        if (this.caijianmishu != "" && this.yuanmishu != "") {
          this.showAlert("裁剪米数不能大于或等于原米数", "warning");
          return;
        }
      }
      this.invenData[this.checkindex].checkmingxi = this.checkmingxi;
      this.invenData[this.checkindex].caijianmishu = this.caijianmishu;
      this.invenData[this.checkindex].yuanmishu = this.yuanmishu;
      this.invenData[this.checkindex].checktime = this.timeUtil.timelongstring(
        new Date()
      );
      if (this.caijianmishu != "" && this.yuanmishu != "") {
        this.invenData[this.checkindex].caijianbeizhu =
          this.invenData[this.checkindex].yuanmishu +
          "中裁" +
          this.invenData[this.checkindex].caijianmishu;
      }

      console.log(this.invenData[this.checkindex]);

      localStorage.checkInven = JSON.stringify(this.invenData[this.checkindex]);
      this.$store.commit("checkInvenClick");
      this.inputSquarenumstringVisble = false;
      this.checkmingxi = "";
      this.yuanmishu = "";
      this.caijianmishu = "";
      this.caijianinputVisble = false;

      // localStorage.checkInven = "";
      // this.$store.commit("checkInvenClick");
    },
    showNotify(title, content, clickFun, type) {
      // const h = this.$createElement;
      console.log(123);
      this.$notify({
        title: title,
        message: content,
        dangerouslyUseHTMLString: true,
        duration: 0,
        onClick: clickFun,
        type: type,
        position: "top-left"
      });
    }
  },
  watch: {
    changecaozuoindex(val) {
      if (val == "true") {
        this.flag = true;
      } else {
        this.flag = false;
      }
    }
  },
  computed: {
    changecaozuoindex() {
      if (this.$store.state.flag == "true") {
        this.flag = true;
      } else {
        this.flag = false;
      }
      return this.$store.state.flag;
    }
  }
};
</script>

<style lang="scss" scoped>
.el-form .el-input,
.el-form .el-select,
.el-form .el-autocomplete,
.el-form .el-textarea,
.el-form .el-col {
  //   max-width: 150px;
  width: 130px;
  margin-right: 20px;
}

.el-form-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-right: 30px;
  //   padding-left: 15px;
}
.el-form-item .el-form-item__content {
  margin-left: 25%;
}
</style>