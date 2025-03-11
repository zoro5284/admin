<template>
  <ImageMarkder :url="testPng" :default-position="[50, 50]" />
  <!-- <div class="home-page">BTN</div> -->

  <!-- <Table :data="tableData" :columns="tableColumns" /> -->
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
  import ImageMarkder from '@/components/image-marker'
  import testPng from '@/assets/img/test.png'
</script>
<style lang="scss" scoped>
  .content {
    width: 414px;
    overflow: hidden;
    word-break: break-all;
  }
  .img {
    width: 310px;
    scale: 0.5;
  }
  .img2-wrapper {
    position: relative;
  }
  .point {
    position: absolute;
    width: 4px;
    height: 4px;
    border-radius: 50%;
    transform: translate(-50%, -50%);
    background: #fff;
  }
</style>
