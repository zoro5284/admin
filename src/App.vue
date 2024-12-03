<template>
  <el-header class="main-header">this is a header</el-header>
  <el-container class="menu-aside">
    <el-aside width="200px">
      <Menu />
    </el-aside>
    <div class="main-container">
      <RouterView />
    </div>
  </el-container>
</template>

<script setup>
import Menu from '@/components/Menu.vue'
const handleOpen = () => {}
const handleClose = () => {}
</script>
<style lang="scss" scoped>
.main-header {
  height: 100px;
}
.menu-aside {
  height: calc(100vh - 100px);
}
</style>
