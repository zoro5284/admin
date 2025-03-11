<template>
  <div class="layout">
    <!-- Header -->
    <!-- <header class="header">
      <div class="header-content">
        <div class="logo-icon"></div>
        <h1 class="logo-text">CYCLINX</h1>
      </div>
    </header> -->

    <!-- Main container -->
    <div class="layout-body">
      <!-- Aside (Sidebar Menu) -->
      <!-- <el-aside width="200px" class="layout-aside">
        <Menu />
      </el-aside> -->

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

<style lang="scss" scoped>
  .layout {
    display: flex;
    flex-direction: column;
    height: 100vh;
  }

  /* Header部分 */
  .header {
    padding: 20px 40px; /* 左右留白 */
    background: linear-gradient(90deg, #ffa500, #ffcc80); /* 橘色渐变 */
    color: white;
    box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
  }

  .header-content {
    display: flex;
    align-items: center;
  }

  /* Logo图标 */
  .logo-icon {
    width: 40px;
    height: 40px;
    background: white; /* 占位颜色，可换为 logo 图片 */
    border-radius: 50%; /* 圆形 logo */
    margin-right: 20px; /* 与文字保持间距 */
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
  }

  /* CYCLINX文字 */
  .logo-text {
    font-size: 2.5rem;
    font-weight: bold;
    margin: 0;
    text-transform: uppercase;
    letter-spacing: 0.1em;
    flex-grow: 1;
    text-align: left; /* 文字靠左对齐 */
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
