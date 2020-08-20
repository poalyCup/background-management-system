<template>
  <div class="login">
    <div class="login_box">
      <div class="avatar_box">
        <img src="../assets/logo.png" alt />
      </div>
      <el-form
        label-width="0px"
        class="login_form"
        :rules="rules"
        :model="formInfo"
        ref="loginFormRef"
      >
        <el-form-item prop="username">
          <el-input type="text" prefix-icon="el-icon-user-solid" v-model="formInfo.username"></el-input>
        </el-form-item>
        <el-form-item prop="password">
          <el-input type="password" prefix-icon="el-icon-s-cooperation" v-model="formInfo.password"></el-input>
        </el-form-item>
        <el-button class="form_button" type="info" @click="resetForm">reset</el-button>
        <el-button class="form_button" type="primary" @click="login">login</el-button>
      </el-form>
    </div>
  </div>
</template>

<script>
import { goLogin } from '../network/login.js'

export default {
  name: 'Login',
  data() {
    return {
      formInfo: {
        username: 'admin',
        password: '123456'
      },
      rules: {
        username: [
          { required: true, message: '请输入用户名称', trigger: 'blur' },
          { min: 3, max: 8, message: '长度在 3 到 8 个字符', trigger: 'blur' }
        ],
        password: [
          { required: true, message: '请输入密码', trigger: 'blur' },
          { min: 5, max: 12, message: '长度在 5 到 13 个字符', trigger: 'blur' }
        ],
      },
    }
  },
  methods: {
    resetForm () {
      this.$refs.loginFormRef.resetFields()
    },
    login () {
      this.$refs.loginFormRef.validate(valid => {
        if (!valid) return console.log('登录失败！')
        goLogin(this.formInfo).then(res => {
          if (res.meta.status !== 200) return this.$message({ message: '登录失败！', type: 'error' })
          this.$message({
            message: '登录成功！',
            type: 'success'
          })
          window.sessionStorage.setItem('token', res.data.token)
          this.$router.push('/home')
        })
      })
    }
  }
}
</script>

<style lang="less" scoped>
.login {
  width: 100%;
  height: 100%;
  background-color: #20367d;
  display: flex;
  justify-content: center;
  align-items: center;
}
.login_box {
  width: 400px;
  height: 350px;
  background-color: #fff;

  .avatar_box {
    width: 120px;
    height: 120px;
    border-radius: 50%;
    padding: 8px;
    box-shadow: 0 0 10px #ddd;
    margin: 0 auto;
    transform: translateY(-50%);
    background-color: #fff;
    img {
      width: 100%;
      border-radius: 50%;
    }
  }
}
.login_form {
  padding: 0 25px;
  .form_button {
    float: right;
    margin-left: 10px;
  }
}
</style>
