<template>
  <div>
    <el-tabs tab-position="left" v-model="first" @tab-click="tabClick" :style="componentsStyle">
      <el-tab-pane label="卷材" name="first">
        <juancai/>
      </el-tab-pane>
      <el-tab-pane label="片材" name="second">
        <piancai/>
      </el-tab-pane>
      <el-tab-pane label="其他" name="three">
        <qita/>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>
<script>
import piancai from "./insertInvenInner/piancai";
import juancai from "./insertInvenInner/juancai";
import qita from "./insertInvenInner/qita";

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
    piancai,
    juancai,
    qita
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

