<template>
  <div :style="componentsStyle">
    <div>
      <el-button type="primary" size="mini" round @click="openInsertDiv">添加品牌系列</el-button>
    </div>
    <el-table :data="seriesData" style="width: 100%" :height="tabHeight">
      <!-- <el-table-column prop="id" label="序号" width="150"></el-table-column> -->
      <el-table-column type="index" width="50" label="序号"></el-table-column>
      <el-table-column prop="seriesname" label="品牌名" width="150"></el-table-column>
      <el-table-column prop="seriesnum" label="系列名" width="150"></el-table-column>
      <el-table-column prop="guige" label="规格" width="150"></el-table-column>
      <el-table-column prop="productname" label="产品名称" width="150"></el-table-column>
      <el-table-column prop="xiliedanwei" label="系列单位" width="150"></el-table-column>
      <el-table-column prop="mingxidanwei" label="明细单位" width="150"></el-table-column>
      <el-table-column prop label="图片" width="150">
        <!-- <template slot-scope="scope">{{scope.row.xiliedanwei}}</template> -->
        <template>图片上传先空着</template>
      </el-table-column>
      <el-table-column label="描述" width="150">
        <template>描述先空着</template>
      </el-table-column>
      <!-- <el-table-column prop="pinpaipaixu" label="排序" width="150"></el-table-column> -->
      <el-table-column fixed="right" label="操作">
        <template slot-scope="scope">
          <!-- @click.native.prevent="deleteRow(scope.$index, mokuaiData)" -->
          <el-button
            style="margin-right:10px"
            @click="openDeleteDiv(scope.$index, seriesData)"
            type="text"
            size="small"
          >删除</el-button>
          <el-button
            style="margin-left:0px;margin-right:10px"
            @click="openUpdatediv(scope.$index, seriesData)"
            type="text"
            size="small"
          >更改</el-button>
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
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="currentPage4"
      :page-sizes="[10, 50, 100, 200,total]"
      :page-size="pageSize"
      layout="total, sizes, prev, pager, next, jumper"
      :total="total"
    ></el-pagination>

    <el-dialog :title="dialogTitle" width="31%" :visible.sync="dialogVisible">
      <el-form :model="form">
        <el-form-item label="品牌名" :label-width="formLabelWidth">
          <el-input v-model="form.seriesname" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="产品名称" :label-width="formLabelWidth">
          <el-input v-model="form.productname" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="规格" :label-width="formLabelWidth">
          <el-input v-model="form.guige" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="系列" :label-width="formLabelWidth">
          <el-input v-model="form.seriesnum" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="只有一个编号" :label-width="formLabelWidth">
          <el-select v-model="form.youwubianhao">
            <el-option label="否" value="1"></el-option>
            <el-option label="是" value="2"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="系列单位" :label-width="formLabelWidth">
          <el-input v-model="form.xiliedanwei" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="明细单位" :label-width="formLabelWidth">
          <el-select v-model="form.mingxidanwei">
            <el-option label="请选择" value="请选择"></el-option>
            <el-option label="米" value="米"></el-option>
            <el-option label="平米" value="平米"></el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
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
      dialogTitle: "添加系列",
      submitIndex: 1,
      //数据变量
      seriesData: [],
      currentPage4: 1,
      total: 0,
      pageSize: 10,
      pageNum: 1,
      form: {
        seriesname: "",
        productname: "",
        guige: "",
        seriesnum: "",
        youwubianhao: "1",
        xiliedanwei: "",
        mingxidanwei: "请选择"
      },
      updateseriesid: ""
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
          that.seriesData = response.data.data.list;
          that.total = response.data.data.total;
        })
        .catch(function(error) {});
    },
    insertseries(data) {
      var that = this;
      data.dbid = JSON.parse(localStorage.user).dbid;
      if(data.seriesname==""){
          that.showAlert('品牌名不能为空','warning');
          return
      }
      if(data.guige==""){
          that.showAlert('规格不能为空','warning');
          return
      }
      if(data.seriesnum==""){
          that.showAlert('系列名不能为空','warning');
          return
      }
      if(data.productname==""){
          that.showAlert('产品名称不能为空','warning');
          return
      }
      console.log(data);
      this.axios
        .get(this.commin.comUrl.product.insert_series, {
          params: data
        })
        .then(function(response) {
          if (response.data.code == 1) {
            that.showAlert(response.data.msg, "warning");
          } else {
            var data = {};
            data.pageNum = 1;
            data.pageSize = that.pageSize;
            that.selectseries(data);
            that.startBianliang();
          }
        })
        .catch(function(error) {});
    },
    updateseries(data) {
      var that = this;
      data.dbid = JSON.parse(localStorage.user).dbid;
      data.seriesid = that.updateseriesid;
      console.log(data);
      this.axios
        .get(this.commin.comUrl.product.update_series, {
          params: data
        })
        .then(function(response) {
          // console.log(response)
          if (response.data.code == "0") {
            var data = {};
            data.pageNum = that.pageNum;
            data.pageSize = that.pageSize;
            that.selectseries(data);
            that.startBianliang();
          } else if (response.data.code == "1") {
            that.showAlert(response.data.msg, "warning");
          }
        })
        .catch(function(error) {});
    },
    deleteseries(index, rows) {
      console.log(index);
      console.log(rows);
      var data = {};
      data.yincang = 2;
      //   data.seriesid = rows[index].seriesid;
      this.updateseriesid = rows[index].seriesid;
      this.updateseries(data);
    },
    onSubmit(index) {
      if (index == 1) {
        this.insertseries(this.form);
      } else if (index == 2) {
        this.updateseries(this.form);
      }
    },
    openInsertDiv() {
      this.dialogVisible = true;
      this.dialogTitle = "添加系列";
      this.submitIndex = 1;
      this.updateseriesid = "";
    },
    openUpdatediv(index, rows) {
      this.dialogVisible = true;
      this.dialogTitle = "更改：" + rows[index].seriesnum;
      this.submitIndex = 2;
      this.updateseriesid = rows[index].seriesid;
    },
    handleSizeChange(val) {
      this.pageSize = val;
      var data = {};
      data.pageSize = val;
      data.pageNum = 1;
      this.selectseries(data);
    },
    handleCurrentChange(val) {
      this.pageNum = val;
      var data = {};
      data.pageSize = this.pageSize;
      data.pageNum = val;
      this.selectseries(data);
    },
    startBianliang() {
      this.updateseriesid = "";
      this.dialogTitle = "添加系列";
      this.submitIndex = 1;
      this.dialogVisible = false;
      this.form = {
        seriesname: "",
        productname: "",
        guige: "",
        seriesnum: "",
        youwubianhao: "1",
        xiliedanwei: "",
        mingxidanwei: "请选择"
      };
    },
    openDeleteDiv(index, rows) {
      var that = this;
      this.$confirm(
        "此操作将删除" + rows[index].seriesnum + ", 是否继续?",
        "",
        {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning"
        }
      )
        .then(() => {
          that.deleteseries(index, rows);
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
.el-form .el-autocomplete {
  width: 80%;
}
</style>