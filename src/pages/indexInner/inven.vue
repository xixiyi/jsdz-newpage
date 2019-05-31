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
    <el-table :data="invenData" :border="border" style="width: 100%" :height="tabHeight">
      <el-table-column prop="shengchantime" label="生产日期" width="100"></el-table-column>
      <el-table-column prop="productlocation" label="库存地" width="65"></el-table-column>
      <el-table-column prop="seriesname" label="品牌名" width="65"></el-table-column>
      <el-table-column prop="seriesnum" label="系列名" width="65"></el-table-column>
      <el-table-column prop="kehuname" label="客户名称" width="80"></el-table-column>
      <el-table-column prop="productname" label="产品名称" width="80"></el-table-column>
      <el-table-column prop="guige" label="规格" width="80"></el-table-column>
      <el-table-column prop label="图片" width="50">
        <template slot-scope="scope">
          <img style="width:30px;height:30px" :src="scope.row.productphoto" alt>
        </template>
      </el-table-column>
      <el-table-column prop="productnum" label="型号" width="80"></el-table-column>
      <el-table-column prop="pici" label="批次" width="100"></el-table-column>
      <el-table-column prop="jiancheng" label="简称" width="50"></el-table-column>
      <el-table-column prop="kuwei" label="库位" width="50"></el-table-column>
      <el-table-column label="库存" width="130">
        <template slot-scope="scope">
          <span v-if="scope.row.pianshu!=0">{{scope.row.newsquarenum}}㎡</span>
          <span v-else>{{scope.row.newsquarenum}}</span>
        </template>
      </el-table-column>
      <el-table-column prop="squarenumstring" label="库存明细" width="150">
        <template slot-scope="scope">
          <span v-for="(index , item) in scope.row.squarenumstring.split(',')" key="item">
            {{index}}
            <span
              v-if="item!=scope.row.squarenumstring.split(',').length-1"
              style="color:red"
            >|</span>
            <br v-if="item%2!=0&&item!=scope.row.squarenumstring.split(',').length-1">
          </span>
        </template>
      </el-table-column>
      <el-table-column prop="allcatse" label="包装" width="50"></el-table-column>
      <el-table-column prop="kucunbeizhu" label="备注" width="50"></el-table-column>
      <el-table-column prop="yonghukucunbeizhu" label="库存备注" width="100"></el-table-column>
      <el-table-column v-if="flag" label="操作" width="100"></el-table-column>
      <el-table-column v-else label="操作" width="50">
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
      border: true,
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
            if (Number(value) > Number(rows[index].squarenum)) {
              that.showAlert("输入的数量大于库存的数量了", "warning");
              return;
            }
            var pianpingmi = Number(rows[index].squarenumstring.split("*")[1]);

            var zongpianshu = Math.ceil(Number(value) / pianpingmi);
            rows[index].checkmingxi = zongpianshu + "*" + pianpingmi;
            rows[index].yuanmishu = "";
            rows[index].caijianmishu = "";
            rows[index].checktime = that.timeUtil.timelongstring(new Date());
            rows[index].piancainum = value;

            rows[index].caijianbeizhu =
              Math.floor(zongpianshu / rows[index].pianshu) +
              "箱" +
              that.util.changeNum(zongpianshu % rows[index].pianshu, 0) +
              "片";
            console.log(rows[index].caijianbeizhu);
            console.log(rows[index].checkmingxi);
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
      var that = this;
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
      if (this.yuanmishu != "") {
        if (
          this.invenData[this.checkindex].squarenumstring.indexOf(
            "*" + this.yuanmishu
          ) == -1
        ) {
          this.showAlert("没有找到需要裁剪的原米数", "warning");
          return;
        }
      }

      var data = {};
      data.invensquarenumstring = this.invenData[
        this.checkindex
      ].squarenumstring;
      data.ordersquarenumstring = this.checkmingxi;
      data.yuanmishu = this.yuanmishu;
      data.caijianmishu = this.caijianmishu;
      this.axios
        .get(this.commin.comUrl.newShop.checkmingxi, {
          params: data
        })
        .then(function(response) {
          console.log(response);
          if (response.data.data[0].indexOf("没有") != -1) {
            that.showAlert(response.data.data[0], "warning");
          } else {
            that.invenData[that.checkindex].checkmingxi = that.checkmingxi;
            that.invenData[that.checkindex].caijianmishu = that.caijianmishu;
            that.invenData[that.checkindex].yuanmishu = that.yuanmishu;
            that.invenData[
              that.checkindex
            ].checktime = that.timeUtil.timelongstring(new Date());
            if (that.caijianmishu != "" && that.yuanmishu != "") {
              that.invenData[that.checkindex].caijianbeizhu =
                that.invenData[that.checkindex].yuanmishu +
                "中裁" +
                that.invenData[that.checkindex].caijianmishu;
            }
            console.log(that.invenData[that.checkindex]);
            localStorage.checkInven = JSON.stringify(
              that.invenData[that.checkindex]
            );
            that.$store.commit("checkInvenClick");
            that.inputSquarenumstringVisble = false;
            that.checkmingxi = "";
            that.yuanmishu = "";
            that.caijianmishu = "";
            that.caijianinputVisble = false;
          }
        })
        .catch(function(error) {});
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
      console.log(val);
    }
  },
  computed: {
    changecaozuoindex() {
      console.log("进来了");
      if (localStorage.flag == "true") {
        this.flag = true;
      } else if (localStorage.flag == "false") {
        this.flag = false;
      }

      // this.flag = this.$store.state.flag
      console.log(localStorage.flag);
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