<template>
  <div class="outDiv">
    <el-input placeholder="请输入公司名称" :value="company" @input="inputcompanyFun"></el-input>
    <el-input placeholder="请输入你的姓名" :value="name" @input="inputnameFun"></el-input>
    <el-input placeholder="请输入你的邮箱" :value="email" @input="inputemailFun"></el-input>
    <el-button type="primary" @click="onSubmit">开始使用</el-button>
  </div>
</template>

<script>
export default {
  data() {
    return {
      company: "",
      name: "",
      email: "",
      uid: "",
      isloading: false
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
  mounted() {
    this.uid = localStorage.uid;
    this.count = this.$store.state.count;
  },
  methods: {
    inputcompanyFun(e) {
      this.company = e;
    },
    inputnameFun(e) {
      this.name = e;
    },
    inputemailFun(e) {
      this.email = e;
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
      if (this.company.trim() == "") {
        that.showAlert("公司名不能为空", "warning");
        return;
      }

      if (this.name.trim() == "") {
        that.showAlert("姓名不能为空", "warning");
        return;
      }
      if (this.email.trim() == "") {
        that.showAlert("邮箱不能为空", "warning");
        return;
      }
      if (
        !/^[a-zA-Z0-9_-]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/g.test(
          this.email.trim()
        )
      ) {
        that.showAlert("请填写正确的email", "warning");
        return;
      }
      // that.isloading = true
      that.$store.commit("changeIsloading");
      data.company = this.company.trim();
      data.name = this.name.trim();
      data.email = this.email.trim();
      data.uid = this.uid;
      this.axios
        .get(this.commin.comUrl.login.update_userinfo, {
          params: data
        })
        .then(function(data) {
          console.log(data);
          // that.isloading = false
          that.$store.commit("changeIsloading");
          localStorage.user = JSON.stringify(data.data.data);
          that.$store.commit("user");
          that.router.push({
            path: "/index"
          });
        })
        .catch(function(error) {
          // that.isloading = false
          that.$store.commit("changeIsloading");
        });
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


