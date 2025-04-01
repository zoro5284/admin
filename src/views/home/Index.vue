<template>
  <Unit1 />
  <!-- <ImageMarkder :url="testPng" v-model:position="position" /> -->
  <!-- <div class="home-page">BTN</div> -->

  <!-- <Table :data="tableData" :columns="tableColumns" /> -->
  <!-- <Form v-model:form="formObj" :schema="schema" /> -->
  <!-- <Upload /> -->

  <!-- <Editor v-model="content" /> -->
  <!-- <div class="content" v-html="content"></div> -->
</template>
<script setup>
  import { ref, watch } from 'vue'
  import Form from '@/components/form'
  import Editor from '@/components/editor'
  import Upload from '@/components/upload'
  import Table from '@/components/table'
  import { mockData as tableData, mockCols as tableColumns } from '@/mock/table'
  import ImageMarkder from '@/components/image-marker'
  import testPng from '@/assets/img/test.png'
  import schema from '@/components/form/schema'
  import ColorSet from '@/unit/ColorSet.vue'

  const position = ref([50, 50])
  watch(position, (val) => {
    console.log('position', val)
  })

  const formObj = ref({
    custom: 'a',
    input: 'input',
    radio: '1',
    checkbox: [],
    datepicker: '2025-01-02',
    select: [],
    upload: [],
  })
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
