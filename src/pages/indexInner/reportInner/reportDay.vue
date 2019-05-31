<template>
  <div :style="componentsStyle">
    <!-- <div>
      <el-button type="primary" size="mini" round @click="onSubmit">提交</el-button>
    </div>-->
    <div class="title">拜访客户*</div>
    <div style="display:flex;flex-wrap:wrap;justify-content: space-between;">
      <div v-for="(item,index) in form.Data" v-bind:key="index" style="position:relative">
        <el-form label-width="80px" :label-position="labelPosition">
          <div style="display:flex;flex-wrap:nowrap;align-item:center">
            <el-form-item class="meformitem" label="客户姓名">
              <el-input v-model="item.kehuname"></el-input>
            </el-form-item>
            <el-form-item class="meformitem" label="联系电话">
              <el-input v-model="item.kehuphone"></el-input>
            </el-form-item>
            <el-form-item class="meformitem" label="单位名称">
              <el-input v-model="item.danweiname"></el-input>
            </el-form-item>
          </div>
          <div style="display:flex;flex-wrap:nowrap;align-item:center">
            <el-form-item class="meformitem" label="详细地址">
              <el-input v-model="item.address"></el-input>
            </el-form-item>
            <el-form-item class="meformitem" label="客户情况">
              <el-input v-model="item.kehuqk"></el-input>
            </el-form-item>
            <el-form-item class="meformitem" label="客户意见">
              <el-input v-model="item.kehuyj"></el-input>
            </el-form-item>
          </div>
          <div style="display:flex;flex-wrap:nowrap;align-item:center">
            <el-form-item class="meformitem" label="备注">
              <el-input type="textarea" v-model="item.beizhu"></el-input>
            </el-form-item>
          </div>
        </el-form>
        <div @click="del(index)" v-if="index>0" class="del">
          <img src="../../../source/images/del.png" alt>
        </div>
      </div>
    </div>

    <div class="add" @click="add">
      <img src="../../../source/images/add.png" alt>
    </div>
    <div class="bigInpt">
      <div class="title">市场分析*</div>
      <el-input aria-selected type="textarea" v-model="form.luxian" class="fenxi"></el-input>
    </div>
    <div class="bigInpt">
      <div class="title">客户定位（星级）*</div>
      <el-input type="textarea" v-model="form.pingjia" class="fenxi"></el-input>
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
      labelPosition: "top",
      componentsStyle: { overflow: "auto", height: "" },
      form: {
        luxian: "",
        pingjia: "",
        Data: [
          {
            kehuname: "",
            kehuphone: "",
            danweiname: "",
            address: "",
            kehuqk: "",
            kehuyj: "",
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
    add() {
      this.form.Data.push({
        kehuname: "",
        kehuphone: "",
        danweiname: "",
        address: "",
        kehuqk: "",
        kehuyj: "",
        beizhu: ""
      });
    },
    del(index) {
      this.form.Data.splice(index, 1);
    },
    submitForm() {
      console.log(this.form);
      var that = this;
      var data = {};
      data.luxian = this.form.luxian;
      data.pingjia = this.form.luxian;
      var Data = this.form.Data;

      data.kehuname = "";
      data.kehuphone = "";
      data.danweiname = "";
      data.address = "";
      data.kehuqk = "";
      data.kehuyj = "";
      data.beizhu = "";
      for (var i = 0; i < Data.length; i++) {
        var fuhao = ", ";
        if (i == Data.length - 1) {
          fuhao = "";
        }
        data.kehuname += Data[i].kehuname + fuhao;
        data.kehuphone += Data[i].kehuphone + fuhao;
        data.danweiname += Data[i].danweiname + fuhao;
        data.address += Data[i].address + fuhao;
        data.kehuqk += Data[i].kehuqk + fuhao;
        data.kehuyj += Data[i].kehuyj + fuhao;
        data.beizhu += Data[i].beizhu + fuhao;
      }
      console.log(data);
      this.axios
        .get(this.commin.comUrl.report.insert_day_report, {
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
        luxian: "",
        pingjia: "",
        Data: [
          {
            kehuname: "",
            kehuphone: "",
            danweiname: "",
            address: "",
            kehuqk: "",
            kehuyj: "",
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
.el-form .el-col,
.el-form .el-input {
  max-width: 130px;
  width: 130px;
}

.el-form-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-right: 25px;
  padding-left: 25px;
  margin-bottom: 0px;
}

.title {
  color: red;
}
</style>

<style>
.meformitem label.el-form-item__label {
  padding: 0;
}
.meformitem {
  width: 100%;
}
.meformitem div.el-form-item__content {
  width: 100%;
}
.add {
  width: 30px;
  height: 30px;
}
.add img {
  width: 100%;
  height: 100%;
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
</style>



