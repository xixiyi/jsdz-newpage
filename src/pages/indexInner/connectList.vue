<template>
  <div>
    <el-tabs
      v-model="activeName"
      @tab-click="handleClick"
      :tab-position="tabPosition"
      :style="componentsStyle"
    >
      <el-tab-pane label="上传客服沟通报表" name="first">
          <uploadList/>
      </el-tab-pane>
      <el-tab-pane label="查看客服沟通报表" name="second">
          <lookList/>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>

import uploadList from "./connectInner/uploadList"
import lookList from "./connectInner/lookList"

export default {
  name: "connectList",
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
      uploadList,
      lookList
  }
};
</script>

<style>
</style>
