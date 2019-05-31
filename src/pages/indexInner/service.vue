<template>
  <div>
    <el-tabs
      v-model="activeName"
      @tab-click="handleClick"
      :tab-position="tabPosition"
      :style="componentsStyle"
    >
      <el-tab-pane label="上传售后回访表" name="first">
          <uploadService/>
      </el-tab-pane>
      <el-tab-pane label="查看售后回访表" name="second">
          <lookService/>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>

import uploadService from "./serviceInner/uploadService"
import lookService from "./serviceInner/lookService"

export default {
  name: "service",
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
      uploadService,
      lookService
  }
};
</script>

<style>
</style>