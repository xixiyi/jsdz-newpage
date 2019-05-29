<template>
  <div :style="componentsStyle">
    <div>
      <el-button type="primary" size="mini" round @click="openInsertDiv">添加型号</el-button>
    </div>
    <el-table :data="productData" style="width: 100%" :height="tabHeight">
      <!-- <el-table-column prop="id" label="序号" width="150"></el-table-column> -->
      <el-table-column type="index" width="50" label="序号"></el-table-column>
      <el-table-column prop="series.seriesname" label="品牌名" width="150"></el-table-column>
      <el-table-column prop="series.seriesnum" label="系列名" width="150"></el-table-column>
      <el-table-column prop="series.guige" label="规格" width="150"></el-table-column>
      <el-table-column prop="series.productname" label="产品名称" width="150"></el-table-column>
      <el-table-column prop="productnum" label="型号" width="150"></el-table-column>
      <el-table-column prop="series.xiliedanwei" label="系列单位" width="150"></el-table-column>
      <el-table-column prop="series.mingxidanwei" label="明细单位" width="150"></el-table-column>
      <el-table-column prop label="图片" width="150">
        <!-- <template slot-scope="scope">{{scope.row.xiliedanwei}}</template> -->
        <template>图片上传先空着</template>
      </el-table-column>
      <el-table-column label="描述" width="150">
        <template>描述先空着</template>
      </el-table-column>
      <el-table-column label="报警值" width="150">
        <template slot-scope="scope">{{scope.row.invenbaojing}}{{scope.row.series.xiliedanwei}}</template>
      </el-table-column>
      <el-table-column prop="weight" label="重量" width="150"></el-table-column>
      <el-table-column fixed="right" width="150" label="操作">
        <template slot-scope="scope">
          <!-- @click.native.prevent="deleteRow(scope.$index, mokuaiData)" -->
          <el-button
            style="margin-right:10px"
            @click="openDeleteDiv(scope.$index, productData)"
            type="text"
            size="small"
          >隐藏</el-button>
          <el-button
            style="margin-right:10px"
            @click="openupdateDiv(scope.$index, productData)"
            type="text"
            size="small"
          >更新</el-button>
          <!-- <el-button
            style="margin-left:0px;margin-right:10px"
            @click="openUpdatediv(scope.$index, productData)"
            type="text"
            size="small"
          >更改</el-button>-->
          <!--  <el-button
            @click.native.prevent="updateTreeManager(scope.$index, mokuaiData,1)"
            type="text"
            size="small"
          >分配菜单</el-button>
          <el-button
            @click.native.prevent="updateTreeManager(scope.$index, mokuaiData,2)"
            type="text"
            size="small"
          >分配按钮</el-button>
          <el-button
            @click.native.prevent="updateTreeManager(scope.$index, mokuaiData,3)"
            type="text"
            size="small"
          >显示内容</el-button>-->
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

    <el-dialog
      :before-close="startBianliang"
      :title="dialogTitle"
      width="31%"
      :visible.sync="dialogVisible"
    >
      <el-form :model="form">
        <el-form-item label="系列" :label-width="formLabelWidth">
          <el-autocomplete
            class="inline-input"
            v-model="form.seriesnum"
            :fetch-suggestions="querySearch"
            placeholder="请点击选择系列"
            @select="handleSelect"
          >
            <template slot-scope="props">
              <div class="name">{{ props.item.seriesnum }}</div>
            </template>
          </el-autocomplete>
        </el-form-item>
        <el-form-item label="重量" :label-width="formLabelWidth">
          <el-input v-model="form.weight" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="型号" :label-width="formLabelWidth">
          <el-input type="textarea" autosize v-model="form.productnum" auto-complete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="startBianliang()">取 消</el-button>
        <el-button v-if="submitIndex==1" type="primary" @click="onSubmit(1)">确 定</el-button>
        <el-button v-if="submitIndex==2" type="primary" @click="onSubmit(2)">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>


<script>
export default {
  data() {
    return {
      //样式变量
      componentsStyle: { overflow: "auto", height: "" },
      tabHeight: "",
      //控制视图变量
      formLabelWidth: "120px",
      dialogVisible: false,
      dialogTitle: "添加型号",
      submitIndex: 1,
      //数据变量
      seriesData: [],
      productData: [],
      currentPage4: 1,
      total: 0,
      pageSize: 10,
      pageNum: 1,
      form: {
        seriesnum: "",
        seriesid: "",
        productnum: "",
        weight: ""
      },
      updateproductinid: ""
    };
  },
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
      30 +
      "px";
    this.selectseries({ pageNum: 1, pageSize: 10 });
    this.selectproduct({ pageNum: 1, pageSize: 10 });
  },
  components: {},
  methods: {
    selectseries(data) {
      var that = this;
      data.dbid = JSON.parse(localStorage.user).dbid;
      this.axios
        .get(this.commin.comUrl.product.select_series, {
          params: data
        })
        .then(function(response) {
          that.seriesData = response.data.data[0].list;
        })
        .catch(function(error) {});
    },
    selectproduct(data) {
      var that = this;
      data.dbid = JSON.parse(localStorage.user).dbid;
      this.axios
        .get(this.commin.comUrl.product.select_product, {
          params: data
        })
        .then(function(response) {
          that.productData = response.data.data[0].list;
          that.total = response.data.data[0].total;
        })
        .catch(function(error) {});
    },
    insertproduct(data) {
      var that = this;
      data.dbid = JSON.parse(localStorage.user).dbid;
      console.log(data);
      this.axios
        .get(this.commin.comUrl.product.insert_product, {
          params: data
        })
        .then(function(response) {
          if (response.data.code == 1) {
            that.showAlert(response.data.msg, "warning");
          } else {
            var data = {};
            data.pageNum = 1;
            data.pageSize = that.pageSize;
            that.selectproduct(data);
            that.startBianliang();
          }
        })
        .catch(function(error) {});
    },
    yincangproduct(data) {
      var that = this;
      data.dbid = JSON.parse(localStorage.user).dbid;
      console.log(data);
      this.axios
        .get(this.commin.comUrl.product.yincang_product, {
          params: data
        })
        .then(function(response) {
          // console.log(response)
          if (response.data.status == "0") {
            var data = {};
            data.pageNum = that.pageNum;
            data.pageSize = that.pageSize;
            that.selectproduct(data);
            that.startBianliang();
          } else if (response.data.status == "1") {
            that.showAlert(response.data.msg, "warning");
          }
        })
        .catch(function(error) {});
    },
    deleteproduct(index, rows) {
      console.log(index);
      console.log(rows);
      var data = {};
      data.yincang = 2;
      data.productinid = rows[index].productinid;
      this.yincangproduct(data);
    },
    updateproduct(data) {
      var that = this;
      data.dbid = JSON.parse(localStorage.user).dbid;
      data.productinid = that.updateproductinid;
      console.log(data);
      this.axios
        .get(this.commin.comUrl.product.update_product, {
          params: data
        })
        .then(function(response) {
          // console.log(response)
          if (response.data.status == "0") {
            var data = {};
            data.pageNum = that.pageNum;
            data.pageSize = that.pageSize;
            that.selectproduct(data);
            that.startBianliang();
          } else if (response.data.status == "1") {
            that.showAlert(response.data.msg, "warning");
          }
        })
        .catch(function(error) {});
    },
    onSubmit(index) {
      if (index == 1) {
        this.insertproduct(this.form);
      } else if (index == 2) {
        this.updateproduct(this.form);
      }
    },
    openInsertDiv() {
      this.dialogVisible = true;
      this.dialogTitle = "添加型号";
      this.submitIndex = 1;
      this.updateproductinid = "";
    },
    openupdateDiv(index, rows) {
      this.dialogVisible = true;
      this.dialogTitle = "更新型号：" + rows[index].productnum;
      this.submitIndex = 2;
      this.updateproductinid = rows[index].productinid;
      this.form = {
        seriesnum: rows[index].series.seriesnum,
        seriesid: rows[index].series.seriesid,
        productnum: rows[index].productnum,
        weight: rows[index].weight
      };
    },

    handleSizeChange(val) {
      this.pageSize = val;
      var data = {};
      data.pageSize = val;
      data.pageNum = 1;
      this.pageNum = 1;
      this.selectproduct(data);
    },
    handleCurrentChange(val) {
      this.pageNum = val;
      var data = {};
      data.pageSize = this.pageSize;
      data.pageNum = val;
      this.selectproduct(data);
    },
    handleSelect(item) {
      console.log(item);
      this.form.seriesnum = item.seriesnum;
      this.form.seriesid = item.seriesid;
    },
    querySearch(queryString, cb) {
      console.log(queryString);
      console.log(this.mokuaiData);
      var seriesData = this.seriesData;
      var results = queryString
        ? seriesData.filter(this.createFilter(queryString))
        : seriesData;
      // 调用 callback 返回建议列表的数据
      cb(results);
    },
    createFilter(queryString) {
      console.log("jinli");
      return restaurant => {
        console.log(restaurant);
        return restaurant.seriesnum.indexOf(queryString) === 0;
      };
    },
    startBianliang() {
      this.updateproductinid = "";
      this.dialogTitle = "添加型号";
      this.submitIndex = 1;
      this.dialogVisible = false;
      this.form = {
        seriesnum: "",
        seriesid: "",
        productnum: "",
        weight: ""
      };
    },
    openDeleteDiv(index, rows) {
      var that = this;
      this.$confirm(
        "此操作将删除" + rows[index].productnum + ", 是否继续?",
        "",
        {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning"
        }
      )
        .then(() => {
          that.deleteproduct(index, rows);
        })
        .catch(() => {});
    },
    showAlert(msg, type) {
      this.$message({
        showClose: true,
        message: msg,
        type: type
      });
    }
  },
  watch: {
    globMainheight(val) {
      this.componentsStyle.height = val;
    }
  },
  computed: {
    globMainheight() {
      return this.$store.state.globMainheight;
    }
  }
};
</script>

<style lang="scss" scoped>
.el-form .el-input,
.el-form .el-select,
.el-form .el-autocomplete,
.el-form .el-textarea {
  width: 80%;
}
</style>