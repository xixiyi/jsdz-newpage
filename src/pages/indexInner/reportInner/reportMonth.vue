<template>
  <div :style="componentsStyle">
    <div>
      <el-form style="width:40%;margin:0 auto" label-width="120px" :label-position="labelPosition">
        <el-form-item label="职务">
          <el-input v-model="form.zhiwu"></el-input>
        </el-form-item>
        <el-form-item label="日期">
          <el-date-picker value-format="yyyy-MM" v-model="form.month" type="month" placeholder="选择月"></el-date-picker>
        </el-form-item>
        <el-form-item label="销售总额目标">
          <el-input v-model="form.xiaoshouzonge"></el-input>
        </el-form-item>
      </el-form>
    </div>
    <hr>
    <div style="display:flex;flex-wrap:wrap;justify-content: start;">
      <div
        v-for="(item,index) in form.Data"
        :key="index"
        style="position:relative;margin-right:10px"
      >
        <el-form style="margin-right:30px" label-width="100px" :label-position="labelPosition">
          <el-form-item label="日期">
            <el-col :span="11">
              <el-date-picker
                type="date"
                value-format="yyyy-MM-dd"
                placeholder="选择日期"
                v-model="item.time"
                style="width: 100%;"
              ></el-date-picker>
            </el-col>
          </el-form-item>
          <el-form-item label="区域">
            <el-input v-model="item.quyu"></el-input>
          </el-form-item>
          <el-form-item label="预计完成老顾客">
            <el-input v-model="item.laokehu"></el-input>
          </el-form-item>
          <el-form-item label="新顾客开发">
            <el-input v-model="item.xinkehu"></el-input>
          </el-form-item>
        </el-form>
        <div @click="del(index)" v-if="index>0" class="del">
          <img src="../../../source/images/del.png" alt>
        </div>
      </div>
    </div>
    <div @click="addHandler" class="add">
      <img src="../../../source/images/add.png" alt>
    </div>
    <el-form label-width="45%" :label-position="labelPosition">
      <el-form-item>
        <el-button type="primary" @click="submitForm">提交</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
  data() {
    return {
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
        month: "",
        xiaoshouzonge: "",
        Data: [
          {
            time: "",
            quyu: "",
            laokehu: "",
            xinkehu: ""
          }
        ]
      },
      componentsStyle: { overflow: "auto", height: "" }
    };
  },
  methods: {
    addHandler() {
      this.form.Data.push({
        time: "",
        quyu: "",
        laokehu: "",
        xinkehu: ""
      });
    },
    del(index) {
      this.form.Data.splice(index, 1);
    },
    submitForm(formName) {
      var that = this;
      var data = {};
      data.zhiwu = this.form.zhiwu;
      data.month = this.form.month;
      data.xiaoshouzonge = this.form.xiaoshouzonge;
      data.time = "";
      data.quyu = "";
      data.laokehu = "";
      data.xinkehu = "";
      var Data = this.form.Data;
      for (var i = 0; i < Data.length; i++) {
        var fuhao = "| ";
        if (i == Data.length - 1) {
          fuhao = "";
        }
        data.time += Data[i].time + fuhao;
        data.quyu += Data[i].quyu + fuhao;
        data.laokehu += Data[i].laokehu + fuhao;
        data.xinkehu += Data[i].xinkehu + fuhao;
      }

      this.axios
        .get(this.commin.comUrl.report.insert_month_report, {
          params: data
        })
        .then(function(response) {
          that.showAlert("添加成功", "success");
          that.startbianliang();
        })
        .catch(function(error) {});

      console.log(this.form);
    },
    startbianliang() {
      this.form = {
        zhiwu: "",
        month: "",
        xiaoshouzonge: "",
        Data: [
          {
            time: "",
            quyu: "",
            laokehu: "",
            xinkehu: ""
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
  },
  mounted() {
    this.componentsStyle.height = localStorage.globMainheight;
  }
};
</script>


<style  scoped>
.el-form .el-select,
.el-form .el-autocomplete,
.el-form .el-textarea,
.el-form .el-col,
.el-form .el-input,
.el-form .el-textarea__inner {
  width: 140px;
}
.del {
  position: absolute;
  top: 0;
  right: 0;
  width: 30px;
  height: 30px;
}

.del img {
  width: 100%;
  height: 100%;
}
.add {
  width: 30px;
  height: 30px;
}
.add img {
  width: 100%;
  height: 100%;
}
</style>
<style>
.el-form {
  margin-right: 20px;
}
</style>



