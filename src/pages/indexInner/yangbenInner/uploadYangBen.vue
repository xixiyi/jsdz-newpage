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
            <el-form-item label="客户姓名">
              <el-input v-model="item.name"></el-input>
            </el-form-item>
            <el-form-item label="联系电话">
              <el-input v-model="item.tel"></el-input>
            </el-form-item>
            </div>
             <div
            style="display:flex;flex-wrap:nowrap;align-item:center;width:100%;justify-content: space-around;"
          >
            <el-form-item label="详细地址">
              <el-input v-model="item.address"></el-input>
            </el-form-item>
            <el-form-item label="发放情况">
              <el-input v-model="item.fafang"></el-input>
            </el-form-item>
            </div>
            <el-form-item label="备注">
              <el-input  type="textarea" v-model="item.beizhu" style="width:70%;margin:0 auto;"></el-input>
            </el-form-item>
          
        </el-form>
        <div @click="del(index)" v-if="index>0" class="del">
          <img src="../../../source/images/del.png" alt>
        </div>
      </div>
      <div class="add" @click="add">
        <img src="../../../source/images/add.png" alt>
      </div>
      <el-form label-width="45%" >
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
            beizhu:""
          }
        ],
       
      }
    };
  },
  mounted() {
    this.componentsStyle.height = localStorage.globMainheight;
  },
  methods: {
    add() {
      
      this.form.Data.push({
       name: "",
            tel: "",
            address: "",
            fafang: "",
            beizhu:""
      });
    },
   
    del(index) {
      this.form.Data.splice(index, 1);
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