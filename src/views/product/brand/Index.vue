<template>
  <div class="brand-page">
    <el-card>
      <!-- <CommonSearch v-model:form="searchForm" :schema="searchSchema" @search="onSearch" /> -->
    </el-card>
    <div class="table-top">
      <span class="title">TITLE</span>
      <el-button class="btn1 btn" type="primary" @click="dialogVisible = true">新增</el-button>
      <el-button class="btn">批量删除</el-button>
    </div>
    <el-card>
      <Table
        :data="tableData"
        :columns="columns"
        :config="{
          style: { 'min-height': '500px' },
        }"
        v-model:pageSize="paginationConfig.pageSize"
        v-model:currentPage="paginationConfig.currentPage"
        :total="paginationConfig.total"
        @selection-change="onSelectionChange"
        selectable
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
  import { ref, watchEffect, reactive, computed, onMounted, h } from 'vue'
  import { CommonSearch, Table, Form } from '@/components'
  import TableOperation from './components/TableOperation.vue'

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
  const tableData = ref([
    {
      id: 1,
      name: 'jzy',
      age: 30,
      test: '测试row',
    },
    {
      id: 2,
      name: 'jzy',
      age: 30,
      test: '测试row',
    },
  ])
  const columns = [
    {
      prop: 'id',
      label: 'ID',
    },
    {
      prop: 'name',
      label: '姓名',
      formatter: (val) => {
        return 'hello ' + val
      },
    },
    {
      prop: 'age',
      label: '年龄',
    },
    {
      prop: 'test',
      label: '测试',
    },
    {
      label: '操作',
      columnRenderFn: ({ column, row }) => {
        return h(TableOperation, {
          onDelete: () => {
            console.log('row-info', row)
            console.log('this is delete action')
          },
        })
      },
    },
  ]

  const paginationConfig = ref({
    pageSize: 10,
    currentPage: 1,
    total: 0,
  })

  const selection = ref([])
  const onSelectionChange = (selected) => {
    selection.value = selected
  }

  watchEffect(() => {
    const { pageSize, currentPage } = paginationConfig.value
    console.log('get-list', pageSize, currentPage)
  })
</script>

<style lang="scss" scoped>
  .table-top {
    margin-top: 20px;
    display: flex;
    align-items: center;
    .title {
      font-size: 16px;
      font-weight: bold;
    }
    .btn1 {
      margin-left: auto;
    }
    .btn {
      min-width: 88px;
    }
  }
  .brand-page {
  }
</style>
