<template>
  <div class="homepage-hero-module">
    <div class="video-container">
      <div :style="fixStyle" class="filter"></div>
      <video :style="fixStyle" autoplay loop class="fillWidth" v-on:canplay="canplay">
        <source src="../source/video/login.mp4" type="video/mp4">浏览器不支持 video 标签，建议升级浏览器。
      </video>
      <div class="poster hidden" v-if="!vedioCanPlay">
        <img :style="fixStyle" src="../source/images/bgimg.png" alt>
      </div>
    </div>
    <div
      :style="contentStyle"
      v-loading="isloading"
      element-loading-body="true"
      element-loading-text="正在为您创建系统账套"
      element-loading-spinner="el-icon-loading"
      v-loading.fullscreen.lock="isloading"
      element-loading-background="rgba(0, 0, 0, 0.8)"
    >
      <div :style="contentHeaderStylelogo">
        <img style="width:180px" src="../source/images/login.png" alt>
        <!-- <span>没有账号？</span>
        <el-button @click="jumpRegist">注册试用</el-button>-->
      </div>
      <!-- <div v-if="vueFlag" :style="contentHeaderStyle">
        <span>没有账号？</span>
        <el-button @click="jumpRegist">注册试用</el-button>
      </div>
      <div v-else :style="contentHeaderStyle">
        <span>已有账号？</span>
        <el-button @click="jumpRegist">登录</el-button>
      </div>-->

      <div :style="contentBodyStyle">
        <el-tabs v-model="activeName" @tab-click="handleClick">
          <el-tab-pane :label="vueTitle" name="first">
            <!-- <login_in/> -->
            <prince :is="vueView"></prince>
          </el-tab-pane>
        </el-tabs>
      </div>
    </div>
  </div>
</template>

<script>
import login_in from "./loginInner/in";
import reg from "./loginInner/reg";
import info from "./loginInner/info";
export default {
  name: "login",
  data() {
    return {
      vedioCanPlay: false,
      fixStyle: "",
      vueView: "login_in",
      vueFlag: true,
      vueTitle: "登录",
      isloading: false,
      videoSrc: "src/source/login.mp4",
      contentStyle: {
        position: "absolute",
        top: "0",
        left: "0",
        "z-index": "1",
        width: "100%",
        height: "100%"
      },
      contentBodyStyle: {
        position: "absolute",
        top: "50%",
        left: "50%",
        "z-index": "1",
        transform: "translate(-50%,-50%)"
      },
      contentHeaderStyle: {
        position: "absolute",
        top: "20px",
        right: "100px",
        color: "#fff"
      },
      contentHeaderStylelogo: {
        position: "absolute",
        top: "20px",
        left: "50px",
        color: "#fff"
      },
      activeName: "first"
    };
  },
  watch: {
    changeIsloading(val) {
      this.isloading = val;
      // console.log(val)
    },
    changevueTitle(val) {
      console.log("chufa3");
      this.vueTitle = val;
      this.vueView = this.$store.state.vueView;
    }
  },
  computed: {
    changeIsloading() {
      return this.$store.state.isloading;
    },
    changevueTitle() {
      console.log("chufa2");
      return this.$store.state.vueTitle;
    }
  },
  components: {
    login_in,
    reg,
    info
  },
  methods: {
    canplay() {
      this.vedioCanPlay = true;
    },
    handleClick(tab, event) {
      console.log(tab, event);
    },
    jumpRegist() {
      this.vueFlag = !this.vueFlag;
      if (this.vueFlag) {
        // this.vueTitle = "登录"
        // this.vueView = "login_in"
        localStorage.vueTitle = "登录";
        localStorage.vueView = "login_in";
        this.$store.commit("changevueTitle");
      } else {
        // this.vueTitle = "注册"
        // this.vueView = "reg"
        localStorage.vueTitle = "注册";
        localStorage.vueView = "reg";
        this.$store.commit("changevueTitle");
      }
      // this.router.push({
      //   path: "/regist"
      // });
    }
  },
  mounted: function() {
    window.onresize = () => {
      const windowWidth = document.body.clientWidth;
      const windowHeight = document.body.clientHeight;
      const windowAspectRatio = windowHeight / windowWidth;
      let videoWidth;
      let videoHeight;
      if (windowAspectRatio < 0.5625) {
        videoWidth = windowWidth;
        videoHeight = videoWidth * 0.5625;
        this.fixStyle = {
          height: windowWidth * 0.5625 + "px",
          width: windowWidth + "px",
          "margin-bottom": (windowHeight - videoHeight) / 2 + "px",
          "margin-left": "initial"
        };
      } else {
        videoHeight = windowHeight;
        videoWidth = videoHeight / 0.5625;
        this.fixStyle = {
          height: windowHeight + "px",
          width: windowHeight / 0.5625 + "px",
          "margin-left": (windowWidth - videoWidth) / 2 + "px",
          "margin-bottom": "initial"
        };
      }
    };
    window.onresize();
  }
};
</script>

<style scoped>
.homepage-hero-module,
.video-container {
  position: relative;
  height: 100vh;
  overflow: hidden;
}

.video-container .poster img,
.video-container video {
  z-index: 0;
  position: absolute;
}

.video-container .filter {
  z-index: 1;
  position: absolute;
  background: rgba(0, 0, 0, 0.4);
}
</style>
