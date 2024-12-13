<template>
  <div class="login-page">
    <div class="brand-name">Cyclinx</div>
    <div class="login-box">
      <h2>登录</h2>
      <el-form :model="form" ref="loginForm">
        <el-form-item label="账号" prop="username">
          <el-input v-model="form.username" placeholder="请输入账号" />
        </el-form-item>
        <el-form-item label="密码" prop="password">
          <el-input v-model="form.password" type="password" placeholder="请输入密码" />
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="onLogin">登录</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import useApi from '@/api'

const api = useApi()
const router = useRouter()

const form = ref({
  username: '',
  password: '',
})

const onLogin = async () => {
  console.log('登录', form.value)
  await api.base.login(form.value)
  router.push('/home')
}
</script>

<style scoped>
.login-page {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background: linear-gradient(135deg, #ffcc80, #ff8a00);
  color: #fff;
  font-family: Arial, sans-serif;
  position: relative;
  overflow: hidden;
}

.brand-name {
  position: absolute;
  top: 50px;
  left: 50%;
  transform: translateX(-50%);
  font-size: 48px;
  font-weight: bold;
  letter-spacing: 2px;
  text-shadow: 2px 2px 8px rgba(0, 0, 0, 0.3);
}

.login-box {
  background: rgba(255, 255, 255, 0.9);
  border-radius: 8px;
  padding: 24px 32px;
  width: 360px;
  box-shadow: 0px 4px 20px rgba(0, 0, 0, 0.2);
  text-align: center;
  color: #333;
}

.login-box h2 {
  margin-bottom: 16px;
  color: #333;
}

.el-form-item {
  margin-bottom: 20px;
}

.el-button {
  width: 100%;
  background-color: #ff8a00;
  border-color: #ff8a00;
}

.el-button:hover {
  background-color: #ff9a33;
  border-color: #ff9a33;
}
</style>
