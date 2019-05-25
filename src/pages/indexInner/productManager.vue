<template>
  <div>
    <el-tabs tab-position="left" v-model="first" @tab-click="tabClick" :style="componentsStyle">
      <el-tab-pane label="品牌系列" name="first">
        <series />
      </el-tab-pane>
      <el-tab-pane label="型号" name="second">
        <productinformation />
      </el-tab-pane>
    </el-tabs>
  </div>
</template>
<script>
import series from "./productInner/series";
import productinformation from "./productInner/productinformation";

export default {
  data() {
    return {
      first: "first",
      componentsStyle: { overflow: "hidden", height: "" }
    };
  },
  mounted() {
    console.log(localStorage.globMainheight);
    this.componentsStyle.height = localStorage.globMainheight;
    this.tabHeight =
      document.documentElement.clientHeight -
      53 -
      10 -
      41 -
      15 -
      10 -
      36 -
      28 +
      "px";
  },
  components: {
    series,
    productinformation
  },
  methods: {
    tabClick() {}
  },
  watch: {
    globMainheight(val) {
      this.componentsStyle.height = val;
    }
  },
  computed: {
    globMainheight() {
      return this.$store.state.globMainheight;
    }
  }
};
</script>

<style lang="scss" scoped>
</style>

