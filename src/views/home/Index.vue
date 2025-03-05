<template>
  <div class="home-page">this is home page</div>
  <Table :data="tableData" :columns="tableColumns" />
  <!-- <Form /> -->
  <!-- <Upload /> -->

  <!-- <Editor v-model="content" />
  <div class="content" v-html="content"></div> -->
</template>
<script setup>
  import { ref } from 'vue'
  import Form from '@/components/form'
  import Editor from '@/components/editor'
  import Upload from '@/components/upload'
  import Table from '@/components/table'
  import { mockData as tableData, mockCols as tableColumns } from '@/mock/table'

  const content = ref('<p>你好</p>')
</script>
<style lang="scss" scoped>
  .content {
    width: 414px;
    overflow: hidden;
    word-break: break-all;
  }
</style>
