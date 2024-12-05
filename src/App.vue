<template>
  <router-view></router-view>
</template>

<script setup>
import Layout from '@/components/Layout.vue'
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
