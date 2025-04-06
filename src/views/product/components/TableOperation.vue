<template>
  <div>
    <el-button type="primary" link @click="$emit('edit')">编辑</el-button>
    <el-button type="primary" v-if="isShowStop" link @click="$emit('stop')">停用</el-button>
    <el-button type="primary" v-if="isShowStart" link @click="$emit('start')">启用</el-button>
    <el-button type="primary" v-if="showSeries" link @click="$emit('detail')">系列</el-button>
    <el-button type="primary" link @click="handleDelete">删除</el-button>
  </div>
</template>
<script setup>
  import { ElMessage, ElMessageBox } from 'element-plus'
  import { computed } from 'vue'

  const emit = defineEmits(['edit', 'stop', 'start', 'delete', 'detail'])
  const props = defineProps({
    state: {
      type: Number,
      default: -1,
    },
    showSeries: {
      type: Boolean,
      default: false,
    },
  })

  const isShowStart = computed(() => props.state === 2)
  const isShowStop = computed(() => props.state === 0)

  const handleDelete = async () => {
    try {
      await ElMessageBox.confirm('是否确认删除?', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
      })
      emit('delete')
    } catch (error) {
      ElMessage({
        message: '取消删除',
      })
    }
  }
</script>
<style lang="scss" scoped></style>
