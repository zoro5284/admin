<template>
  <div class="layout">
    <header class="header">
      <div class="header-content">
        <div class="logo-icon"></div>
        <h1 class="logo-text">CYCLINX</h1>
        <el-dropdown class="user-menu" @command="handleCommand" v-if="userName">
          <span class="user-name">
            {{ userInfo.userName }}
            <el-icon><ArrowDown /></el-icon>
          </span>
          <template #dropdown>
            <el-dropdown-menu>
              <el-dropdown-item command="logout">退出登录</el-dropdown-item>
            </el-dropdown-menu>
          </template>
        </el-dropdown>
      </div>
    </header>

    <div class="layout-body">
      <el-aside width="200px" class="layout-aside">
        <Menu />
      </el-aside>

      <el-main class="layout-main">
        <Breadcrumb />
        <router-view />
      </el-main>
    </div>
  </div>
  <!-- <div class="layout">
    <div class="layout-body">
      <el-main class="layout-main">
        <Breadcrumb />
        <router-view />
      </el-main>
    </div>
  </div> -->
</template>

<script setup>
  import { ref, reactive } from 'vue'
  import { useRouter } from 'vue-router'
  import { ArrowDown } from '@element-plus/icons-vue'
  import Menu from './Menu.vue' // 引入菜单组件
  import Breadcrumb from './bread-crumb/Index.vue'
  import useApi from '@/api'

  const api = useApi()

  const router = useRouter()
  const userInfo = reactive({
    profilePhoto: '',
    userName: '',
    userId: '',
  })

  // 处理下拉菜单点击
  const handleCommand = async (command) => {
    if (command === 'logout') {
      await api.base.logout({}, { method: 'POST' })
      localStorage.removeItem('token')
      // 跳转到登录页
      router.push('/login')
    }
  }

  const init = async () => {
    const { profilePhoto, userName, userId } = (await api.base.getUserInfo()) ?? {}
    userInfo.profilePhoto = profilePhoto
    userInfo.userName = userName
    userInfo.userId = userId
  }
  init()
</script>

<style lang="scss" scoped>
  .layout {
    display: flex;
    flex-direction: column;
    height: 100vh;
  }

  /* Header部分 */
  .header {
    display: flex;
    align-items: center;
    justify-content: space-between; /* 左右对齐 */
    padding: 18px 40px;
    background: linear-gradient(90deg, #ffa500, #ffcc80);
    color: white;
    box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
  }

  .header-content {
    display: flex;
    align-items: center;
    width: 100%;
  }

  /* 用户名下拉菜单 */
  .user-menu {
    height: 50px;
    margin-left: auto;
    cursor: pointer;
    font-size: 1rem;
    display: flex;
    align-items: center;
  }

  .user-name {
    display: flex;
    align-items: center;
    font-weight: bold;
    margin-left: auto; /* 右侧对齐 */
    color: white;
    outline-style: none;
  }

  .user-name .el-icon {
    margin-left: 5px;
  }

  /* Logo图标 */
  .logo-icon {
    width: 40px;
    height: 40px;
    background: white;
    border-radius: 50%;
    margin-right: 20px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
  }

  .logo-text {
    font-size: 2rem;
    font-weight: bold;
    margin: 0;
    text-transform: uppercase;
    letter-spacing: 0.1em;
    text-align: left;
  }

  /* 主要布局 */
  .layout-body {
    display: flex;
    flex: 1;
    background-color: #f6f6f6;
  }

  .layout-aside {
    background-color: #fff;
    border-right: 1px solid #e0e0e0;
  }

  .layout-main {
    flex: 1;
    padding: 20px;
    background-color: #fff;
  }
</style>
