<template>
  <div class="layout">
    <!-- Header -->
    <el-header class="layout-header">
      <div class="brand">Cyclinx</div>
    </el-header>

    <!-- Main container -->
    <div class="layout-body">
      <!-- Aside (Sidebar Menu) -->
      <el-aside width="200px" class="layout-aside">
        <Menu />
      </el-aside>

      <!-- Main content area (Router View) -->
      <el-main class="layout-main">
        <router-view />
      </el-main>
    </div>
  </div>
</template>

<script setup>
import Menu from './Menu.vue' // 引入菜单组件
</script>

<style scoped>
.layout {
  display: flex;
  flex-direction: column;
  height: 100vh;
}

.layout-header {
  background-color: #ff9e00; /* 淡橘色 */
  padding: 10px 20px;
  text-align: center;
  font-size: 24px;
  font-weight: bold;
  color: white;
}

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
