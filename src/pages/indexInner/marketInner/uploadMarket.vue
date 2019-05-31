<template>
  <div :style="componentsStyle">
    <div
      style="display:flex;flex-wrap:wrap;justify-content: space-between;position:relative;"
      v-for="(item,index) in form.Data"
      :key="index"
    >
      <el-form label-width="120px" label-position="top" style="text-align:center;width:100%;">
        <div
          style="display:flex;flex-wrap:nowrap;align-item:center;width:100%;justify-content: space-around;"
        >
          <el-form-item label="区域">
            <el-input v-model="item.area"></el-input>
          </el-form-item>
          <el-form-item label="品牌">
            <el-input v-model="item.pinpai"></el-input>
          </el-form-item>
          <el-form-item label="公司名称">
            <el-input v-model="item.companyName"></el-input>
          </el-form-item>
        </div>
        <div
          style="display:flex;flex-wrap:nowrap;align-item:center;width:100%;justify-content: space-around;"
        >
          <el-form-item label="地址">
            <el-input v-model="item.address"></el-input>
          </el-form-item>
          <el-form-item label="公司介绍">
            <el-input v-model="item.companyDes"></el-input>
          </el-form-item>
          <el-form-item label="常规产品">
            <el-input v-model="item.nomalProduct"></el-input>
          </el-form-item>
        </div>
         <div
          style="display:flex;flex-wrap:nowrap;align-item:center;width:100%;justify-content: space-around;"
        >
          <el-form-item label="优势产品">
            <el-input v-model="item.goodProduct"></el-input>
          </el-form-item>
          <el-form-item label="市场占有率">
            <el-input v-model="item.shopHave"></el-input>
          </el-form-item>
          <el-form-item label="知名度">
            <el-input v-model="item.zhiming"></el-input>
          </el-form-item>
        </div>
        <div
          style="display:flex;flex-wrap:nowrap;align-item:center;width:100%;justify-content: space-around;"
        >
          <el-form-item label="地方品牌">
            <el-input v-model="item.smallPinPai"></el-input>
          </el-form-item>
          <el-form-item label="全国品牌">
            <el-input v-model="item.bigPinPai"></el-input>
          </el-form-item>
          <el-form-item label="预估销售额">
            <el-input v-model="item.xiaoshou"></el-input>
          </el-form-item>
        </div>
      </el-form>
        <div
          style="display:flex;width:100%;jusitify-content:space-around;"
        >
      <el-form label-width="150px" label-position="left" style="width:100%;">
        <el-form-item label="与我公司比较的优势" style="margin-left: 11%;">
          <el-input type="textarea" v-model="item.youshi" style="width:70%;"></el-input>
        </el-form-item>
        <el-form-item label="与我公司比较的劣势" style="margin-left: 11%;">
          <el-input type="textarea" v-model="item.lieshi" style="width:70%;"></el-input>
        </el-form-item>
        <el-form-item label="市场评估" style="margin-left: 11%;">
          <el-input type="textarea" v-model="item.pinggu" style="width:70%;"></el-input>
        </el-form-item>
      </el-form>
       </div>
    </div>

    <el-form label-width="45%">
      <el-form-item>
        <el-button type="primary" @click="submitForm">提交</el-button>
        <el-button @click="resetForm">查看</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>


<script>
export default {
  data() {
    return {
      componentsStyle: { overflow: "auto", height: "" },
      form: {
        Data: [
          {
            name: "",
            tel: "",
            address: "",
            fafang: "",
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
    submitForm() {
      console.log(this.form);
    },
    resetForm() {
      alert("还没有做");
    }
  }
};
</script>

<style scoped>
.add {
  width: 50px;
  height: 50px;
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

