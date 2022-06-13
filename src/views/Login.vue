<template>
  <el-form ref="form" label-width="70px" :inline="true" class="login-container" :model="form" :rules="rules">
    <h3 class="login-title">系统登录</h3>
    <el-form-item label="用户名" prop="username">
      <el-input v-model="form.username" placeholder="请输入账号"></el-input>
    </el-form-item>
    <el-form-item label="密码" prop="password">
      <el-input type="password" v-model="form.password" placeholder="请输入密码"></el-input>
    </el-form-item>
    <el-form-item>
      <el-button type="primary" style="margin-left: 105px" @click="submit">登录</el-button>
    </el-form-item>
  </el-form>
</template>

<script>
import Cookie from "js-cookie";
import { getMenu } from "../api";

export default {
  data() {
    return {
      form: {
        username: "admin",
        password: "admin",
      },
      rules: {
        username: [{ required: true, trigger: "blur", message: "请输入用户名" }],
        password: [{ required: true, trigger: "blur", message: "请输入密码" }],
      },
    };
  },
  methods: {
    submit() {
      // const token = Mock.Random.guid();
      // Cookie.set("token", token);
      this.$refs.form.validate((valid) => {
        if (valid) {
          getMenu(this.form).then(({ data }) => {
            if (data.code === 20000) {
              Cookie.set("token", data.data.token);
              // 获取菜单数据
              this.$store.commit("SET_MENU", data.data.menu);
              // 添加路由
              this.$store.commit("ADD_MENU", this.$router);
              this.$router.push("/home");
            } else {
              this.$message.error(data.data.message);
            }
          });
        }
      });
    },
  },
};
</script>

<style lang="less" scoped>
.login-container {
  border-radius: 15px;
  background-clip: padding-box;
  margin: 180px auto;
  width: 350px;
  padding: 35px 35px 15px 35px;
  background-color: #fff;
  border: 1px solid #eaeaea;
  box-shadow: 0 0 25px #cac6c6;
  box-sizing: border-box;
  .login-title {
    margin-bottom: 40px;
    text-align: center;
    color: #505458;
  }
  .el-input {
    width: 190px;
  }
}
</style>
