<template>
  <div class="outDiv">
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
    <el-button type="primary" @click="onSubmit">登录</el-button>
  </div>
</template>

<script>
export default {
  data() {
    return {
      phone: "",
      password: "",
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
    showNotify(title, content, clickFun, type) {
      // const h = this.$createElement;
      this.$notify({
        title: title,
        message: content,
        dangerouslyUseHTMLString: true,
        duration: 0,
        onClick: clickFun,
        type: type
      });
    },
    onSubmit() {
      var that = this;
      var data = {};
      if (this.phone.trim() == "") {
        that.showAlert("手机号不能为空", "warning");
        return;
      }
      if (!/^1[34578]\d{9}$/.test(this.phone.trim())) {
        that.showAlert("请使用手机号登录", "warning");
        return;
      }
      if (this.password.trim() == "") {
        that.showAlert("密码不能为空", "warning");
        return;
      }
      data.phone = this.phone.trim();
      data.password = this.md5(this.password).trim();
      this.axios
        .get(this.commin.comUrl.login.login, {
          params: data
        })
        .then(function(data) {
          var data = data.data;
          console.log(data);
          if (data.code == 0) {
            console.log(data);
            var isfukuan = data.data.isfukuan;
            if (isfukuan == 1) {
              var zhucetime = data.data.zhucetime;
              var endtime = that.timeUtil.addDate(zhucetime, 7, 0, 0);
              var nowtime = that.timeUtil.shifenmiaotime(new Date());
              console.log(endtime);
              console.log(nowtime);
              if (endtime < nowtime) {
                if (data.data.leftnav == 1) {
                  that.showNotify(
                    "提示",
                    "您公司系统的试用时间已经结束，点击此消息进入购买页面",
                    function() {
                      console.log("购买");
                    },
                    "warning"
                  );
                } else {
                  that.showNotify(
                    "提示",
                    "您公司系统的试用时间已经结束，请尽快联系老板点击此消息进入购买页面",
                    function() {
                      console.log("购买");
                    },
                    "warning"
                  );
                }
                return;
              } else {
                if (data.data.leftnav == 1) {
                  that.showNotify(
                    "提示",
                    "您公司系统的试用时间将于" +
                      endtime +
                      "结束，点击此消息进入购买页面",
                    function() {
                      console.log("购买");
                    },
                    ""
                  );
                }
              }
            }else if(isfukuan == 2){
              var fukuantime = data.data.fukuantime;
              var endtime = that.timeUtil.addDate(fukuantime, 365, 0, 0);
              var nowtime = that.timeUtil.shifenmiaotime(new Date());
              console.log(endtime);
              console.log(nowtime);
              if (endtime < nowtime) {
                if (data.data.leftnav == 1) {
                  that.showNotify(
                    "提示",
                    "您公司系统的使用时间已经结束，点击此消息进入购买页面",
                    function() {
                      console.log("购买");
                    },
                    "warning"
                  );
                } else {
                  that.showNotify(
                    "提示",
                    "您公司系统的使用时间已经结束，请尽快联系老板点击此消息进入购买页面",
                    function() {
                      console.log("购买");
                    },
                    "warning"
                  );
                }
                return;
              } else {
                if (data.data.leftnav == 1) {
                  that.showNotify(
                    "提示",
                    "您公司系统的使用时间将于" +
                      endtime +
                      "结束，点击此消息进入购买页面",
                    function() {
                      console.log("购买");
                    },
                    ""
                  );
                }
              }
            }
            localStorage.user = JSON.stringify(data.data);
            var exp = new Date();
            var Days = 1000;
            exp.setTime(exp.getTime() + Days * 24 * 60 * 60 * 1000);
            document.cookie =
              "username = " +
              escape(data.data.uid) +
              ";expires=" +
              exp.toGMTString() +
              ";path=/" +
              localStorage.projectPath;
            that.showAlert("登录成功", "success");
            that.router.push({
              path: "/index"
            });
          } else if (data.code == "1") {
            that.showAlert("您输入的账号没有注册", "warning");
          } else if (data.code == "2") {
            that.showAlert("您的密码错误", "error");
          } else if (data.code == 3) {
            that.showAlert("请使用电脑登录", "warning");
          } else if (data.code == 4) {
            that.showAlert("请使用公司电脑登录", "warning");
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


