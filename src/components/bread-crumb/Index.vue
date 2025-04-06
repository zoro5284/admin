// Breadcrumb.vue
<template>
  <el-breadcrumb class="breadcrumb" separator="/" v-if="breadcrumbs.length">
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
    const [a, b] = route.matched
    console.log(b)

    if (b?.name === 'Home') return []
    return route.matched
      .filter((r) => r.meta && r.meta.title)
      .map((r) => ({ path: r.path, title: r.meta.title }))
  })
</script>
<style lang="scss" scoped>
  .breadcrumb {
    height: 40px;
    line-height: 40px;
  }
</style>
