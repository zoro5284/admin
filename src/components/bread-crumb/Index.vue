// Breadcrumb.vue
<template>
  <el-breadcrumb separator="/">
    <el-breadcrumb-item v-for="(item, index) in breadcrumbs" :key="index" :to="item.path">
      {{ item.title }}
    </el-breadcrumb-item>
  </el-breadcrumb>
</template>

<script setup>
  import { computed, watch } from 'vue'
  import { useRoute } from 'vue-router'

  const route = useRoute()

  const breadcrumbs = computed(() => {
    return route.matched
      .filter((r) => r.meta && r.meta.title)
      .map((r) => ({ path: r.path, title: r.meta.title }))
  })
</script>
