<template>
  <div class="brand-page">
    <el-card>
      <CommonSearch v-model:form="searchForm" :schema="searchSchema" @search="onSearch" />
    </el-card>
    <el-card style="margin-top: 28px">
      <div class="table-top">
        <span class="title">品牌列表</span>
        <el-button class="btn1 btn" type="primary" @click="toAddPage">新建</el-button>
        <el-button class="btn" :disabled="selection.length < 2" @click="batchDelete">
          批量删除
        </el-button>
      </div>
      <Table
        :data="tableData"
        :columns="columns"
        :config="{
          style: { 'min-height': '400px' },
        }"
        v-model:pageSize="paginationConfig.pageSize"
        v-model:currentPage="paginationConfig.currentPage"
        :total="paginationConfig.total"
        @selection-change="onSelectionChange"
        selectable
      />
    </el-card>
    <SeriesDialog v-model:visible="dialogVisible" />
  </div>
</template>
<script setup>
  import { ref, watchEffect, reactive, computed, onMounted, h } from 'vue'
  import { CommonSearch, Table, Form } from '@/components'
  import TableOperation from './components/TableOperation.vue'
  import SeriesDialog from './components/SeriesDialog.vue'
  import { useRouter } from 'vue-router'
  const router = useRouter()

  const dialogVisible = ref(false)

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
      label: '序号',
      formatter: ({ scope, key, value }) => {
        return scope.$index + 1
      },
    },
    {
      prop: 'name',
      label: '品牌名称',
      formatter: ({ scope, key, value }) => {
        return 'hello ' + value
      },
    },
    {
      prop: 'status',
      label: '品牌状态',
    },
    {
      prop: 'createDate',
      label: '创建时间',
    },
    {
      prop: 'updateDate',
      label: '更新时间',
    },
    {
      prop: 'updateBy',
      label: '更新人',
    },
    {
      label: '操作',
      width: '300',
      columnRenderFn: ({ scope, column }) => {
        return h(TableOperation, {
          props: {
            scope,
          },
          onEdit: () => {
            console.log('on-edit')
          },
          onStop: () => {
            console.log('on-stop')
          },
          onStart: () => {
            console.log('on-start')
          },
          // 系列按钮
          onDetail: () => {
            dialogVisible.value = true
          },
          onDelete: () => {
            deleteBrand([scope.row.id])
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

  // 操作部分
  const toAddPage = () => {
    router.push({
      path: '/product/brand/add',
    })
  }

  const selection = ref([])
  const onSelectionChange = (selected) => {
    selection.value = selected
  }

  const batchDelete = () => {
    deleteBrand(selection.value.map((item) => item.id))
  }

  const deleteBrand = (list = []) => {
    console.log('delete-brand', list)
  }

  watchEffect(() => {
    const { pageSize, currentPage } = paginationConfig.value
    console.log('get-list', pageSize, currentPage)
  })
</script>

<style lang="scss" scoped>
  .brand-page {
  }
  .table-top {
    margin-bottom: 18px;
    display: flex;
    align-items: center;
    font-size: 16px;
    .title {
      font-weight: bold;
    }
    .btn1 {
      margin-left: auto;
    }
    .btn {
      min-width: 88px;
    }
  }
</style>
