<template>
  <div class="home-page">this is home page</div>
  <Form />
  <!-- <Upload /> -->

  <!-- <Editor v-model="content" />
  <div class="content" v-html="content"></div> -->
</template>
<script setup>
import { ref } from 'vue'
import Form from '@/components/form/Index.vue'
import Editor from '@/components/editor/Index.vue'
import Upload from '@/components/upload/Index.vue'

const content = ref('<p>你好</p>')
</script>
<style lang="scss" scoped>
.content {
  width: 414px;
  overflow: hidden;
  word-break: break-all;
}
</style>
