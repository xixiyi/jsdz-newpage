<template>
  <div>
    <el-tabs
      v-model="activeName"
      @tab-click="handleClick"
      :tab-position="tabPosition"
      :style="componentsStyle"
    >
      <el-tab-pane label="上传样本发放表" name="first">
          <uploadYangBen/>
      </el-tab-pane>
      <el-tab-pane label="查看样本发放表" name="second">
          <lookYangBen/>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>

import uploadYangBen from "./yangBenInner/uploadYangBen"
import lookYangBen from "./yangBenInner/lookYangBen"

export default {
  name: "yangBen",
  data() {
    return {
      activeName: "first",
      tabPosition: "left",
      componentsStyle: { overflow: "hidden", height: "100%" }
    };
  },
  methods: {
    handleClick(tab, event) {
      console.log(tab, event);
    }
  },
  components: {
      uploadYangBen,
      lookYangBen
  }
};
</script>

<style>
</style>