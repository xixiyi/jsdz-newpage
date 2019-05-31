<template>
  <div>
    <el-tabs
      v-model="activeName"
      @tab-click="handleClick"
      :tab-position="tabPosition"
      :style="componentsStyle"
    >
      <el-tab-pane label="上传日报表" name="first">
       <reportDay/>
      </el-tab-pane>
      <el-tab-pane label="上传周报表" name="second">
          <reportWeek/>
      </el-tab-pane>
      <el-tab-pane label="上传月报表" name="third">
          <reportMonth/>
      </el-tab-pane>
          <el-tab-pane label="查看报表" name="fourth" >
          <lookReport/>
      </el-tab-pane>
    </el-tabs>
    
  </div>
</template>

<script>

import reportDay from "./reportInner/reportDay"
import reportWeek from "./reportInner/reportWeek"
import reportMonth from "./reportInner/reportMonth"
import lookReport from "./reportInner/lookReport"

export default {
  data() {
    return {
      activeName: "first",
      tabPosition: "left",
      componentsStyle: { overflow: "hidden", height: "100%" },
     
    };
  },
  methods: {
    handleClick(tab, event) {
      console.log(tab, event);
    }
  },
  components:{
      reportDay,
      reportWeek,
      reportMonth,
      lookReport
  }
};
</script>


<style lang="scss" scoped>
</style>
