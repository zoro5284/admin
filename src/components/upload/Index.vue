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

const uploadFileList = (v) => {
  console.log('upload', v)
  emits('update:file-list', v)
}
</script>
<style lang="scss" scoped></style>
