<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script>

export default {
  name: "app",
  data() {
    return {
      
    };
  },
  components: {
    
  },
  mounted() {
    
  },
  methods: {
    /*
      左侧菜单栏打开关闭的监听事件
    */
    handleOpen(key, keyPath) {
      console.log(key, keyPath);
    },
    handleClose(key, keyPath) {
      console.log(key, keyPath);
    },
    /*
      左侧菜单栏点击添加tab
    */
    handleSelect(key, keyPath, e) {
      console.log(key, keyPath, e);
      this.addTab(e);
    },
    changeCollapse(key, keyPath) {
      console.log(key, keyPath);
      this.isCollapse = !this.isCollapse;
    },
    addTab(targetName) {
      console.log(this.editableTabs);
      if (targetName.$attrs["data-src"] == "loginout") {
        return;
      }
      for (var i = 0; i < this.editableTabs.length; i++) {
        if (this.editableTabs[i].content == targetName.$attrs["data-src"]) {
          this.editableTabsValue = this.editableTabs[i].name;
          return;
        }
      }
      let newTabName = ++this.tabIndex + "";
      this.editableTabs.push({
        title: targetName.$attrs["data-title"],
        name: newTabName,
        content: targetName.$attrs["data-src"],
        closable: true
      });
      this.editableTabsValue = newTabName;
    },
    removeTab(targetName) {
      let tabs = this.editableTabs;
      let activeName = this.editableTabsValue;
      if (activeName === targetName) {
        tabs.forEach((tab, index) => {
          if (tab.name === targetName) {
            let nextTab = tabs[index + 1] || tabs[index - 1];
            if (nextTab) {
              activeName = nextTab.name;
            }
          }
        });
      }
      this.editableTabsValue = activeName;
      this.editableTabs = tabs.filter(tab => tab.name !== targetName);
    }
  }
};
</script>

<style lang="scss" >
body {
  padding: 0;
  margin: 0;
}
// [class^="menuManager_"] {
//   display: none;
// }
</style>
