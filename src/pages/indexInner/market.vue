<template>
  <div>
    <el-tabs
      v-model="activeName"
      @tab-click="handleClick"
      :tab-position="tabPosition"
      :style="componentsStyle"
    >
      <el-tab-pane label="上传市场调查表" name="first">
          <uploadMarket/>
      </el-tab-pane>
      <el-tab-pane label="查看市场调查表" name="second">
          <lookMarket/>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>

import uploadMarket from "./MarketInner/uploadMarket"
import lookMarket from "./MarketInner/lookMarket"

export default {
  name: "market",
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
      uploadMarket,
      lookMarket
  }
};
</script>

<style>
</style>