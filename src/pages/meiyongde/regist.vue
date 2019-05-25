<template>
  <div class="homepage-hero-module">
    <div class="video-container">
      <div :style="fixStyle" class="filter"></div>
      <video muted :style="fixStyle" autoplay loop class="fillWidth" v-on:canplay="canplay">
        <source
          src="https://www.ligeflag.com/ligeflagupload/pcuser1xiaoguosucai/20190329115006881405.mp4"
          type="video/mp4"
        >浏览器不支持 video 标签，建议升级浏览器。
      </video>
      <div class="poster hidden" v-if="!vedioCanPlay">
        <img :style="fixStyle" src="https://www.ligeflag.com/images/loginBg.png" alt>
      </div>
    </div>
    <div :style="contentStyle">
      <div :style="contentHeaderStyle">
        <span>已有账号？</span>
        <el-button @click="jumpLogin">登录</el-button>
      </div>
      <div :style="contentBodyStyle">
        <el-tabs v-model="activeName" @tab-click="handleClick">
          <el-tab-pane label="注册" name="first">
            <reg />
          </el-tab-pane>
        </el-tabs>
      </div>
    </div>
  </div>
</template>

<script>
import reg from "./reg";
export default {
  name: "regist",
  data() {
    return {
      vedioCanPlay: false,
      fixStyle: "",
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
      activeName: "first"
    };
  },
  components: {
    reg
  },
  methods: {
    canplay() {
      this.vedioCanPlay = true;
    },
    handleClick(tab, event) {
      console.log(tab, event);
    },
    jumpLogin() {
      this.router.push({
        path: "/login"
      });
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
