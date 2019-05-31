<template>
  <div :style="componentsStyle">
    <div style="display:flex;flex-wrap:nowrap;justify-content: space-between;">
      <div>
        <span style="margin-right:80px;font-size:12px;color:#999">单据编号：{{form.danjubianhao}}</span>
        <span style="margin-right:80px;font-size:12px;color:#999">单据日期：{{form.danjutime}}</span>
        <span style="margin-right:80px;font-size:12px;color:#999">打印时间：{{form.dayintime}}</span>
      </div>
      <div>
        <el-button v-show="newAddVisble" size="mini" round type="primary" @click="startBianliang">新增</el-button>
        <el-button
          v-show="fanshenhe"
          size="mini"
          round
          type="primary"
          @click="fanshenhe = false"
        >反审核</el-button>
        <el-button
          v-show="newAddVisble&&!yidayinVisble"
          size="mini"
          round
          type="primary"
          @click="onPrint(2)"
        >打印</el-button>
        <el-button
          v-show="newAddVisble&&yidayinVisble"
          size="mini"
          round
          type="primary"
          @click="onPrint(1)"
        >已打印</el-button>
        <el-button v-show="!fanshenhe" size="mini" round type="primary" @click="onSubmit(2)">保存</el-button>
        <el-button v-show="!fanshenhe" size="mini" round type="primary" @click="onSubmit(10)">审核</el-button>
      </div>
    </div>

    <el-form
      class="sellOrder"
      ref="form"
      :model="form"
      style="padding-bottom:12px;border-bottom:1px solid #ccc"
    >
      <div style="display:flex;flex-wrap:nowrap">
        <el-form-item label="客户">
          <!-- <el-input v-model="form.kehuname"></el-input> -->
          <el-autocomplete
            class="inline-input"
            v-model="form.kehuname"
            :fetch-suggestions="querySearch"
            @select="handleSelect"
          >
            <template slot-scope="props">
              <div class="name">{{ props.item.username }}</div>
            </template>
          </el-autocomplete>
        </el-form-item>
        <el-form-item label="销售人员">
          <!-- <el-input v-model="form.accountmanagername"></el-input> -->
          <el-autocomplete
            class="inline-input"
            v-model="form.accountmanagername"
            :fetch-suggestions="querySearchAccount"
            @select="handleSelectAccount"
          >
            <template slot-scope="props">
              <div class="name">{{ props.item.accountmanagername }}</div>
            </template>
          </el-autocomplete>
        </el-form-item>
        <el-form-item label="收货人">
          <el-input v-model="form.shouhuoren"></el-input>
        </el-form-item>
        <el-form-item label="发货人">
          <el-input v-model="form.fahuoren"></el-input>
        </el-form-item>
        <el-form-item label="地址">
          <el-input style="width:440px" v-model="form.address"></el-input>
        </el-form-item>
        <!-- <el-form-item label="总卷数">
          <el-input v-model="form.alljuanshu"></el-input>
        </el-form-item>
        <el-form-item label="总米数">
          <el-input v-model="form.allmishu"></el-input>
        </el-form-item>
        <el-form-item label="总平米数">
          <el-input v-model="form.allpingmi"></el-input>
        </el-form-item>-->
      </div>
    </el-form>

    <el-table
      :show-summary="showSummary"
      :summary-method="getSummaries"
      :data="form.Data"
      :border="border"
      style="width: 100%"
      :height="tabHeight"
    >
      <el-table-column width="30" label="序号">
        <template slot-scope="scope">
          <!-- <el-button style="border:none" @click="del(scope.$index, form.Data)">{{(scope.$index+1)}}</el-button> -->
          <span
            style="border:none;display:block;width:100%;height:100%"
            @click="del(scope.$index, form.Data)"
          >{{(scope.$index+1)}}</span>
        </template>
      </el-table-column>
      <el-table-column label="型号">
        <template slot-scope="scope">
          <el-input
            @focus="clickProductnum(scope.$index)"
            class="edit-cell"
            v-model="scope.row.productnum"
          ></el-input>
        </template>
      </el-table-column>
      <el-table-column label="批次">
        <template slot-scope="scope">
          <el-input disabled class="edit-cell" v-model="scope.row.pici"></el-input>
        </template>
      </el-table-column>
      <el-table-column label="系列">
        <template slot-scope="scope">
          <el-input disabled class="edit-cell" v-model="scope.row.seriesnum"></el-input>
        </template>
      </el-table-column>
      <el-table-column label="规格">
        <template slot-scope="scope">
          <el-input disabled class="edit-cell" v-model="scope.row.guige"></el-input>
        </template>
      </el-table-column>
      <el-table-column label="产品名称">
        <template slot-scope="scope">
          <el-input disabled class="edit-cell" v-model="scope.row.productname"></el-input>
        </template>
      </el-table-column>
      <el-table-column label="仓库">
        <template slot-scope="scope">
          <el-input disabled class="edit-cell" v-model="scope.row.productlocation"></el-input>
        </template>
      </el-table-column>
      <el-table-column label="库位">
        <template slot-scope="scope">
          <el-input disabled class="edit-cell" v-model="scope.row.kuwei"></el-input>
        </template>
      </el-table-column>

      <el-table-column label="明细">
        <template slot-scope="scope">
          <el-input disabled class="edit-cell" v-model="scope.row.squarenumstring"></el-input>
        </template>
      </el-table-column>

      <el-table-column label="数量">
        <template slot-scope="scope">
          <el-input disabled class="edit-cell" v-model="scope.row.squarenum"></el-input>
        </template>
      </el-table-column>
      <el-table-column label="单价">
        <template slot-scope="scope">
          <el-input
            @change="matchAllprice(scope.$index)"
            class="edit-cell"
            v-model="scope.row.unitprice"
          ></el-input>
        </template>
      </el-table-column>
      <el-table-column label="含税单价">
        <template slot-scope="scope">
          <el-input class="edit-cell" v-model="scope.row.hanshuidanjia"></el-input>
        </template>
      </el-table-column>
      <el-table-column label="折扣额">
        <template slot-scope="scope">
          <el-input class="edit-cell" v-model="scope.row.zhekoue"></el-input>
        </template>
      </el-table-column>
      <el-table-column label="金额">
        <template slot-scope="scope">
          <el-input disabled class="edit-cell" v-model="scope.row.allprice"></el-input>
        </template>
      </el-table-column>
      <el-table-column label="税额">
        <template slot-scope="scope">
          <el-input class="edit-cell" v-model="scope.row.shuie"></el-input>
        </template>
      </el-table-column>
      <el-table-column label="价税总计">
        <template slot-scope="scope">
          <el-input disabled class="edit-cell" v-model="scope.row.alljiashui"></el-input>
        </template>
      </el-table-column>
      <el-table-column label="备注">
        <template slot-scope="scope">
          <el-input class="edit-cell" v-model="scope.row.beizhu"></el-input>
        </template>
      </el-table-column>
    </el-table>
    <el-form ref="form" :model="form">
      <el-input placeholder="在这里输入摘要" style="width:100%" v-model="form.zhaiyao"></el-input>
    </el-form>
    <el-form class="sellOrder" ref="form" :model="form">
      <div style="display:flex;flex-wrap:nowrap">
        <el-form-item label="收款优惠">
          <el-input @change="matchSomeAllData" v-model="form.youhuiprice"></el-input>
        </el-form-item>
        <el-form-item label="总金额">
          <el-input disabled v-model="form.allprice"></el-input>
        </el-form-item>
        <el-form-item label="本次收款">
          <el-input @change="matchSomeAllData" v-model="form.shoukuanprice"></el-input>
        </el-form-item>
        <el-form-item label="结算账户">
          <el-input v-model="form.jiesuanzhanghu"></el-input>
        </el-form-item>
        <el-form-item label="本次欠款">
          <el-input disabled v-model="form.qiankuanprice"></el-input>
        </el-form-item>
        <el-form-item label="总欠款">
          <el-input disabled v-model="form.allqiankuanprice"></el-input>
        </el-form-item>
        <el-form-item label="销售费用">
          <el-input v-model="form.xiaoshoufeiyong"></el-input>
        </el-form-item>
      </div>
    </el-form>

    <el-dialog
      title="选择型号"
      :modal="zhezhao"
      :fullscreen="checkmingxifull"
      :before-close="closeproductnum"
      :visible.sync="checkproductnumVisble"
      width="75%"
    >
      <prince is="inven"></prince>
    </el-dialog>

    <el-dialog
      :modal="zhezhao"
      title="打印"
      :fullscreen="checkmingxifull"
      :visible.sync="dayinVisble"
    >
      <prince is="sellOrderyulan"></prince>
    </el-dialog>
  </div>
</template>


<script>
import inven from "./inven";
import sellOrderyulan from "./sellOrderyulan";
export default {
  data() {
    return {
      //样式变量
      componentsStyle: { overflow: "hidden", height: "" },
      tabHeight: "",
      //控制视图变量
      formLabelWidth: "70px",
      checkmingxifull: true,
      showSummary: true,
      newAddVisble: false,
      checkproductnumVisble: false,
      checkinvensquarenumVisble: false,
      dayinVisble: false,
      zhezhao: false,
      sellselectVisble: false,
      fanshenhe: false,
      yidayinVisble: false,
      border: true,
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
      },
      productnumData: []
    };
  },
  components: {
    inven,
    sellOrderyulan
  },
  mounted() {
    console.log(localStorage.globMainheight);
    console.log(document.documentElement.clientHeight);
    this.componentsStyle.height = localStorage.globMainheight;
    if (this.form.danjutime == "") {
      this.form.danjutime = "" + this.timeUtil.shifenmiaotime(new Date());
      this.form.danjubianhao =
        "" +
        this.timeUtil.timelongstring(new Date()) +
        Math.ceil(Math.random() * 10);
    }
    this.tabHeight =
      document.documentElement.clientHeight -
      53 -
      10 -
      41 -
      15 -
      10 -
      36 -
      102 -
      50 -
      15 -
      30 +
      "px";
  },
  methods: {
    del(index, rows) {
      var that = this;
      this.$confirm("此操作将删除第" + (index + 1) + "行数据, 是否继续?", "", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          that.form.Data.splice(index, 1);
          that.matchSomeAllData();
        })
        .catch(() => {});
    },
    sellselect() {
      var tabObj = {};
      tabObj.title = "销售待审核单据";
      tabObj.src = "sellOrderdaishenhe";
      tabObj.creattime = this.timeUtil.timelongstring(new Date());
      this.$store.commit("creatIndexTabs", tabObj);
    },
    closesellselect() {
      localStorage.sellorderstatus = 10;
      this.sellselectVisble = false;
    },
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
        duration: 3000,
        onClick: clickFun,
        position: "top-left",
        type: type
      });
    },

    startBianliang() {
      console.log(123);
      this.productnumIndex = 0;
      this.squarenumstringIndex = 0;
      this.newAddVisble = false;
      this.fanshenhe = false;
      this.checkproductnumVisble = false;
      this.yidayinVisble = false;
      localStorage.sellFormData1 = "";
      this.$store.commit("getSellFormData1");
      this.form = {
        kehuname: "",
        uid: "",
        gysname: "",
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
        danjubianhao: "" + this.timeUtil.timelongstring(new Date()),
        danjutime: "" + this.timeUtil.shifenmiaotime(new Date()),
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
      };
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
    querySearch(queryString, cb) {
      var data = {};
      data.username = queryString;
      data.pageNum = 1;
      data.pageSize = 10;
      this.selectUser(data, cb);
    },
    selectUser(data, cb) {
      var that = this;
      data.dbid = JSON.parse(localStorage.user).dbid;
      this.axios
        .get(this.commin.comUrl.user.select_kehu, {
          params: data
        })
        .then(function(response) {
          that.userData = response.data.data[0].list;
          cb(that.userData);
        })
        .catch(function(error) {});
    },
    handleSelect(item) {
      console.log(item);
      this.form.kehuname = item.username;
      this.form.uid = item.uid;
      this.form.allqiankuanprice = item.zhangkuanzongji;
      this.form.userqiankuan = item.zhangkuanzongji;
      this.form.accountmanagername = item.accountmanager.accountmanagername;
      this.form.accountmanagerid = item.accountmanager.accountmanagerid;
    },

    querySearchAccount(queryString, cb) {
      var data = {};
      data.accountmanagername = queryString;
      data.pageNum = 1;
      data.pageSize = 10;
      this.selectAccount(data, cb);
    },
    selectAccount(data, cb) {
      var that = this;
      data.dbid = JSON.parse(localStorage.user).dbid;
      this.axios
        .get(this.commin.comUrl.user.select_accountmanager, {
          params: data
        })
        .then(function(response) {
          that.accountmanagerData = response.data.data;
          cb(that.accountmanagerData);
        })
        .catch(function(error) {});
    },
    handleSelectAccount(item) {
      console.log(item);
      this.form.accountmanagername = item.accountmanagername;
      this.form.accountmanagerid = item.accountmanagerid;
    },

    clickProductnum(index) {
      if (this.form.uid == "") {
        this.showAlert("请先选择客户", "warning");
        return;
      }
      this.productnumIndex = index;
      localStorage.flag = false;
      this.$store.commit("changecaozuoindex");
      this.checkproductnumVisble = true;
    },
    closeproductnum() {
      localStorage.flag = true;
      this.$store.commit("changecaozuoindex");
      localStorage.checkInven = "";
      this.$store.commit("checkInvenClick");
      this.checkproductnumVisble = false;
    },

    onSubmit(status) {
      var that = this;
      var data = JSON.parse(JSON.stringify(that.form));
      data.status = status;
      var productnum = "";
      var pici = "";
      var guige = "";
      var productname = "";
      var productlocation = "";
      var kuwei = "";
      var squarenumstring = "";
      var juanshu = "";
      var squarenum = "";
      var unitprice = "";
      var hanshuidanjia = "";
      var zhekoue = "";
      var orderallprice = "";
      var shuie = "";
      var alljiashui = "";
      var beizhu = "";
      var kcid = "";
      var mingxidanwei = "";
      var yuanmishu = "";
      var caijianmishu = "";
      var mi = "";
      var pingmi = "";
      var seriesnum = "";
      var xiliedanwei = "";
      var cont = 0;
      var Data = this.form.Data;
      for (var i = 0; i < Data.length; i++) {
        if (Data[i].kcid == "") {
          cont++;
          continue;
        }
        productnum += Data[i].productnum + ",";
        pici += Data[i].pici + ",";
        guige += Data[i].guige + ",";
        productname += Data[i].productname + ",";
        productlocation += Data[i].productlocation + ",";
        kuwei += Data[i].kuwei + ",";
        var isquarenumstring = Data[i].squarenumstring;
        isquarenumstring = isquarenumstring.replace(/,/g, "，");
        squarenumstring += isquarenumstring + ",";
        juanshu += Data[i].juanshu + ",";
        squarenum += Data[i].squarenum + ",";
        unitprice += Data[i].unitprice + ",";
        hanshuidanjia += Data[i].hanshuidanjia + ",";
        zhekoue += Data[i].zhekoue + ",";
        orderallprice += Data[i].allprice + ",";
        shuie += Data[i].shuie + ",";
        alljiashui += Data[i].alljiashui + ",";
        beizhu += Data[i].beizhu + ",";
        kcid += Data[i].kcid + ",";
        mingxidanwei += Data[i].mingxidanwei + ",";
        yuanmishu += Data[i].yuanmishu + ",";
        if (Data[i].xhid != undefined || Data[i].xhid != null) {
          caijianmishu += Data[i].caijianmishu.split(",")[0] + ",";
        } else {
          caijianmishu += Data[i].caijianmishu + ",";
        }
        mi += Data[i].mi + ",";
        pingmi += Data[i].pingmi + ",";
        seriesnum += Data[i].seriesnum + ",";
        xiliedanwei += Data[i].xiliedanwei + ",";
      }
      if (cont == Data.length) {
        if (status == 2) {
          this.showAlert("请正确下单后再点击保存", "warning");
        } else {
          this.showAlert("请正确下单后再点击审核", "warning");
        }
        return;
      }
      this.newAddVisble = true;

      productnum = productnum.substring(0, productnum.length - 1);
      pici = pici.substring(0, pici.length - 1);
      guige = guige.substring(0, guige.length - 1);
      productname = productname.substring(0, productname.length - 1);
      productlocation = productlocation.substring(
        0,
        productlocation.length - 1
      );
      kuwei = kuwei.substring(0, kuwei.length - 1);
      squarenumstring = squarenumstring.substring(
        0,
        squarenumstring.length - 1
      );
      juanshu = juanshu.substring(0, juanshu.length - 1);
      squarenum = squarenum.substring(0, squarenum.length - 1);
      unitprice = unitprice.substring(0, unitprice.length - 1);
      hanshuidanjia = hanshuidanjia.substring(0, hanshuidanjia.length - 1);
      zhekoue = zhekoue.substring(0, zhekoue.length - 1);
      orderallprice = orderallprice.substring(0, orderallprice.length - 1);
      shuie = shuie.substring(0, shuie.length - 1);
      alljiashui = alljiashui.substring(0, alljiashui.length - 1);
      beizhu = beizhu.substring(0, beizhu.length - 1);
      kcid = kcid.substring(0, kcid.length - 1);
      mingxidanwei = mingxidanwei.substring(0, mingxidanwei.length - 1);
      yuanmishu = yuanmishu.substring(0, yuanmishu.length - 1);

      caijianmishu = caijianmishu.substring(0, caijianmishu.length - 1);

      mi = mi.substring(0, mi.length - 1);
      pingmi = pingmi.substring(0, pingmi.length - 1);
      seriesnum = seriesnum.substring(0, seriesnum.length - 1);
      xiliedanwei = xiliedanwei.substring(0, xiliedanwei.length - 1);

      data.productnum = productnum;
      data.pici = pici;
      data.guige = guige;
      data.productname = productname;
      data.productlocation = productlocation;
      data.kuwei = kuwei;
      data.squarenumstring = squarenumstring;
      data.juanshu = juanshu;
      data.squarenum = squarenum;
      data.unitprice = unitprice;
      data.hanshuidanjia = hanshuidanjia;
      data.zhekoue = zhekoue;
      data.orderallprice = orderallprice;
      data.shuie = shuie;
      data.alljiashui = alljiashui;
      data.beizhu = beizhu;
      data.kcid = kcid;
      data.mingxidanwei = mingxidanwei;
      data.yuanmishu = yuanmishu;
      data.caijianmishu = caijianmishu;
      data.mi = mi;
      data.pingmi = pingmi;
      data.seriesnum = seriesnum;
      data.xiliedanwei = xiliedanwei;

      data.youhuiprice = data.youhuiprice || 0;
      data.shoukuanprice = data.shoukuanprice || 0;
      data.xiaoshoufeiyong = data.xiaoshoufeiyong || 0;
      delete data["Data"];
      if (data.jxsid != undefined) {
        data.uid = data.jxsid;
        // delete data["xhid"];
        delete data["user"];
        delete data["jxsid"];
        delete data["shoptime"];
        delete data["tax"];
        delete data["ddtype"];
        delete data["zilaid"];
        delete data["weight"];
        delete data["orderaccountid"];
      }
      data.dbid = JSON.parse(localStorage.user).dbid;
      this.axios
        .get(this.commin.comUrl.newShop.creatnewShoporder, {
          params: data
        })
        .then(function(response) {
          console.log(response);
          that.form.xhid = response.data.data[0];
          that.showAlert("成功", "success");
        })
        .catch(function(error) {});
    },
    onPrint(dayin) {
      var that = this;
      var data = {};
      data.xhid = this.form.xhid;
      data.count = 1;
      data.dayin = dayin;
      this.axios
        .get(this.commin.comUrl.newShop.dayinstatus, {
          params: data
        })
        .then(function(response) {
          console.log(response);
          if (dayin == 2) {
            that.yidayinVisble = true;
          } else {
            that.yidayinVisble = false;
            that.showAlert(response.data.data[0], "success");
            that.form.dayintime = "";
          }
        })
        .catch(function(error) {});
      if (dayin == 2) {
        that.form.dayintime = that.timeUtil.shifenmiaotime(new Date());
        this.form.setcreattime = this.timeUtil.timelongstring(new Date());
        localStorage.sellFormData = JSON.stringify(this.form);
        that.$store.commit("getSellFormData");
        that.dayinVisble = true;
        setTimeout(() => {
          window.print();
          that.dayinVisble = false;
        }, 1000);
      }
    },

    matchAllprice(index) {
      this.form.Data[index].allprice = this.util.changeNum(
        Number(this.form.Data[index].unitprice) *
          Number(this.form.Data[index].squarenum),
        2
      );
      this.matchSomeAllData();
    },
    matchSomeAllData() {
      var arr = this.form.Data;
      var allprice = 0;
      var alljuanshu = 0;
      var allmishu = 0;
      var allpingmishu = 0;
      for (var i = 0; i < arr.length; i++) {
        if (arr[i].kcid != "") {
          allprice += this.util.changeNum(arr[i].allprice, 2);
          alljuanshu += this.util.changeNum(arr[i].juanshu, 2);
          allmishu += this.util.changeNum(arr[i].mi, 2);
          allpingmishu += this.util.changeNum(arr[i].pingmi, 2);
        }
      }
      allprice = this.util.changeNum(
        Number(allprice) - Number(this.form.youhuiprice),
        2
      );
      this.form.allprice = this.util.changeNum(allprice, 2);
      this.form.alljuanshu = alljuanshu;
      this.form.allmishu = this.util.changeNum(allmishu, 2);
      this.form.allpingmi = this.util.changeNum(allpingmishu, 2);
      this.form.qiankuanprice = this.util.changeNum(
        Number(this.form.allprice) - Number(this.form.shoukuanprice),
        2
      );
      this.form.allqiankuanprice = this.util.changeNum(
        Number(this.form.userqiankuan) + Number(this.form.qiankuanprice),
        2
      );
    }
  },
  watch: {
    checkInvenClick(val) {
      if (val == "") {
        return;
      }
      console.log(val);
      var that = this;
      var obj = JSON.parse(val);

      var content = "选择的型号：" + obj.productnum;
      content += "<br>选择的批次：" + obj.pici;
      content += "<br>选择的库存地：" + obj.productlocation;
      if (obj.pianshu != 0) {
        content += "<br>输入的数量：" + obj.piancainum;
      }
      content += "<br>配货的明细：" + obj.checkmingxi;
      if (obj.caijianmishu != "" && obj.yuanmishu != "") {
        content += "<br>裁剪：" + obj.yuanmishu + "中裁" + obj.caijianmishu;
      }

      this.form.Data[this.productnumIndex].kcid = obj.kcid;
      this.form.Data[this.productnumIndex].pici = obj.pici;
      this.form.Data[this.productnumIndex].productnum = obj.productnum;
      this.form.Data[this.productnumIndex].seriesnum = obj.seriesnum;
      this.form.Data[this.productnumIndex].guige = obj.guige;
      this.form.Data[this.productnumIndex].productname = obj.productname;
      this.form.Data[this.productnumIndex].productlocation =
        obj.productlocation;
      this.form.Data[this.productnumIndex].mingxidanwei = obj.mingxidanwei;
      this.form.Data[this.productnumIndex].xiliedanwei = obj.xiliedanwei;
      this.form.Data[this.productnumIndex].kuwei = obj.kuwei;
      this.form.Data[this.productnumIndex].squarenumstring = obj.checkmingxi;
      this.form.Data[this.productnumIndex].yuanmishu = obj.yuanmishu;
      this.form.Data[this.productnumIndex].caijianmishu = obj.caijianmishu;
      this.form.Data[this.productnumIndex].beizhu = obj.caijianbeizhu || "";
      var nowindex = this.productnumIndex;

      this.util.matchSquarenumTwo(
        obj.checkmingxi,
        obj.guige,
        obj.mingxidanwei,
        obj.xiliedanwei,
        function(res) {
          that.form.Data[that.productnumIndex].juanshu = res.zhishu;
          that.form.Data[that.productnumIndex].squarenum = res.num;
          that.form.Data[that.productnumIndex].mi = res.mishu;
          that.form.Data[that.productnumIndex].pingmi = res.pingmi;
          if (obj.pianshu != 0) {
            that.form.Data[that.productnumIndex].mi = 0;
            that.form.Data[that.productnumIndex].juanshu = 0;
          }

          var data = {};
          data.kcid = obj.kcid;
          data.uid = that.form.uid;
          that.axios
            .get(that.commin.comUrl.productPrice.select_price_kcidAnduid, {
              params: data
            })
            .then(function(response) {
              that.form.Data[nowindex].unitprice = response.data.data[0].price;
              that.form.Data[nowindex].allprice = that.util.changeNum(
                Number(that.form.Data[nowindex].unitprice) *
                  Number(that.form.Data[nowindex].squarenum),
                2
              );
              that.matchSomeAllData();
            })
            .catch(function(error) {});
        }
      );

      this.productnumIndex++;
      console.log(this.form.Data[this.productnumIndex]);
      if (this.form.Data[this.productnumIndex] == undefined) {
        this.form.Data.push({
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
        });
      }
      console.log("已经选择的型号");
      console.log(this.form.Data);
      this.showNotify("", content, null, "success");
    },
    getSellFormData1(val) {
      console.log(val);
    }
  },
  computed: {
    checkInvenClick() {
      return this.$store.state.checkInven;
    },
    getSellFormData1() {
      console.log("getSellFormData1");
      if (this.$store.state.sellFormData1 == "") {
        return;
      }
      var form = JSON.parse(this.$store.state.sellFormData1);
      form.Data.push({
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
      });
      this.form = form;
      console.log(form);
      this.newAddVisble = true;
      if (this.form.shopstatus == 10) {
        this.fanshenhe = true;
      }
      if (this.form.dayin == 2) {
        this.yidayinVisble = true;
      }
      return this.$store.state.sellFormData1;
    }
  }
};
</script>
<style>
.edit-cell input.el-input__inner {
  padding: 0px;
  border: none;
  text-align: center;
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
<style>
.sellOrder label.el-form-item__label {
  line-height: 25px;
}
.el-table div.cell {
  padding: 0px;
  text-align: center;
}
.el-table td,
.el-table th {
  padding: 0px;
  text-align: center;
}
.el-table--border td:first-child .cell {
  padding: 0px;
  text-align: center;
}
.el-table--border th:first-child .cell {
  padding: 0px;
  text-align: center;
}
</style>


