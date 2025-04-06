<template>
  <div class="selling-points__wrapper">
    <el-input
      v-for="(point, index) in sellingPoints"
      placeholder="请输入"
      style="width: 200px; margin-left: 8px"
      clearable
      :key="index"
      v-model="point"
    />
    <CircleIcon type="plus" @click="handleAdd" v-if="isAddVisible" />
  </div>
</template>
<script setup>
  import { CircleIcon } from '@/components'
  const props = defineProps({
    limit: {
      type: Number,
      default: 3,
    },
  })
  const sellingPoints = defineModel({ type: Array, default: () => [] })

  const handleAdd = () => {
    sellingPoints.value.push('')
  }

  const isAddVisible = computed(() => {
    return sellingPoints.value.length >= props.limit
  })
</script>
<style lang="scss" scoped>
  .selling-points__wrapper {
    display: flex;
    align-items: center;
  }
</style>
