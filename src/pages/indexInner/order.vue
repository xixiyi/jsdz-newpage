<template>
  <div>
    <div :style="componentsStyle">
      456
      <br>456
      <br>456
      <br>456
      <br>456
      <br>456
      <br>456
      <br>456
      <br>456
      <br>456
      <br>456
      <br>456
      <br>456
      <br>456
      <br>456
      <br>456
      <br>456 456
      <br>456
      <br>456
      <br>456
      <br>456
      <br>456
      <br>456
      <br>456
      <br>456
      <br>456
      <br>456
      <br>456
      <br>456
      <br>456
      <br>456
      <br>456 456
      <br>456
      <br>456
      <br>456
      <br>456
      <br>456
      <br>456
      <br>456
      <br>456
      <br>456
      <br>456
      <br>456
      <br>456
      <br>456
      <br>456
      <br>456 456
      <br>456
      <br>456
      <br>456
      <br>456
      <br>456
      <br>456
      <br>456
      <br>456
      <br>456
      <br>456
      <br>456
      <br>456
      <br>456
      <br>456
      <br>456 456
      <br>456
      <br>456
      <br>456
      <br>456
      <br>456
      <br>456
      <br>456
      <br>456
      <br>456
      <br>456
      <br>456
      <br>456
      <br>456
      <br>456
      <br>456 456
      <br>456
      <br>456
      <br>456
      <br>456
      <br>456
      <br>456
      <br>456
      <br>456
      <br>456
      <br>456
      <br>456
      <br>456
      <br>456
      <br>456
      <br>456 456
      <br>456
      <br>456
      <br>456
      <br>456
      <br>456
      <br>456
      <br>456
      <br>456
      <br>456
      <br>456
      <br>456
      <br>456
      <br>456
      <br>456
      <br>456 456
      <br>456
      <br>456
      <br>456
      <br>456
      <br>456
      <br>456
      <br>456
      <br>456
      <br>456
      <br>456
      <br>456
      <br>456
      <br>456
      <br>456
      <br>456 456
      <br>456
      <br>456
      <br>456
      <br>456
      <br>456
      <br>456
      <br>456
      <br>456
      <br>456
      <br>456
      <br>456
      <br>456
      <br>456
      <br>456
      <br>456 456
      <br>456
      <br>456
      <br>456
      <br>456
      <br>456
      <br>456
      <br>456
      <br>456
      <br>456
      <br>456
      <br>456
      <br>456
      <br>456
      <br>456
      <br>456 456
      <br>456
      <br>456
      <br>456
      <br>456
      <br>456
      <br>456
      <br>456
      <br>456
      <br>456
      <br>456
      <br>456
      <br>456
      <br>456
      <br>456
      <br>456 456
      <br>456
      <br>456
      <br>456
      <br>456
      <br>456
      <br>456
      <br>456
      <br>456
      <br>456
      <br>456
      <br>456
      <br>456
      <br>456
      <br>456
      <br>456 456
      <br>456
      <br>456
      <br>456
      <br>456
      <br>456
      <br>456
      <br>456
      <br>456
      <br>456
      <br>456
      <br>456
      <br>456
      <br>456
      <br>456
      <br>456 456
      <br>456
      <br>456
      <br>456
      <br>456
      <br>456
      <br>456
      <br>456
      <br>456
      <br>456
      <br>456
      <br>456
      <br>456
      <br>456
      <br>456
      <br>456
      <br>456
      <br>456
      <br>456
      <br>456
      <br>456
      <br>456
      <br>456
      <br>456
      <br>456
      <br>456
      <br>
      <br>456
      <br>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      componentsStyle: { overflow: "auto", height: "" }
    };
  },
  mounted() {
    console.log(localStorage.globMainheight);
    this.componentsStyle.height = localStorage.globMainheight;
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
