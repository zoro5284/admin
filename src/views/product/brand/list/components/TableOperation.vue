<template>
  <div>
    <el-button type="primary" link @click="$emit('edit')">编辑</el-button>
    <el-button type="primary" v-if="isShowStop" link @click="$emit('stop')">停用</el-button>
    <el-button type="primary" v-if="isShowStart" link @click="$emit('start')">启用</el-button>
    <el-button type="primary" link @click="$emit('detail')">系列</el-button>
    <el-button type="primary" link @click="$emit('delete')">删除</el-button>
  </div>
</template>
<script setup>
  import { computed } from 'vue'

  defineEmits(['edit', 'stop', 'start', 'delete', 'detail'])
  const props = defineProps({
    state: {
      type: Number,
      default: -1,
    },
  })

  const isShowStart = computed(() => props.state === 2)
  const isShowStop = computed(() => props.state === 0)
</script>
<style lang="scss" scoped></style>
