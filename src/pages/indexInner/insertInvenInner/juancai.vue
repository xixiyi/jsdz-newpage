<template>
  <div :style="componentsStyle">
    <el-form ref="form" :model="form">
      <div style="display:flex;flex-wrap:nowrap">
        <el-form-item label="生产时间">
          <el-col :span="11">
            <el-date-picker
              type="date"
              placeholder="选择日期"
              v-model="form.shengchantime"
              style="width: 100%;"
            ></el-date-picker>
          </el-col>
        </el-form-item>

        <el-form-item label="客户姓名">
          <el-input v-model="form.kehuname"></el-input>
        </el-form-item>

        <el-form-item label="简称">
          <el-input v-model="form.jiancheng"></el-input>
        </el-form-item>

        <el-form-item label="标准件">
          <el-input v-model="form.biaozhunjian"></el-input>
        </el-form-item>

        <el-form-item label="数量">
          <el-input v-model="form.shuliang"></el-input>
        </el-form-item>
        <el-form-item label="支数">
          <el-input v-model="form.zhishu"></el-input>
        </el-form-item>
      </div>

      <div style="display:flex;flex-wrap:nowrap">
        <el-form-item label="产品批次">
          <el-input v-model="form.date"></el-input>
        </el-form-item>
        <el-form-item label="型号">
          <!-- <el-input v-model="form.name"></el-input> -->
          <el-autocomplete
            v-model="form.productnum"
            :fetch-suggestions="querySearchAsync"
            @select="handleSelect"
          >
            <template slot-scope="props">
              <div class="name">{{ props.item.productnum }}</div>
            </template>
          </el-autocomplete>
        </el-form-item>
        <el-form-item label="班次">
          <el-input v-model="form.banci"></el-input>
        </el-form-item>
        <el-form-item label="产品名称">
          <el-input v-model="form.productname"></el-input>
        </el-form-item>
        <el-form-item label="规格">
          <el-input v-model="form.guige"></el-input>
        </el-form-item>
        <el-form-item label="重量">
          <el-input v-model="form.weight"></el-input>
        </el-form-item>
      </div>

      <div style="display:flex;flex-wrap:nowrap">
        <el-form-item label="库存地">
          <el-input v-model="form.productlocation"></el-input>
        </el-form-item>
        <el-form-item label="库位">
          <el-input v-model="form.kuwei"></el-input>
        </el-form-item>
        <el-form-item label="明细单位">
          <el-input v-model="form.mingxidanwei"></el-input>
        </el-form-item>
        <el-form-item label="库存明细">
          <el-input type="textarea" autosize v-model="form.squarenumstring" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="支号开始数">
          <el-input v-model="form.zhihaostart"></el-input>
        </el-form-item>
      </div>

      <el-form-item>
        <el-button style="width:100px" round type="primary" @click="onSubmit">提交</el-button>
        <!-- <el-button>取消</el-button> -->
      </el-form-item>
    </el-form>
  </div>
</template>


<script>
export default {
  data() {
    return {
      //样式变量
      componentsStyle: { overflow: "auto", height: "" },

      //控制视图变量
      formLabelWidth: "70px",

      //数据变量
      form: {
        productlocation: "",
        kuwei: "",
        banci: "",
        productnum: "",
        date: "",
        squarenumstring: "",
        pianshu: "",
        mingxidanwei: "",
        productname: "",
        guige: "",
        weight: "",
        zhihaostart: "0",
        shengchantime: "",
        kehuname: "",
        biaozhunjian: "20",
        jiancheng: "",
        shuliang: "还没做，没影响",
        zhishu: "还有做，没影响"
      },
      productnumData: []
    };
  },
  mounted() {
    this.componentsStyle.height = localStorage.globMainheight;
    this.form.shengchantime = this.timeUtil.getToday(new Date());
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
  },
  components: {},
  methods: {
    showAlert(msg, type) {
      this.$message({
        showClose: true,
        message: msg,
        type: type
      });
    },
    startBianliang() {
        this.form = {
        productlocation: "",
        kuwei: "",
        banci: "",
        productnum: "",
        date: "",
        squarenumstring: "",
        pianshu: "",
        mingxidanwei: "",
        productname: "",
        guige: "",
        weight: "",
        zhihaostart: "0",
        shengchantime: this.timeUtil.getToday(new Date()),
        kehuname: "",
        biaozhunjian: "20",
        jiancheng: "",
        shuliang: "还没有做，没有影响",
        zhishu: "还没有做，没有影响"
      }
    },
    handleSelect(item) {
      console.log(item);
      this.form.productnum = item.productnum;

      var that = this;
      var data = {};
      data.dbid = JSON.parse(localStorage.user).dbid;
      data.productnum = item.productnum;
      this.axios
        .get(this.commin.comUrl.productInven.select_picibyproductnum, {
          params: data
        })
        .then(function(response) {
          var data = response.data.data;
          if (data.length == 0) {
            that.selectguigeanproductnum(item.productnum);
          } else {
            for (var i = 0; i < data.length; i++) {
              if (item.productnum == data[i].productnum) {
                that.form.guige = data[i].guige;
                that.form.productname = data[i].productname;
                that.form.productlocation = data[i].productlocation;
                that.form.mingxidanwei = data[i].mingxidanwei;
                if (data[i].jiancheng) {
                  that.form.jiancheng = data[i].jiancheng;
                }
              }
            }
          }
        })
        .catch(function(error) {});

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
            // var pingmi = danjiaobejict.squarenumstring.split("*")[1];
            // $(dd)
            //   .prevAll(".pianshu")
            //   .val(danjiaobejict.pianshu);
            // $(dd)
            //   .prevAll(".pianpingmi")
            //   .val(pingmi);
            that.form.kehuname = data.kehuname;
          }
        })
        .catch(function(error) {});
    },
    selectguigeanproductnum(productnum) {
      var that = this;
      var data = {};
      data.dbid = JSON.parse(localStorage.user).dbid;
      data.productnum = productnum;
      this.axios
        .get(this.commin.comUrl.productInven.select_productnum, {
          params: data
        })
        .then(function(response) {
          var data = response.data.data;
          for (var i = 0; i < data.length; i++) {
            if (productnum == data[i].productnum) {
              that.form.guige = data[i].guige;
              that.form.productname = data[i].productname;
              if (data[i].series.mingxidanwei == "请选择") {
                that.form.mingxidanwei = data[i].series.xiliedanwei;
              } else {
                that.form.mingxidanwei = data[i].series.mingxidanwei;
              }
              that.form.kehuname = data[i].series.seriesname;
            }
          }
        })
        .catch(function(error) {});
    },
    onSubmit() {
      var that = this;
      var data = that.form
      data.dbid = JSON.parse(localStorage.user).dbid;
      this.axios
        .get(this.commin.comUrl.productInven.insertinven, {
          params: data
        })
        .then(function(response) {
            that.showAlert('库存提交成功','success');
            that.startBianliang();
        })
        .catch(function(error) {});
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
.el-form .el-textarea,
.el-form .el-col {
  max-width: 150px;
  width: 150px;
}

.el-form-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-right: 25px;
  padding-left: 25px;
}
.el-form-item .el-form-item__content {
  margin-left: 25%;
}
</style>