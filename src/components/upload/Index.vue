<template>
  <div>
    <el-upload
      :auto-upload="false"
      :file-list="fileList"
      @update:file-list="uploadFileList"
      list-type="picture"
      v-bind="config"
    >
      <el-button size="small" type="primary">上传</el-button>
    </el-upload>
  </div>
</template>
<script setup>
  import { ref } from 'vue'
  import useApi from '@/api'

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

  const uploadFile = async (file) => {
    const formData = new FormData()
    formData.append('file', file)
    const ret = await api.utils.uploadFile(formData, {
      method: 'POST',
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    })
    return { url: ret.url }
  }

  const uploadFileList = async (fileList) => {
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
<style lang="scss" scoped></style>
