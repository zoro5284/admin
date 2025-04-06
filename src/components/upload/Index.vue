<template>
  <div>
    <el-upload
      :class="{ 'no-more': isUploadDisabled }"
      multiple
      :auto-upload="false"
      :file-list="fileList"
      @update:file-list="updateFileList"
      list-type="picture"
      v-bind="config"
    >
      <el-icon v-if="config['list-type'] === 'picture-card'">
        <Plus />
      </el-icon>
      <el-button v-else size="small" type="primary">上传</el-button>
    </el-upload>
  </div>
</template>
<script setup>
  import { ref, computed } from 'vue'
  import useApi from '@/api'
  import { Plus } from '@element-plus/icons-vue'
  import { ElMessage } from 'element-plus'

  const api = useApi()

  const emits = defineEmits(['update:file-list'])
  const props = defineProps({
    config: {
      type: Object,
      default: () => ({}),
    },
    fileList: {
      type: Array,
      default: () => [],
    },
  })

  const isUploadDisabled = computed(() => {
    if (!props.config.limit) return false
    return props.fileList.length >= props.config.limit
  })

  const uploadFile = async (file) => {
    const formData = new FormData()
    formData.append('file', file)
    try {
      const ret = await api.utils.uploadFile(formData, {
        method: 'POST',
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      })
      return { url: ret.url }
    } catch (error) {
      ElMessage({
        message: '文件上传失败',
        type: 'error',
      })
      return {
        url: '',
        status: 'error',
      }
    }
  }

  const updateFileList = async (fileList) => {
    const promiseFileList = fileList.map((file) => {
      if (file.url.startsWith('http')) {
        return Promise.resolve(file)
      } else {
        return uploadFile(file.raw)
      }
    })
    const list = await Promise.all(promiseFileList)
    emits('update:file-list', list)
  }
</script>
<style lang="scss" scoped>
  .no-more {
    ::v-deep .el-upload--picture-card {
      display: none;
    }
  }
</style>
