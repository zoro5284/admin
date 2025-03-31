<template>
  <ElIcon class="el-icon" :style="{ background }">
    <slot />
  </ElIcon>
</template>
<script setup>
  import { ref, reactive, computed, onMounted } from 'vue'

  const props = defineProps({
    background: {
      type: String,
      default: 'red',
    },
  })
</script>

<style lang="scss" scoped>
  .el-icon {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 28px;
    height: 28px;
    border-radius: 100%;
    color: #fff;
    cursor: pointer;
  }
</style>
