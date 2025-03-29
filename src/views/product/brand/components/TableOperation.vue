<template>
  <div>
    <el-button type="primary" link @click="$emit('edit')">编辑</el-button>
    <el-button type="primary" link @click="$emit('stop')">停用</el-button>
    <el-button type="primary" link @click="$emit('start')">启用</el-button>
    <el-button type="primary" link @click="$emit('detail')">系列</el-button>
    <el-button type="primary" link @click="$emit('delete')">删除</el-button>
  </div>
</template>
<script setup>
  defineEmits(['edit', 'stop', 'start', 'delete', 'detail'])
  defineProps({
    scope: {
      type: Object,
      default: () => ({}),
    },
  })
</script>
<style lang="less" scoped></style>
