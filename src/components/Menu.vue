<template>
  <el-menu
    :default-active="route.path"
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
  import { useRoute } from 'vue-router'
  const route = useRoute()
  const menuConfig = [
    {
      title: '首页',
      index: '/home',
      icon: 'el-icon-home',
      children: [],
    },
    {
      title: '产品管理',
      index: '/product',
      icon: 'el-icon-discount',
      children: [
        {
          title: '品牌管理',
          index: '/product/brand',
        },
        {
          title: '类目管理',
          index: '/product/category',
        },
        {
          title: '型号管理',
          index: '/product/model',
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
