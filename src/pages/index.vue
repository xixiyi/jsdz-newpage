<template>
  <div id="index">
    <el-container>
      <el-header style="background-color:#252a2f;padding:0 20px 0 0;height:53px;line-height:53px">
        <img
          v-if="isCollapse"
          style="width:64px;height:53px;vertical-align: middle;"
          src="../source/images/logo.png"
          alt
          srcset
        >
        <img
          v-if="!isCollapse"
          style="width:200px;height:53px;vertical-align: middle;"
          src="../source/images/biglogo.png"
          alt
          srcset
        >
        <div v-if="isCollapse" :style="[headstyle]">
          <i @click="changeCollapse" class="el-icon-s-unfold"></i>
        </div>
        <div v-if="!isCollapse" :style="[headstyle]">
          <i @click="changeCollapse" class="el-icon-s-fold"></i>
        </div>
        <!-- <div style="margin-right:0px;margin-left:315px" :style="[headstyle]">
          <i @click="refreshConpan" class="el-icon-refresh-right"></i>
        </div> -->
        <el-menu
          background-color="#252a2f"
          text-color="#ffffff"
          active-text-color="#ffd04b"
          class="el-menu-demo"
          mode="horizontal"
          style="float:right;height:53px;line-height:53px"
          @select="handleSelect"
        >
          <el-menu-item @click="refreshConpan" data-src="false" >
            <i data-src="false" class="el-icon-refresh-right"></i>
          </el-menu-item>
          <el-menu-item data-src="wodexiaoxi" data-title="我的消息" index="1">
            <i class="el-icon-message-solid"></i>
          </el-menu-item>
          <el-submenu index="2">
            <template slot="title">{{user.username}}</template>
            <!-- <el-menu-item style="text-align:center" data-src="false">{{user.company}}</el-menu-item> -->
            <el-menu-item
              style="text-align:center"
              data-src="jibenziliao"
              data-title="基本资料"
              index="2-1"
            >基本资料</el-menu-item>
            <el-menu-item style="text-align:center" data-src="loginout" index="2-2">退出登录</el-menu-item>
          </el-submenu>
        </el-menu>
      </el-header>
      <el-container :style="[clientHeight]">
        <el-aside :style="[asideStyle]">
          <div class="inner-container">
            <el-menu
              class="el-menu-vertical-demo"
              background-color="#252a2f"
              text-color="#ffffff"
              :style="[clientHeight]"
              @open="handleOpen"
              @close="handleClose"
              :collapse="isCollapse"
              :unique-opened="unique_opened"
              @select="handleSelect"
            >
              <el-submenu index="1" class="mokuai_menuManager_1">
                <template slot="title">
                  <i class="el-icon-shopping-cart-2"></i>
                  <span slot="title">购货</span>
                </template>
                <el-menu-item
                  index="1-1"
                  class="mokuai_menuManager_1_1"
                  data-src="purchOrder"
                  data-title="购货订单"
                >购货订单</el-menu-item>
                <el-menu-item
                  index="1-2"
                  class="mokuai_menuManager_1_2"
                  data-src="shopOrder"
                  data-title="购货单"
                >购货单</el-menu-item>
                <el-menu-item
                  index="1-3"
                  class="mokuai_menuManager_1_3"
                  data-src="shopOrder"
                  data-title="购货退货单"
                >购货退货单</el-menu-item>
                <el-menu-item
                  index="1-4"
                  class="mokuai_menuManager_1_4"
                  data-src="purchmingxi"
                  data-title="购货明细"
                >购货明细</el-menu-item>
              </el-submenu>
              <el-submenu index="2" class="mokuai_menuManager_2">
                <template slot="title">
                  <i class="el-icon-shopping-bag-1"></i>
                  <span slot="title">销货</span>
                </template>
                <el-menu-item
                  index="2-1"
                  class="mokuai_menuManager_2_1"
                  data-src
                  data-title="销货订单"
                >销货订单</el-menu-item>
                <el-menu-item
                  index="2-2"
                  class="mokuai_menuManager_2_2"
                  data-src="sellOrder"
                  data-title="销货单"
                >销货单</el-menu-item>
                <el-menu-item
                  index="2-3"
                  class="mokuai_menuManager_2_3"
                  data-src="sellOrderdaishenhe"
                  data-title="销货待审核单据"
                >销货待审核单据</el-menu-item>
                <el-menu-item
                  index="2-4"
                  class="mokuai_menuManager_2_4"
                  data-src="sellOrderselect"
                  data-title="销货已审核单据"
                >销货已审核单据</el-menu-item>
                <el-menu-item
                  index="2-5"
                  class="mokuai_menuManager_2_5"
                  data-src="www.baid7u.com"
                  data-title="销货退货单"
                >销货退货单</el-menu-item>
                <el-menu-item
                  index="2-6"
                  class="mokuai_menuManager_2_6"
                  data-src="sellOrdermingxi"
                  data-title="销货明细"
                >销货明细</el-menu-item>
              </el-submenu>
              <el-submenu index="3" class="mokuai_menuManager_3">
                <template slot="title">
                  <i class="el-icon-school"></i>
                  <span slot="title">仓库</span>
                </template>
                <el-menu-item
                  index="3-1"
                  class="mokuai_menuManager_3_1"
                  data-src="insertInvenManager"
                  data-title="入库"
                >入库</el-menu-item>
                <!-- <el-submenu index="3-2" class="mokuai_menuManager_3_2">
                  <span slot="title">调货</span>
                  <el-menu-item
                    index="3-2-1"
                    class="mokuai_menuManager_3_2_1"
                    data-src="www.b9aidu.com"
                    data-title="调货单"
                  >调货单</el-menu-item>
                  <el-menu-item
                    index="3-2-2"
                    class="mokuai_menuManager_3_2_2"
                    data-src="www.b09aidu.com"
                    data-title="调货明细"
                  >调货明细</el-menu-item>
                </el-submenu>-->
                <el-menu-item
                  index="3-2"
                  class="mokuai_menuManager_3_2"
                  data-src="www.baidu.c08om"
                  data-title="报损报溢"
                >调货单</el-menu-item>
                <el-menu-item
                  index="3-3"
                  class="mokuai_menuManager_3_3"
                  data-src="www.baidu.c08om"
                  data-title="报损报溢"
                >调货明细</el-menu-item>
                <el-menu-item
                  index="3-4"
                  class="mokuai_menuManager_3_4"
                  data-src="www.baidu.c08om"
                  data-title="报损报溢"
                >报损报溢</el-menu-item>
                <el-menu-item
                  index="3-5"
                  class="mokuai_menuManager_3_5"
                  data-src="inven"
                  data-title="库存详情"
                >库存详情</el-menu-item>
                <el-menu-item
                  index="3-6"
                  class="mokuai_menuManager_3_6"
                  data-src="www.0674.com"
                  data-title="库存报警"
                >库存报警</el-menu-item>
                <el-menu-item
                  index="3-7"
                  class="mokuai_menuManager_3_7"
                  data-src="www.3547.com"
                  data-title="收发汇总表"
                >收发汇总表</el-menu-item>
              </el-submenu>
              <el-submenu index="4" class="mokuai_menuManager_4">
                <template slot="title">
                  <i class="el-icon-odometer"></i>
                  <span slot="title">生产</span>
                </template>
                <el-menu-item
                  index="4-1"
                  class="mokuai_menuManager_4_1"
                  data-src="www.w3465.com"
                  data-title="生产订单"
                >生产订单</el-menu-item>
                <el-menu-item
                  index="4-2"
                  class="mokuai_menuManager_4_2"
                  data-src="www.123ser.com"
                  data-title="生产报表"
                >生产报表</el-menu-item>
                <el-menu-item
                  index="4-3"
                  class="mokuai_menuManager_4_3"
                  data-src="www.bairewdu.com"
                  data-title="生产进度"
                >生产进度</el-menu-item>
                <el-menu-item
                  index="4-4"
                  class="mokuai_menuManager_4_4"
                  data-src="www.wer.com"
                  data-title="生产业绩"
                >生产业绩</el-menu-item>
                <el-menu-item
                  index="4-5"
                  class="mokuai_menuManager_4_5"
                  data-src="www.baisgrfdu.com"
                  data-title="生产资料"
                >生产资料</el-menu-item>
                <!-- <el-submenu index="4-5">
                  <span slot="title">生产资料</span>
                  <el-menu-item index="4-5-1">生产类型</el-menu-item>
                  <el-menu-item index="4-5-2">环节型号关联</el-menu-item>
                  <el-menu-item index="4-5-3">环节原材料关联</el-menu-item>
                  <el-menu-item index="4-5-4">型号原材料关联</el-menu-item>
                  <el-menu-item index="4-5-5">环节规格金额</el-menu-item>
                  <el-menu-item index="4-5-6">大片规格</el-menu-item>
                  <el-menu-item index="4-5-7">成品规格</el-menu-item>
                  <el-menu-item index="4-5-8">原规格</el-menu-item>
                  <el-menu-item index="4-5-9">规格关联</el-menu-item>
                  <el-menu-item index="4-5-10">贴静音垫</el-menu-item>
                  <el-menu-item index="4-5-11">锁扣类型</el-menu-item>
                  <el-menu-item index="4-5-12">防伪标签</el-menu-item>
                  <el-menu-item index="4-5-13">UV光泽度</el-menu-item>
                  <el-menu-item index="4-5-14">压纹</el-menu-item>
                  <el-menu-item index="4-5-15">厚度</el-menu-item>
                  <el-menu-item index="4-5-16">倒角</el-menu-item>
                  <el-menu-item index="4-5-17">类别</el-menu-item>
                  <el-menu-item index="4-5-18">颜色</el-menu-item>
                  <el-menu-item index="4-5-19">密度</el-menu-item>
                  <el-menu-item index="4-5-20">岗位</el-menu-item>
                  <el-menu-item index="4-5-21">姓名</el-menu-item>
                  <el-menu-item index="4-5-22">班次</el-menu-item>
                  <el-menu-item index="4-5-23">补贴</el-menu-item>
                  <el-menu-item index="4-5-24">彩膜型号</el-menu-item>
                </el-submenu>-->
                <el-menu-item
                  index="4-6"
                  class="mokuai_menuManager_4_6"
                  data-src="www.bagsridu.com"
                  data-title="原材料管理"
                >原材料管理</el-menu-item>
                <el-menu-item
                  index="4-7"
                  class="mokuai_menuManager_4_7"
                  data-src="www.baisfgrdu.com"
                  data-title="订单原材料"
                >订单原材料</el-menu-item>
              </el-submenu>
              <el-submenu index="5" class="mokuai_menuManager_5">
                <template slot="title">
                  <i class="el-icon-data-analysis"></i>
                  <span slot="title">报表</span>
                </template>
                <el-menu-item
                  index="5-1"
                  class="mokuai_menuManager_5_1"
                  data-src="connectList"
                  data-title="客服沟通表"
                >客服沟通表</el-menu-item>
                <el-menu-item
                  index="5-2"
                  class="mokuai_menuManager_5_2"
                  data-src="yangBen"
                  data-title="样本发放表"
                >样本发放表</el-menu-item>
                <el-menu-item
                  index="5-3"
                  class="mokuai_menuManager_5_3"
                  data-src="market"
                  data-title="市场调查表"
                >市场调查表</el-menu-item>
                <el-menu-item
                  index="5-4"
                  class="mokuai_menuManager_5_4"
                  data-src="service"
                  data-title="售后回访表"
                >售后回访表</el-menu-item>
                <el-menu-item
                  index="5-5"
                  class="mokuai_menuManager_5_5"
                  data-src="report"
                  data-title="日周月报表"
                >日周月报表</el-menu-item>
              </el-submenu>
              <el-submenu index="6" class="mokuai_menuManager_6">
                <template slot="title">
                  <i class="el-icon-folder-opened"></i>
                  <span slot="title">资料</span>
                </template>
                <el-menu-item
                  index="6-1"
                  class="mokuai_menuManager_6_1"
                  data-src="kehu"
                  data-title="客户管理"
                >客户管理</el-menu-item>
                <el-menu-item
                  index="6-2"
                  class="mokuai_menuManager_6_2"
                  data-src="firmManager"
                  data-title="供应商管理"
                >供应商管理</el-menu-item>
                <el-menu-item
                  index="6-3"
                  class="mokuai_menuManager_6_3"
                  data-src="productManager"
                  data-title="商品管理"
                >商品管理</el-menu-item>
                <el-menu-item
                  index="6-4"
                  class="mokuai_menuManager_6_4"
                  data-src="staff"
                  data-title="员工管理"
                >员工管理</el-menu-item>
              </el-submenu>
              <el-submenu index="7" class="mokuai_menuManager_7">
                <template slot="title">
                  <i class="el-icon-menu"></i>
                  <span slot="title">资金</span>
                </template>
                <el-menu-item
                  index="7-1"
                  class="mokuai_menuManager_7_1"
                  data-src="www.baisdgrdu.com"
                  data-title="xxx"
                >xxx</el-menu-item>
                <el-menu-item
                  index="7-2"
                  class="mokuai_menuManager_7_2"
                  data-src="www.baidsgrdu.com"
                  data-title="xxx"
                >xxx</el-menu-item>
                <el-menu-item
                  index="7-3"
                  class="mokuai_menuManager_7_3"
                  data-src="www.basrfidu.com"
                  data-title="xxx"
                >xxx</el-menu-item>
                <el-menu-item
                  index="7-4"
                  class="mokuai_menuManager_7_4"
                  data-src="www.base4tidu.com"
                  data-title="xxx"
                >xxx</el-menu-item>
              </el-submenu>
              <el-submenu index="8" class="mokuai_menuManager_8">
                <template slot="title">
                  <i class="el-icon-s-tools"></i>
                  <span slot="title">设置</span>
                </template>
                <el-menu-item
                  index="8-1"
                  class="mokuai_menuManager_8_1"
                  data-src="mokuaiManager"
                  data-title="模块管理"
                >模块管理</el-menu-item>
                <!-- <el-menu-item index="8-2">菜单管理</el-menu-item> -->
                <el-menu-item
                  index="8-2"
                  class="mokuai_menuManager_8_2"
                  data-src="www.baidrew2u.com"
                  data-title="日志管理"
                >日志管理</el-menu-item>
              </el-submenu>
            </el-menu>
          </div>
        </el-aside>
        <el-main>
          <el-tabs v-model="editableTabsValue" type="card" @tab-remove="removeTab">
            <el-tab-pane
              v-for="(item) in editableTabs"
              :key="item.name"
              :label="item.title"
              :name="item.name"
              :closable="item.closable"
            >
              <prince v-if="item.reload" :is="item.content" :style="[iframeStyle]"></prince>
              <!-- <iframe :src="item.content" :style="[iframeStyle]"></iframe> -->
            </el-tab-pane>
          </el-tabs>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script>
/*
  引入不同的组件页面
*/
/**首页 */
import shouye from "./indexInner/shouye";

/**购货模块 */
import purchOrder from "./indexInner/purchOrder";
import shopOrder from "./indexInner/shopOrder";
import purchmingxi from "./indexInner/purchmingxi";

/**销售模块 */
import sellOrder from "./indexInner/sellOrder";
import sellOrderselect from "./indexInner/sellOrderselect";
import sellOrderdaishenhe from "./indexInner/sellOrderdaishenhe";
import sellOrdermingxi from "./indexInner/sellOrdermingxi";

/** 仓库模块 */
import insertInvenManager from "./indexInner/insertInvenManager";
import inven from "./indexInner/inven";

/** 报表模块 */
import report from "./indexInner/report";
import connectList from "./indexInner/connectList";
import yangBen from "./indexInner/yangBen";
import market from "./indexInner/market";
import service from "./indexInner/service";

/** 资料模块 */
import kehu from "./indexInner/kehu";
import firmManager from "./indexInner/firmManager";
import productManager from "./indexInner/productManager";
import staff from "./indexInner/staff";

/** 设置模块 */
import mokuaiManager from "./indexInner/mokuaiManager";

export default {
  name: "index",
  data() {
    return {
      unique_opened: true,
      isCollapse: true,
      clientHeight: { height: "" },
      iframeStyle: {
        width: "100%",
        border: "0",
        "overflow-x": "hidden",
        "overflow-y": "hidden",
        height: ""
      },
      headstyle: {
        display: "inline-block",
        height: "53px",
        "line-height": "53px",
        color: "#909399",
        "font-size": "18px",
        "vertical-align": "middle",
        "margin-right": "40px"
      },

      asideStyle: {
        position: "relative",
        overflow: "hidden",
        "background-color": "#252a2f",
        width: "auto"
      },

      editableTabsValue: "1",
      editableTabs: [
        {
          title: "主页",
          name: "1",
          content: "shouye",
          closable: false,
          reload: true
        }
      ],
      tabIndex: 2,
      user: { username: "用户姓名" }
    };
  },
  components: {
    shouye,
    purchOrder,
    shopOrder,
    insertInvenManager,
    inven,
    kehu,
    firmManager,
    productManager,
    staff,
    mokuaiManager,
    sellOrder,
    sellOrderselect,
    sellOrderdaishenhe,
    sellOrdermingxi,
    purchmingxi,
    report
    // connectList,
    // yangBen,
    // market,
    // service
  },
  mounted() {
    this.clientHeight.height =
      document.documentElement.clientHeight - 53 + "px";
    this.iframeStyle.height =
      document.documentElement.clientHeight - 134 + "px";
    localStorage.globMainheight = this.iframeStyle.height;
    this.$store.commit("globMainheight");
    if (localStorage.refsh == 1) {
      localStorage.refsh = 2;
      window.location.reload();
    }
    //
    console.log(JSON.parse(this.$store.state.user).dbid);
    if (JSON.parse(this.$store.state.user).dbid == undefined) {
      this.user = JSON.parse(localStorage.user);
      // console.log(this.user)
    } else {
      this.user = JSON.parse(this.$store.state.user);
    }
  },
  methods: {
    /*
      左侧菜单栏打开关闭的监听事件
    */
    handleOpen(key, keyPath) {
      console.log(key, keyPath);
    },
        showAlert(msg, type) {
      this.$message({
        showClose: true,
        message: msg,
        type: type
      });
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
      if (targetName.$attrs["data-src"] == "false") {
        return;
      }
      if (targetName.$attrs["data-src"] == "loginout") {
        //   console.log(self.router)
        localStorage.userInfo = null;
        this.router.push({
          path: "/login"
        });
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
        closable: true,
        reload: true
      });

      this.editableTabsValue = newTabName;
    },
    creatorqiehuanTab(obj) {
      for (var i = 0; i < this.editableTabs.length; i++) {
        if (this.editableTabs[i].content == obj.src) {
          this.editableTabsValue = this.editableTabs[i].name;
          return;
        }
      }
      let newTabName = ++this.tabIndex + "";
      this.editableTabs.push({
        title: obj.title,
        name: newTabName,
        content: obj.src,
        closable: true,
        reload: true
      });
      this.editableTabsValue = newTabName;
    },
    refreshConpan() {
      console.log(this.editableTabsValue);
      for (var i = 0; i < this.editableTabs.length; i++) {
        if (this.editableTabs[i].name == this.editableTabsValue) {
          this.editableTabs[i].reload = false;
          this.$nextTick(() => (this.editableTabs[i].reload = true));
          this.showAlert('刷新成功','success')
          return;
        }
      }
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
  },
  watch: {
    creatIndexTabs(value) {
      console.log(value);
      this.creatorqiehuanTab(value);
    }
  },
  computed: {
    creatIndexTabs() {
      return this.$store.state.tabObj;
    }
  }
};
</script>

<style lang="scss" >
body {
  padding: 0;
  margin: 0;
}

.el-menu-vertical-demo:not(.el-menu--collapse) {
  width: 200px;
  min-height: 400px;
}
.el-submenu__title:hover {
  border-bottom: 3px solid skyblue;
}
.el-menu-item:hover {
  border-bottom: 3px solid skyblue;
}
.inner-container::-webkit-scrollbar {
  display: none;
}
.inner-container {
  overflow-x: hidden;
  overflow-y: scroll;
}
.el-header .el-menu--horizontal > .el-menu-item {
  height: 53px;
  line-height: 53px;
}
.el-header .el-menu--horizontal > .el-submenu .el-submenu__title {
  height: 53px;
  line-height: 53px;
}
.el-main {
  padding: 10px;
}
// [class^="menuManager_"] {
//   display: none;
// }
</style>
