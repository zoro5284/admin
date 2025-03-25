<template>
  <div class="brand-page">
    <el-card>
      <!-- <CommonSearch v-model:form="searchForm" :schema="searchSchema" @search="onSearch" /> -->
    </el-card>
    <div class="btns">
      <el-button class="btn" type="primary" @click="add">新增</el-button>
      <el-button class="btn" type="primary">新增</el-button>
    </div>
    <el-card>
      <Table
        :data="tableData"
        v-model:pageSize="paginationConfig.pageSize"
        v-model:currentPage="paginationConfig.currentPage"
        :total="paginationConfig.total"
      />
    </el-card>
  </div>
</template>
<script setup>
  import { ref, watchEffect, reactive, computed, onMounted } from 'vue'
  import { CommonSearch, Table } from '@/components'

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

  const add = () => {}

  // 表格部分
  const tableData = ref([])

  const paginationConfig = ref({
    pageSize: 10,
    currentPage: 1,
    total: 50,
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
