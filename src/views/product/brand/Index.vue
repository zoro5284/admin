<template>
  <div class="brand-page">
    <el-card>
      <!-- <CommonSearch v-model:form="searchForm" :schema="searchSchema" @search="onSearch" /> -->
    </el-card>
    <div class="btns">
      <el-button class="btn" type="primary" @click="dialogVisible = true">新增</el-button>
      <el-button class="btn">新增</el-button>
    </div>
    <el-card>
      <Table
        :data="tableData"
        :config="{
          style: { 'min-height': '500px' },
        }"
        v-model:pageSize="paginationConfig.pageSize"
        v-model:currentPage="paginationConfig.currentPage"
        :total="paginationConfig.total"
      />
    </el-card>
    <el-dialog v-model="dialogVisible" width="500px">
      <div>
        <Form
          :schema="addSchema"
          v-model:form="addForm"
          @submit="onSubmit"
          @cancel="dialogVisible = false"
        />
      </div>
    </el-dialog>
  </div>
</template>
<script setup>
  import { ref, watchEffect, reactive, computed, onMounted } from 'vue'
  import { CommonSearch, Table, Form } from '@/components'

  // 搜索部分
  const searchSchema = [
    {
      label: '品牌名称',
      prop: 'key2',
      component: 'input',
      config: {
        placeholder: '请输入品牌名称',
      },
    },
    {
      label: '品牌状态',
      prop: 'key1',
      component: 'select',
      config: {
        placeholder: '请选择品牌状态',
        style: {
          width: '200px',
        },
      },
      options: [
        { value: '1', label: '启用' },
        { value: '2', label: '停用' },
      ],
    },
  ]

  const searchForm = ref({
    key1: '1',
    key2: '2',
  })

  const onSearch = (val) => {
    console.log('on-search', searchForm.value)
  }

  // 新增表单部分
  const addSchema = [
    // Input
    {
      prop: 'addKey1',
      label: 'Input',
      component: 'input',
      config: {
        //   type: 'textarea',
        placeholder: '这是一个input',
        style: {
          width: '200px',
        },
      },
    },
    // Radio
    {
      prop: 'addKey2',
      label: 'Radio',
      component: 'radio',
      options: [
        {
          value: '1',
          label: 'radio1',
        },
        {
          value: '2',
          label: 'radio2',
        },
      ],
    },
  ]

  const addForm = ref({
    addKey1: '1',
    addKey2: '2',
  })

  const dialogVisible = ref(false)

  // 表格部分
  const tableData = ref([])

  const paginationConfig = ref({
    pageSize: 10,
    currentPage: 1,
    total: 0,
  })

  watchEffect(() => {
    const { pageSize, currentPage } = paginationConfig.value
    console.log('get-list', pageSize, currentPage)
  })
</script>

<style lang="scss" scoped>
  .brand-page {
    .btns {
      margin-top: 28px;
      display: flex;
      justify-content: flex-end;
      .btn {
        min-width: 88px;
      }
    }
  }
</style>
