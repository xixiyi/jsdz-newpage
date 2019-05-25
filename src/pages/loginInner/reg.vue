<template>
  <div class="outDiv">
    <el-input placeholder="请输入用户名" :value="username" @input="inputusernameFun"></el-input>
    <el-input placeholder="请输入手机号" :value="phone" @input="inputphoneFun"></el-input>
    <el-input
      v-if="visible"
      :value="password"
      type="password"
      placeholder="请输入密码"
      @input="inputpasswordFun"
    >
      <i
        slot="suffix"
        title="显示密码"
        @click="changePass"
        style="cursor:pointer;"
        class="el-input__icon iconfont icon-xianshi"
      ></i>
    </el-input>
    <el-input v-else type="text" :value="password" @input="inputpasswordFun" placeholder="请输入密码">
      <i
        slot="suffix"
        title="隐藏密码"
        @click="changePass"
        style="cursor:pointer;"
        class="el-input__icon iconfont icon-yincang"
      ></i>
    </el-input>
    <el-button type="primary" @click="onSubmit">注册</el-button>
  </div>
</template>

<script>
export default {
  data() {
    return {
      phone: "",
      password: "",
      username: "",
      visible: true
    };
  },
  created() {
    var that = this;
    document.onkeydown = function(e) {
      var key = window.event.keyCode;
      if (key == 13) {
        that.onSubmit();
      }
    };
  },
  methods: {
    inputusernameFun(e) {
      this.username = e;
    },
    inputphoneFun(e) {
      this.phone = e;
    },
    inputpasswordFun(e) {
      this.password = e;
    },
    changePass(value) {
      this.visible = !this.visible;
    },
    showAlert(msg, type) {
      this.$message({
        showClose: true,
        message: msg,
        type: type
      });
    },
    onSubmit() {
      var that = this;

      var data = {};
      if (this.username.trim() == "") {
        that.showAlert("用户名不能为空", "warning");
        return;
      }
      if (this.phone.trim() == "") {
        that.showAlert("手机号不能为空", "warning");
        return;
      }
      if (!/^1[34578]\d{9}$/.test(this.phone.trim())) {
        that.showAlert("请使用手机号注册", "warning");
        return;
      }
      if (this.password.trim() == "") {
        that.showAlert("密码不能为空", "warning");
        return;
      }
      data.username = this.username.trim();
      data.phone = this.phone.trim();
      data.password = this.md5(this.password.trim());
      this.axios.defaults.headers.post["Content-Type"] =
        "application/x-www-form-urlencoded";
      this.axios
        .get(this.commin.comUrl.login.regist, {
          params: data
        })
        .then(function(data) {
          var data = data.data;
          if (data.code == "0") {
            // that.router.push({
            //   path: "/updateUserinfo?uid=" + data.data.uid
            // });
            localStorage.uid = data.data.uid;
            localStorage.vueTitle = "完善公司信息"
            localStorage.vueView = "info"
            console.log(localStorage)
            that.$store.commit("changevueTitle");
          } else if (data.code == "1") {
            that.showAlert("该手机号已经注册过了，请去登录", "warning");
          }
        })
        .catch(function(error) {});
    }
  }
};
</script>



<style lang="sass" scoped>
@import '../../css/fontFace.css';

</style>
<style >
.outDiv {
  width: 250px;
}
.outDiv input {
  width: 250px;
  margin-bottom: 15px;
}
.outDiv button {
  width: 100%;
}
.el-input__suffix {
  height: auto;
}
</style>


