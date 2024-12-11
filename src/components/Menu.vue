<template>
  <el-menu
    default-active="/"
    class="el-menu-vertical-demo"
    background-color="#ffffff"
    text-color="#333"
    active-text-color="#ff9e00"
    :router="true"
  >
    <template v-for="item in menuConfig">
      <el-menu-item v-if="!item.children || item.children.length === 0" :index="item.index">
        <i :class="item.icon"></i>
        <span>{{ item.title }}</span>
      </el-menu-item>
      <el-sub-menu v-else :index="item.index">
        <template #title>
          <i :class="item.icon"></i>
          <span>{{ item.title }}</span>
        </template>
        <el-menu-item v-for="subItem in item.children" :key="subItem.index" :index="subItem.index">
          <span>{{ subItem.title }}</span>
        </el-menu-item>
      </el-sub-menu>
    </template>
  </el-menu>
</template>

<script setup>
const menuConfig = [
  {
    title: '首页',
    index: '/',
    icon: 'el-icon-home',
    children: [],
  },
  {
    title: '用户管理',
    index: '/users',
    icon: 'el-icon-user',
    children: [],
  },
  {
    title: '系统设置',
    index: '/settings',
    icon: 'el-icon-setting',
    children: [
      {
        title: '权限设置',
        index: '/settings/permissions',
        children: [],
      },
      {
        title: '角色设置',
        index: '/settings/roles',
        children: [],
      },
    ],
  },
]
</script>

<style lang="scss" scoped>
.el-menu-vertical-demo {
  border-right: none;
}
</style>
