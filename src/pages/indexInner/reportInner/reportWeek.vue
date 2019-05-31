<template>
  <div>
    <div :style="componentsStyle">
      <el-form style="width:40%;margin:0 auto" label-width="120px" :label-position="labelPosition">
        <el-form-item label="职务">
          <el-input v-model="form.zhiwu"></el-input>
        </el-form-item>
        <el-form-item label="日期">
          <el-date-picker v-model="form.time" value-format="yyyy-MM" type="month" placeholder="选择月"></el-date-picker>
        </el-form-item>
        <el-form-item label="周">
          <el-input v-model="form.week"></el-input>
        </el-form-item>
        <el-form-item label="销售总额目标">
          <el-input v-model="form.xiaoshouzonge"></el-input>
        </el-form-item>
        <el-form-item label="本周总额目标">
          <el-input v-model="form.weekxiaoshouzonge"></el-input>
        </el-form-item>
      </el-form>
      <hr>
      <div style="display:flex;flex-wrap:wrap;justify-content: space-between;">
        <div v-for="(item,index) in form.Data" v-bind:key="index">
          <el-form class="weekForm" label-width="120px" label-position="top">
            <div class="week_title">{{item.title}}</div>
            <el-input v-model="item.kehuname"></el-input>
            <el-form-item label="计划拜访目的及时间">
              <el-input type="textarea" v-model="item.mudiandtime"></el-input>
            </el-form-item>
            <el-form-item label="计划实施完成情况">
              <el-input type="textarea" v-model="item.qingkong"></el-input>
            </el-form-item>
            <el-form-item label="备注">
              <el-input type="textarea" v-model="item.beizhu"></el-input>
            </el-form-item>
          </el-form>
          <!-- <hr v-if="index<4"> -->
        </div>
      </div>
      <el-form label-width="45%" :label-position="labelPosition">
        <el-form-item>
          <el-button type="primary" @click="submitForm">提交</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      componentsStyle: { overflow: "auto", height: "" },
      labelPosition: "left",
      rules: {
        date1: [
          {
            type: "date",
            required: true,
            message: "请选择日期",
            trigger: "change"
          }
        ]
      },
      form: {
        zhiwu: "",
        time: "",
        week: "",
        xiaoshouzonge: "",
        weekxiaoshouzonge: "",
        Data: [
          {
            title: "星期一目标客户",
            kehuname: "",
            mudiandtime: "",
            qingkong: "",
            beizhu: ""
          },
          {
            title: "星期二目标客户",
            kehuname: "",
            mudiandtime: "",
            qingkong: "",
            beizhu: ""
          },
          {
            title: "星期三目标客户",
            kehuname: "",
            mudiandtime: "",
            qingkong: "",
            beizhu: ""
          },
          {
            title: "星期四目标客户",
            kehuname: "",
            mudiandtime: "",
            qingkong: "",
            beizhu: ""
          },
          {
            title: "星期五目标客户",
            kehuname: "",
            mudiandtime: "",
            qingkong: "",
            beizhu: ""
          },
          {
            title: "星期六目标客户",
            kehuname: "",
            mudiandtime: "",
            qingkong: "",
            beizhu: ""
          },
          {
            title: "星期日目标客户",
            kehuname: "",
            mudiandtime: "",
            qingkong: "",
            beizhu: ""
          }
        ]
      }
    };
  },
  mounted() {
    this.componentsStyle.height = localStorage.globMainheight;
  },
  methods: {
    submitForm(formName) {
      var that = this;
      var data = {};
      data.zhiwu = this.form.zhiwu;
      data.time = this.form.time;
      data.week = this.form.week;
      data.xiaoshouzonge = this.form.xiaoshouzonge;
      data.weekxiaoshouzonge = this.form.weekxiaoshouzonge;

      var Data = this.form.Data;
      data.kehuname = "";
      data.mudiandtime = "";
      data.qingkong = "";
      data.beizhu = "";

      for (var i = 0; i < Data.length; i++) {
        var fuhao = "|";
        if (i == Data.length - 1) {
          fuhao = "";
        }
        data.kehuname += Data[i].kehuname + fuhao;
        data.mudiandtime += Data[i].mudiandtime + fuhao;
        data.qingkong += Data[i].qingkong + fuhao;
        data.beizhu += Data[i].beizhu + fuhao;
      }

      this.axios
        .get(this.commin.comUrl.report.insert_week_report, {
          params: data
        })
        .then(function(response) {
          that.showAlert("添加成功", "success");
          that.startbianliang();
        })
        .catch(function(error) {});
    },
    startbianliang() {
      this.form = {
        zhiwu: "",
        time: "",
        week: "",
        xiaoshouzonge: "",
        weekxiaoshouzonge: "",
        Data: [
          {
            title: "星期一目标客户",
            kehuname: "",
            mudiandtime: "",
            qingkong: "",
            beizhu: ""
          },
          {
            title: "星期二目标客户",
            kehuname: "",
            mudiandtime: "",
            qingkong: "",
            beizhu: ""
          },
          {
            title: "星期三目标客户",
            kehuname: "",
            mudiandtime: "",
            qingkong: "",
            beizhu: ""
          },
          {
            title: "星期四目标客户",
            kehuname: "",
            mudiandtime: "",
            qingkong: "",
            beizhu: ""
          },
          {
            title: "星期五目标客户",
            kehuname: "",
            mudiandtime: "",
            qingkong: "",
            beizhu: ""
          },
          {
            title: "星期六目标客户",
            kehuname: "",
            mudiandtime: "",
            qingkong: "",
            beizhu: ""
          },
          {
            title: "星期日目标客户",
            kehuname: "",
            mudiandtime: "",
            qingkong: "",
            beizhu: ""
          }
        ]
      };
    },
    showAlert(msg, type) {
      this.$message({
        showClose: true,
        message: msg,
        type: type
      });
    }
  }
};
</script>

<style scoped>
.el-form .el-select,
.el-form .el-autocomplete,
.el-form .el-textarea,
.el-form .el-col,
.el-form .el-input,
.el-form .el-textarea__inner {
  max-width: 150px;
  width: 150px;
  /* width: 500px; */
}
.week {
  width: 100px;
  -webkit-appearance: none;
  background-color: #fff;
  background-image: none;
  border-radius: 4px;
  border: 1px solid #dcdfe6;
  -webkit-box-sizing: border-box;
  box-sizing: border-box;
  color: #606266;
  display: inline-block;
  font-size: inherit;
  height: 40px;
  line-height: 40px;
  outline: 0;
  padding: 0 15px;
  -webkit-transition: border-color 0.2s cubic-bezier(0.645, 0.045, 0.355, 1);
  transition: border-color 0.2s cubic-bezier(0.645, 0.045, 0.355, 1);
}

.week_title {
  font-size: 14px;
  color: #606266;
  line-height: 40px;
  box-sizing: border-box;
}

.weekForm {
  margin-right: 0px;
}
</style>


