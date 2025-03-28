<template>
  <div>
    <el-button type="primary" link @click="handleAction('delete')">删除</el-button>
  </div>
</template>
<script setup>
  const emit = defineEmits(['delete'])

  const handleAction = (type) => {
    switch (type) {
      case 'delete': {
        emit('delete')
      }
    }
  }
</script>
<style lang="less" scoped></style>
