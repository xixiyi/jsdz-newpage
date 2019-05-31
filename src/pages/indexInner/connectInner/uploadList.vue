<template>
  <div>
    <div :style="componentsStyle">
      <div
        style="display:flex;flex-wrap:wrap;justify-content: space-between;position:relative;"
        v-for="(item,index) in form.DataOne"
        :key="index"
      >
        <el-form label-width="120px" label-position="top" style="text-align:center;width:100%;">
          <div
            style="display:flex;flex-wrap:nowrap;align-item:center;width:100%;justify-content: space-around;"
          >
            <el-form-item label="客户姓名">
              <el-input v-model="item.name"></el-input>
            </el-form-item>
            <el-form-item label="联系电话">
              <el-input v-model="item.tel"></el-input>
            </el-form-item>
            <el-form-item label="详细地址">
              <el-input v-model="item.address"></el-input>
            </el-form-item>
            <el-form-item label="沟通情况">
              <el-input v-model="item.connect"></el-input>
            </el-form-item>
          </div>
        </el-form>
        <div @click="del1(index)" v-if="index>0" class="del">
          <img src="../../../source/images/del.png" alt>
        </div>
      </div>
      <div class="add" @click="add1">
        <img src="../../../source/images/add.png" alt>
      </div>
      <hr>
      <div
        style="display:flex;flex-wrap:wrap;justify-content: space-between;position:relative;"
        v-for="(item,index) in form.DataTwo"
        :key="index"
      >
        <el-form label-width="120px" label-position="top" style="text-align:center;width:100%;">
          <div
            style="display:flex;flex-wrap:nowrap;align-item:center;width:100%;justify-content: space-around;"
          >
            <el-form-item label="客户姓名">
              <el-input v-model="item.name"></el-input>
            </el-form-item>
            <el-form-item label="联系电话">
              <el-input v-model="item.tel"></el-input>
            </el-form-item>
            <el-form-item label="详细地址">
              <el-input v-model="item.address"></el-input>
            </el-form-item>
            <el-form-item label="型号">
              <el-input v-model="item.xinghao"></el-input>
            </el-form-item>
            <el-form-item label="数量">
              <el-input v-model="item.number"></el-input>
            </el-form-item>
            <el-form-item label="进度">
              <el-input v-model="item.jindu"></el-input>
            </el-form-item>
          </div>
        </el-form>
        <div @click="del2(index)" v-if="index>0" class="del">
          <img src="../../../source/images/del.png" alt>
        </div>
      </div>
      <div class="add" @click="add2">
        <img src="../../../source/images/add.png" alt>
      </div>

      <hr>
      <div
        style="display:flex;flex-wrap:wrap;justify-content: space-between;position:relative;"
        v-for="(item,index) in form.DataThree"
        :key="index"
      >
        <el-form label-width="120px" label-position="top" style="text-align:center;width:100%;">
          <div
            style="display:flex;flex-wrap:nowrap;align-item:center;width:100%;justify-content: space-around;"
          >
            <el-form-item label="型号">
              <el-input v-model="item.xinghao"></el-input>
            </el-form-item>
            <el-form-item label="联系电话">
              <el-input v-model="item.tel"></el-input>
            </el-form-item>
            <el-form-item label="详细地址">
              <el-input v-model="item.address"></el-input>
            </el-form-item>
            <el-form-item label="发货物流/样本快递跟踪情况">
              <el-input v-model="item.wuliu"></el-input>
            </el-form-item>
          </div>
        </el-form>
       <div @click="del3(index)" v-if="index>0" class="del">
        <img src="../../../source/images/del.png" alt>
      </div>
    </div>
    <div class="add" @click="add3">
      <img src="../../../source/images/add.png" alt>
    </div>
      <el-form label-width="45%">
        <el-form-item>
          <el-button type="primary" @click="submitForm">提交</el-button>
          <el-button @click="resetForm">查看</el-button>
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
      form: {
        DataOne: [
          {
            name: "",
            tel: "",
            address: "",
            connect: ""
          }
        ],
        DataTwo: [
          {
            name: "",
            tel: "",
            address: "",
            xinghao: "",
            number: "",
            jindu: ""
          }
        ],
        DataThree: [
          {
            xinghao: "",
            tel: "",
            address: "",
            wuliu: ""
          }
        ]
      }
    };
  },
  mounted() {
    this.componentsStyle.height = localStorage.globMainheight;
  },
  methods: {
    add1() {
      console.log("1");
      this.form.DataOne.push({
        name: "",
        tel: "",
        address: "",
        connect: ""
      });
    },
    add2() {
      console.log("2");
      this.form.DataTwo.push({
        name: "",
        tel: "",
        address: "",
        xinghao: "",
        number: "",
        jindu: ""
      });
    },
    add3() {
      console.log("3");
      this.form.DataThree.push({
        xinghao: "",
        tel: "",
        address: "",
        wuliu: ""
      });
    },
    del1(index) {
      this.form.DataOne.splice(index, 1);
    },
     del2(index) {
      this.form.DataTwo.splice(index, 1);
    },
     del3(index) {
      this.form.DataThree.splice(index, 1);
    },
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
.del{
  position:absolute;
  top:0;
  right:0;
  width: 30px;
  height: 30px;
}

.del img{
  width: 100%;
  height: 100%;
}
</style>
