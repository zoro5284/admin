<template>
  <ElIcon class="el-icon" :style="{ background: Icon.background }">
    <slot>
      <component :is="Icon.component" />
    </slot>
  </ElIcon>
</template>
<script setup>
  import { ref, reactive, computed, onMounted } from 'vue'
  import { Edit, Delete } from '@element-plus/icons-vue'

  const props = defineProps({
    type: {
      type: String,
      default: 'delete',
    },
  })

  const iconMap = {
    delete: {
      background: '#f56c6c',
      component: Delete,
    },
    edit: {
      background: '#407aFF',
      component: Edit,
    },
  }

  const Icon = computed(() => iconMap[props.type])
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
