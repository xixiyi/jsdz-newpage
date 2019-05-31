<template>
  <div>
    <div>
      <el-button type="primary" size="mini" round @click="openjuancaiDiv">添加卷材</el-button>
      <el-button type="primary" size="mini" round @click="openpiancaiDiv">添加片材</el-button>
      <el-button type="primary" size="mini" round @click="openjuancaiDiv">添加其他</el-button>
    </div>
    <el-table border="true" :data="fatherpurchaseData" style="width: 100%" :height="tabHeight">
      <el-table-column type="index" width="50" label="序号"></el-table-column>
      <el-table-column prop="time" label="时间" width="150"></el-table-column>
      <el-table-column prop="firmname" label="往来单位" width="150"></el-table-column>
      <el-table-column prop="productlocation" label="入库仓库" width="150">
        <template slot-scope="scope">{{scope.row.productlocation.split(",")[0]}}</template>
      </el-table-column>
      <el-table-column prop="beizhu" label="备注" width="150"></el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button
            style="margin-right:10px"
            @click="openChildtable(scope.$index, fatherpurchaseData)"
            type="text"
            size="small"
          >查看</el-button>
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
    <!-- 采购子订单的弹窗 -->
    <el-dialog :title="childVisibleTitle" :visible.sync="childVisible" width="75%">
      <el-table :data="childpurchaseData" border="true">
        <el-table-column>
          <el-table-column type="index" width="50" label="序号"></el-table-column>
        </el-table-column>
        <el-table-column :label="childIndex">
          <el-table-column property="productnum" label="型号"></el-table-column>
        </el-table-column>
        <el-table-column :label="childTime">
          <el-table-column property="pici" width="150" label="批次"></el-table-column>
        </el-table-column>
        <el-table-column :label="childFirmname">
          <el-table-column property="sonnum" width="150" label="数量"></el-table-column>
        </el-table-column>
        <el-table-column :label="childProductlocation">
          <el-table-column property="squarestring" width="150" label="明细"></el-table-column>
        </el-table-column>
        <el-table-column label>
          <el-table-column property="purchaseprice" label="单价"></el-table-column>
        </el-table-column>
        <el-table-column label>
          <el-table-column property="sonprice" label="总价"></el-table-column>
        </el-table-column>
        <el-table-column label>
          <el-table-column label="操作"></el-table-column>
        </el-table-column>
      </el-table>
    </el-dialog>
    <el-dialog title="购货" :visible.sync="juancaiVisible" width="100%">
      <el-form ref="form" :model="addjuancai" label-width="80px">
        <div style="display:flex;flex-wrap:nowrap">
          <el-form-item label="往来单位">
            <el-autocomplete
              v-model="addjuancai.firmname"
              :fetch-suggestions="querySearch"
              @select="handleSelect"
            >
              <template slot-scope="props">
                <div class="name">{{ props.item.firmname }}</div>
              </template>
            </el-autocomplete>
          </el-form-item>
          <el-form-item label="摘要">
            <el-input v-model="addjuancai.zhaiyao"></el-input>
          </el-form-item>
          <img
            @click="add"
            style="width:40px;height:40px;margin-left:20px"
            src="http://zhihao.jisudz.com/image/add_nor.png"
            alt
          >
        </div>
      </el-form>
      <el-table border="true" :data="addjuancai.Data">
        <el-table-column data-name="pici" label="产品批次">
          <template slot-scope="scope">
            <el-input data-name="pici" class="edit-cell" v-model="scope.row.pici"></el-input>
          </template>
        </el-table-column>
        <el-table-column label="型号">
          <template slot-scope="scope">
            <!-- <el-input class="edit-cell" v-model="scope.row.productnum"></el-input> -->
            <el-autocomplete
              class="edit-cell"
              @focus="focusproduct(scope.$index)"
              v-model="scope.row.productnum"
              :fetch-suggestions="querySearchAsync"
              @select="handleSelectProductnum"
            >
              <template slot-scope="props">
                <div class="name">{{ props.item.productnum}}</div>
              </template>
            </el-autocomplete>
          </template>
        </el-table-column>
        <el-table-column label="规格">
          <template slot-scope="scope">
            <el-input
              @change="ChangeSquarenumstring(scope.$index)"
              class="edit-cell"
              v-model="scope.row.guige"
            ></el-input>
          </template>
        </el-table-column>
        <el-table-column label="产品名称">
          <template slot-scope="scope">
            <el-input class="edit-cell" v-model="scope.row.productname"></el-input>
          </template>
        </el-table-column>
        <el-table-column label="仓储地">
          <template slot-scope="scope">
            <el-input class="edit-cell" v-model="scope.row.productlocation"></el-input>
          </template>
        </el-table-column>
        <el-table-column label="库位">
          <template slot-scope="scope">
            <el-input class="edit-cell" v-model="scope.row.kuwei"></el-input>
          </template>
        </el-table-column>
        <el-table-column label="采购明细">
          <template slot-scope="scope">
            <el-input
              @change="ChangeSquarenumstring(scope.$index)"
              class="edit-cell"
              v-model="scope.row.squarenumstring"
            ></el-input>
          </template>
        </el-table-column>
        <el-table-column label="采购单价">
          <template slot-scope="scope">
            <el-input
              @change="ChangeSonprice(scope.$index)"
              class="edit-cell"
              v-model="scope.row.purchaseprice"
            ></el-input>
          </template>
        </el-table-column>
        <el-table-column label="数量">
          <template slot-scope="scope">
            <el-input disabled class="edit-cell" v-model="scope.row.squarenum"></el-input>
          </template>
        </el-table-column>
        <el-table-column label="总价">
          <template slot-scope="scope">
            <el-input class="edit-cell" v-model="scope.row.sonprice"></el-input>
          </template>
        </el-table-column>
        <el-table-column label="明细单位">
          <template slot-scope="scope">
            <el-input disabled class="edit-cell" v-model="scope.row.mingxidanwei"></el-input>
          </template>
        </el-table-column>
        <el-table-column width="50" label="操作">
          <template slot-scope="scope">
            <el-button
              v-if="scope.$index!=0"
              type="text"
              size="mini"
              @click="del(scope.$index)"
              round
            >x</el-button>
          </template>
        </el-table-column>
      </el-table>
      <div style="text-align:center;margin-top:20px">
        <el-button type="primary" size="mini" round @click="startBianliang">取消</el-button>
        <el-button type="primary" size="mini" @click="onSubmit" round>提交</el-button>
      </div>
    </el-dialog>

    <el-dialog title="购货" :visible.sync="piancaiVisible" width="100%">
      <el-form ref="form" :model="addpiancai" label-width="80px">
        <div style="display:flex;flex-wrap:nowrap">
          <el-form-item label="往来单位">
            <el-autocomplete
              v-model="addpiancai.firmname"
              :fetch-suggestions="querySearch"
              @select="handleSelectpiancai"
            >
              <template slot-scope="props">
                <div class="name">{{ props.item.firmname }}</div>
              </template>
            </el-autocomplete>
          </el-form-item>
          <el-form-item label="摘要">
            <el-input v-model="addpiancai.zhaiyao"></el-input>
          </el-form-item>
          <img
            @click="add1"
            style="width:40px;height:40px;margin-left:20px"
            src="http://zhihao.jisudz.com/image/add_nor.png"
            alt
          >
        </div>
      </el-form>
      <el-table :data="addpiancai.Data">
        <el-table-column data-name="pici" label="产品批次">
          <template slot-scope="scope">
            <el-input data-name="pici" class="edit-cell" v-model="scope.row.pici"></el-input>
          </template>
        </el-table-column>
        <el-table-column label="型号">
          <template slot-scope="scope">
            <el-autocomplete
              @focus="focusproductpiancai(scope.$index)"
              v-model="scope.row.productnum"
              :fetch-suggestions="querySearchAsync"
              @select="handleSelectProductnumpian"
            >
              <template slot-scope="props">
                <div class="name">{{ props.item.productnum}}</div>
              </template>
            </el-autocomplete>
          </template>
        </el-table-column>
        <el-table-column label="仓储地">
          <template slot-scope="scope">
            <el-input class="edit-cell" v-model="scope.row.productlocation"></el-input>
          </template>
        </el-table-column>
        <el-table-column label="库位">
          <template slot-scope="scope">
            <el-input class="edit-cell" v-model="scope.row.kuwei"></el-input>
          </template>
        </el-table-column>
        <!-- pianshu: "",
            pianpingmi: "",
            zhengxiang: "",
            lingpian: "",
            pici: "",
            productnum: "",
            guige: "",
            productname: "",
            productlocation: "",
            kuwei: "",
            purchaseprice: "",
            sonprice: "",
        allpingmi: ""-->
        <el-table-column label="采购单价">
          <template slot-scope="scope">
            <el-input
              @change="ChangeSonpricepian(scope.$index)"
              class="edit-cell"
              v-model="scope.row.purchaseprice"
            ></el-input>
          </template>
        </el-table-column>
        <el-table-column label="每箱片数">
          <template slot-scope="scope">
            <el-input
              @change="ChangeSonpricepian(scope.$index)"
              class="edit-cell"
              v-model="scope.row.pianshu"
            ></el-input>
          </template>
        </el-table-column>
        <el-table-column label="每片平米数">
          <template slot-scope="scope">
            <el-input
              @change="ChangeSonpricepian(scope.$index)"
              class="edit-cell"
              v-model="scope.row.pianpingmi"
            ></el-input>
          </template>
        </el-table-column>
        <el-table-column label="整箱">
          <template slot-scope="scope">
            <el-input
              @change="ChangeSonpricepian(scope.$index)"
              class="edit-cell"
              v-model="scope.row.zhengxiang"
            ></el-input>
          </template>
        </el-table-column>
        <el-table-column label="零片">
          <template slot-scope="scope">
            <el-input
              @change="ChangeSonpricepian(scope.$index)"
              class="edit-cell"
              v-model="scope.row.lingpian"
            ></el-input>
          </template>
        </el-table-column>
        <el-table-column label="总平米">
          <template slot-scope="scope">
            <el-input disabled class="edit-cell" v-model="scope.row.allpingmi"></el-input>
          </template>
        </el-table-column>
        <el-table-column label="总价">
          <template slot-scope="scope">
            <el-input class="edit-cell" v-model="scope.row.sonprice"></el-input>
          </template>
        </el-table-column>
        <el-table-column width="50" label="操作">
          <template slot-scope="scope">
            <el-button
              v-if="scope.$index!=0"
              type="text"
              size="mini"
              @click="delpiancai(scope.$index)"
              round
            >x</el-button>
          </template>
        </el-table-column>
      </el-table>
      <div style="text-align:center;margin-top:20px">
        <el-button type="primary" size="mini" round @click="startBianliang">取消</el-button>
        <el-button type="primary" size="mini" @click="onSubmitpian" round>提交</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
export default {
  data() {
    return {
      fatherpurchaseData: [],
      childpurchaseData: [],
      tabHeight: "",
      currentPage4: 1,
      total: 0,
      pageSize: 10,
      pageNum: 1,
      caozuoIndex: 1,
      childVisible: false,
      childVisibleTitle: "查看",
      childIndex: "",
      childTime: "",
      childFirmname: "",
      childProductlocation: "",
      firmData: [],
      productnumData: [],
      juancaiVisible: false,
      addjuancaiIndex: 0,
      addjuancai: {
        firmname: "",
        zhaiyao: "",
        Data: [
          {
            pici: "",
            productnum: "",
            guige: "",
            productname: "",
            productlocation: "",
            kuwei: "",
            squarenumstring: "",
            purchaseprice: "",
            squarenum: "",
            sonprice: "",
            mingxidanwei: ""
          }
        ]
      },
      piancaiVisible: false,
      addpiancaiIndex: 0,
      addpiancai: {
        firmname: "",
        zhaiyao: "",
        Data: [
          {
            pianshu: "",
            pianpingmi: "",
            zhengxiang: "",
            lingpian: "",
            pici: "",
            productnum: "",
            guige: "",
            productname: "",
            productlocation: "",
            kuwei: "",
            purchaseprice: "",
            sonprice: "",
            allpingmi: ""
          }
        ]
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
      28 +
      "px";
    this.selectFatherpurchase({ pageNum: 1, pageSize: this.pageSize });
    this.selectFirm({ pageNum: 1, pageSize: 100000 });
  },
  methods: {
    focusproduct(index) {
      this.addjuancaiIndex = index;
    },
    add() {
      this.addjuancai.Data.push({
        pici: "",
        productnum: "",
        guige: "",
        productname: "",
        productlocation: "",
        kuwei: "",
        squarenumstring: "",
        purchaseprice: "",
        squarenum: "",
        sonprice: "",
        mingxidanwei: ""
      });
    },
    del(index) {
      this.addjuancai.Data.splice(index, 1);
    },
    focusproductpiancai(index) {
      this.addpiancaiIndex = index;
    },
    add1() {
      this.addpiancai.Data.push({
        pianshu: "",
        pianpingmi: "",
        zhengxiang: "",
        lingpian: "",
        pici: "",
        productnum: "",
        guige: "",
        productname: "",
        productlocation: "",
        kuwei: "",
        purchaseprice: "",
        sonprice: "",
        allpingmi: ""
      });
    },
    delpiancai(index) {
      this.addpiancai.Data.splice(index, 1);
    },
    ChangeSonpricepian(index) {
      var obj = this.addpiancai.Data[index];
      console.log(obj);
      var pianshu = obj.pianshu || 0;
      var pianpingmi = obj.pianpingmi || 0;
      var purchaseprice = obj.purchaseprice || 0;
      var lingpian = obj.lingpian || 0;
      var zhengxiang = obj.zhengxiang || 0;

      var allpingmi = this.util.changeNum(
        (Number(pianshu) * Number(zhengxiang) + Number(lingpian)) *
          Number(pianpingmi),
        3
      );
      var sonprice = this.util.changeNum(Number(purchaseprice) * allpingmi, 3);

      console.log(allpingmi);
      console.log(sonprice);
      this.addpiancai.Data[index].allpingmi = allpingmi;
      this.addpiancai.Data[index].sonprice = sonprice;

      console.log(this.addpiancai.Data[index]);
    },
    ChangeSquarenumstring(index) {
      var that = this;
      var squarenumstring = this.addjuancai.Data[index].squarenumstring;
      var guige = this.addjuancai.Data[index].guige;
      var mingxidanwei = this.addjuancai.Data[index].mingxidanwei;
      this.util.matchSquarenum(squarenumstring, guige, mingxidanwei, function(
        res
      ) {
        console.log(res);
        if (mingxidanwei != "米" && mingxidanwei != "平米") {
          that.addjuancai.Data[index].squarenum = res.zhishu;
        } else {
          that.addjuancai.Data[index].squarenum =
            res.mishu + "m/" + res.pingmi + "㎡";
        }
        that.ChangeSonprice(index);
      });
    },
    ChangeSonprice(index) {
      var that = this;
      var squarenumstring = this.addjuancai.Data[index].squarenumstring;
      var guige = this.addjuancai.Data[index].guige;
      var mingxidanwei = this.addjuancai.Data[index].mingxidanwei;
      var purchaseprice = this.addjuancai.Data[index].purchaseprice;
      this.util.matchSquarenum(squarenumstring, guige, mingxidanwei, function(
        res
      ) {
        console.log(res);
        if (mingxidanwei != "米" && mingxidanwei != "平米") {
          that.addjuancai.Data[index].sonprice = that.util.changeNum(
            Number(purchaseprice) * res.zhishu,
            2
          );
        } else if (mingxidanwei == "米") {
          that.addjuancai.Data[index].sonprice = that.util.changeNum(
            Number(purchaseprice) * res.pingmi,
            2
          );
        } else if (mingxidanwei == "平米") {
          that.addjuancai.Data[index].sonprice = that.util.changeNum(
            Number(purchaseprice) * res.pingmi,
            2
          );
        }
      });
    },
    onSubmit() {
      console.log(this.addjuancai);
      var data = {};
      data.firmname = this.addjuancai.firmname;
      if (data.firmname == "") {
        that.showAlert("请先选择往来单位", "warning");
        return;
      }
      data.summary = this.addjuancai.zhaiyao;
      data.productnum = "";
      data.date = "";
      data.productlocation = "";
      data.squarenumstring = "";
      data.purchaseprice = "";
      data.kuwei = "";
      data.mingxidanwei = "";
      data.guige = "";
      data.productname = "";
      data.banci = "";
      for (var i = 0; i < this.addjuancai.Data.length; i++) {
        var pinjiefuhao = ",";
        if (i == this.addjuancai.Data.length - 1) {
          pinjiefuhao = "";
        }
        data.productnum += this.addjuancai.Data[i].productnum + pinjiefuhao;
        data.date += this.addjuancai.Data[i].pici + pinjiefuhao;
        data.productlocation +=
          this.addjuancai.Data[i].productlocation + pinjiefuhao;
        data.squarenumstring +=
          this.addjuancai.Data[i].squarenumstring + pinjiefuhao;
        data.purchaseprice +=
          this.addjuancai.Data[i].purchaseprice + pinjiefuhao;
        data.kuwei += this.addjuancai.Data[i].kuwei + pinjiefuhao;
        data.mingxidanwei += this.addjuancai.Data[i].mingxidanwei + pinjiefuhao;
        data.guige += this.addjuancai.Data[i].guige + pinjiefuhao;
        data.productname += this.addjuancai.Data[i].productname + pinjiefuhao;
      }
      console.log(data);
      var that = this;
      data.dbid = JSON.parse(localStorage.user).dbid;
      this.axios
        .get(this.commin.comUrl.purchase.insert_purchase, {
          params: data
        })
        .then(function(response) {
          if (response.data.data[0] == "采购完成") {
            that.showAlert(response.data.data[0], "success");
          } else {
            that.showAlert(response.data.data[0], "warning");
          }
          that.selectFatherpurchase({ pageNum: 1, pageSize: 10 });
          that.startBianliang();
        })
        .catch(function(error) {});
    },
    onSubmitpian() {
      console.log(this.addpiancai);
      var data = {};
      data.firmname = this.addpiancai.firmname;
      if (data.firmname == "") {
        that.showAlert("请先选择往来单位", "warning");
        return;
      }
      data.summary = this.addpiancai.zhaiyao;
      data.productnum = "";
      data.date = "";
      data.productlocation = "";
      data.purchaseprice = "";
      data.kuwei = "";
      data.banci = "";
      data.pianshu = "";
      data.pianpingmi = "";
      data.zhengxiang = "";
      data.lingpian = "";
      for (var i = 0; i < this.addpiancai.Data.length; i++) {
        var pinjiefuhao = ",";
        if (i == this.addpiancai.Data.length - 1) {
          pinjiefuhao = "";
        }
        data.productnum += this.addpiancai.Data[i].productnum + pinjiefuhao;
        data.date += this.addpiancai.Data[i].pici + pinjiefuhao;
        data.productlocation +=
          this.addpiancai.Data[i].productlocation + pinjiefuhao;
        data.purchaseprice +=
          this.addpiancai.Data[i].purchaseprice + pinjiefuhao;
        data.kuwei += this.addpiancai.Data[i].kuwei + pinjiefuhao;

        data.pianshu += this.addpiancai.Data[i].pianshu + pinjiefuhao;
        data.pianpingmi += this.addpiancai.Data[i].pianpingmi + pinjiefuhao;
        data.zhengxiang += this.addpiancai.Data[i].zhengxiang + pinjiefuhao;
        data.lingpian += this.addpiancai.Data[i].lingpian + pinjiefuhao;
      }
      console.log(data);
      var that = this;
      data.dbid = JSON.parse(localStorage.user).dbid;
      this.axios
        .get(this.commin.comUrl.purchase.insert_purchase, {
          params: data
        })
        .then(function(response) {
          if (response.data.data[0] == "采购完成") {
            that.showAlert(response.data.data[0], "success");
          } else {
            that.showAlert(response.data.data[0], "warning");
          }
          that.selectFatherpurchase({ pageNum: 1, pageSize: 10 });
          that.startBianliang();
        })
        .catch(function(error) {});
    },
    selectFatherpurchase(data) {
      var that = this;
      data.dbid = JSON.parse(localStorage.user).dbid;
      this.axios
        .get(this.commin.comUrl.purchase.select_father_purchase, {
          params: data
        })
        .then(function(response) {
          console.log(response);
          that.fatherpurchaseData = response.data.data[0].list;
          that.total = response.data.data[0].total;
        })
        .catch(function(error) {});
    },
    openChildtable(index, rows) {
      var data = {};
      data.pageSize = 10000;
      data.pageNum = 1;
      console.log(rows[index]);
      data.fatherpurchaseid = rows[index].id;
      var that = this;
      data.dbid = JSON.parse(localStorage.user).dbid;
      this.axios
        .get(this.commin.comUrl.purchase.select_son_purchase, {
          params: data
        })
        .then(function(response) {
          that.childpurchaseData = response.data.data[0].list;
          that.childVisible = true;
          that.childIndex = "序号:" + (index + 1);
          that.childTime = "日期:" + rows[index].time;
          that.childFirmname = "往来单位:" + rows[index].firmname;
          that.childProductlocation =
            "入库仓库:" + rows[index].productlocation.split(",")[0];
        })
        .catch(function(error) {});
    },
    showAlert(msg, type) {
      this.$message({
        showClose: true,
        message: msg,
        type: type
      });
    },
    selectFirm(data,cb) {
      var that = this;
      data.dbid = JSON.parse(localStorage.user).dbid;
      this.axios
        .get(this.commin.comUrl.firm.select, {
          params: data
        })
        .then(function(response) {
          console.log(response);
          that.firmData = response.data.data[0].list;
          cb(response.data.data[0].list)
        })
        .catch(function(error) {});
    },
    openjuancaiDiv() {
      this.juancaiVisible = true;
    },
    openpiancaiDiv() {
      this.piancaiVisible = true;
    },
    querySearch(queryString, cb) {
      // var firmData = this.firmData;
      // var results = queryString
      //   ? firmData.filter(this.createFilter(queryString))
      //   : firmData;
      // // 调用 callback 返回建议列表的数据
      // cb(results);
      var data = {}
      data.pageSize = 10
      data.pageNum = 1
      data.firmname = queryString
      this.selectFirm(data,cb)
    },
    createFilter(queryString) {
      return restaurant => {
        return restaurant.firmname.indexOf(queryString) === 0;
      };
    },
    handleSelect(item) {
      console.log(item);
      this.addjuancai.firmname = item.firmname;
    },
    handleSelectpiancai(item) {
      console.log(item);
      this.addpiancai.firmname = item.firmname;
    },

    querySearchAsync(queryString, cb) {
      var data = {};
      data.productnum = queryString;
      this.selectOrderproductnum(data, cb);
    },
    selectOrderproductnum(data, cb) {
      var that = this;
      data.dbid = JSON.parse(localStorage.user).dbid;
      this.axios
        .get(this.commin.comUrl.productInven.select_productnum, {
          params: data
        })
        .then(function(response) {
          that.productnumData = response.data.data;
          console.log(that.productnumData);
          cb(that.productnumData);
        })
        .catch(function(error) {});
    },
    handleSelectProductnum(item) {
      console.log(item);
      var that = this;
      this.addjuancai.Data[this.addjuancaiIndex].productnum = item.productnum;
      this.addjuancai.Data[this.addjuancaiIndex].guige = item.series.guige;
      this.addjuancai.Data[this.addjuancaiIndex].productname =
        item.series.productname;
      this.addjuancai.Data[this.addjuancaiIndex].purchaseprice = 0;
      this.addjuancai.Data[this.addjuancaiIndex].sonprice = 0;
      var obj = {};
      obj.productnum = item.productnum;
      obj.pageNum = 1;
      obj.pageSize = 1;
      obj.count = 1;
      this.axios
        .get(this.commin.comUrl.productInven.selectallproductinven, {
          params: obj
        })
        .then(function(response) {
          var data = response.data.data[0].list[0];
          if (data == undefined) {
            if (item.series.mingxidanwei != "") {
              that.addjuancai.Data[that.addjuancaiIndex].mingxidanwei =
                item.series.mingxidanwei;
            } else {
              that.addjuancai.Data[that.addjuancaiIndex].mingxidanwei =
                item.series.xiliedanwei;
            }
          } else {
            that.addjuancai.Data[that.addjuancaiIndex].mingxidanwei =
              data.mingxidanwei;
            that.addjuancai.Data[that.addjuancaiIndex].purchaseprice =
              data.chengbenjia;
          }
        })
        .catch(function(error) {});
    },
    handleSelectProductnumpian(item) {
      console.log(item);
      var that = this;
      this.addpiancai.Data[this.addpiancaiIndex].productnum = item.productnum;
      var obj = {};
      obj.productnum = item.productnum;
      obj.pageNum = 1;
      obj.pageSize = 1;
      obj.count = 1;
      this.axios
        .get(this.commin.comUrl.productInven.selectallproductinven, {
          params: obj
        })
        .then(function(response) {
          var data = response.data.data[0].list[0];
          if (data == undefined) {
          } else {
            that.addpiancai.Data[that.addpiancaiIndex].purchaseprice =
              data.chengbenjia;
            that.addpiancai.Data[that.addpiancaiIndex].pianshu = data.pianshu;
            var pianpingmi = data.squarenumstring.split(",")[0].split("*")[1];
            that.addpiancai.Data[that.addpiancaiIndex].pianpingmi = pianpingmi;
          }
        })
        .catch(function(error) {});
    },
    startBianliang() {
      this.juancaiVisible = false;
      this.addjuancaiIndex = 0;
      this.addjuancai = {
        firmname: "",
        zhaiyao: "",
        Data: [
          {
            pici: "",
            productnum: "",
            guige: "",
            productname: "",
            productlocation: "",
            kuwei: "",
            squarenumstring: "",
            purchaseprice: "",
            squarenum: "",
            sonprice: "",
            mingxidanwei: ""
          }
        ]
      };
      this.piancaiVisible = false;
      this.addpiancaiIndex = 0;
      this.addpiancai = {
        firmname: "",
        zhaiyao: "",
        Data: [
          {
            pianshu: "",
            pianpingmi: "",
            zhengxiang: "",
            lingpian: "",
            pici: "",
            productnum: "",
            guige: "",
            productname: "",
            productlocation: "",
            kuwei: "",
            purchaseprice: "",
            sonprice: ""
          }
        ]
      };
    },
    handleSizeChange(val) {
      this.pageSize = val;
      var data = {};
      data.pageSize = val;
      data.pageNum = 1;
      this.pageNum = 1;
      this.selectFatherpurchase(data);
    },
    handleCurrentChange(val) {
      this.pageNum = val;
      var data = {};
      data.pageSize = this.pageSize;
      data.pageNum = val;
      this.selectFatherpurchase(data);
    }
  },
  watch: {},
  computed: {}
};
</script>

