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
    <SeriesDialog v-model:visible="dialogVisible" :brand-id="currentBrandId" />
  </div>
</template>
<script setup>
  import { ref, watch, reactive, computed, onMounted, h } from 'vue'
  import { CommonSearch, Table, Form } from '@/components'
  import TableOperation from './components/TableOperation.vue'
  import SeriesDialog from './components/SeriesDialog.vue'
  import { useRouter } from 'vue-router'
  import useApi from '@/api'
  import { dayjs } from 'dayjs'
  import { ElMessage } from 'element-plus'

  const router = useRouter()
  const api = useApi()

  const dialogVisible = ref(false)
  const currentBrandId = ref()

  // 搜索部分
  const searchSchema = [
    {
      label: '品牌名称',
      prop: 'name',
      component: 'input',
      config: {
        placeholder: '请输入品牌名称',
      },
    },
    {
      label: '品牌状态',
      prop: 'state',
      component: 'select',
      config: {
        placeholder: '请选择品牌状态',
        style: {
          width: '200px',
        },
      },
      options: [
        { value: 0, label: '启用' },
        { value: 1, label: '停用' },
      ],
    },
  ]

  const searchForm = ref({
    name: '',
    state: '',
  })

  const onSearch = async () => {
    const { pageSize, currentPage: pageNum } = paginationConfig.value
    const params = {
      ...searchForm.value,
      pageSize,
      pageNum,
    }
    tableData.value = (await api.product.queryBrandList(params, { method: 'GET' })) ?? []
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
      label: '品牌名称',
      formatter: ({ scope }) => {
        // nameEn：英文名。nameZh: 中文名
        const {
          row: { nameZh, nameEn },
        } = scope
        if (nameZh && nameEn) {
          return `${nameZh}(${nameEn})`
        }
        return nameZh || nameEn || '-'
      },
    },
    {
      prop: 'status',
      label: '品牌状态',
      columnRenderFn: ({ scope }) => {
        const status = scope.row.status
        if (status !== 0 && status !== 1) return h('span', null, '-')
        const color = status === 0 ? '#407aff' : 'red'
        const text = status === 0 ? '已启用' : '已停用'

        return h('span', { style: { color } }, text)
      },
    },
    {
      prop: 'createTime',
      label: '创建时间',
      formatter: ({ value }) => {
        if (!value) return '-'
        return dayjs(value).format('YYYY-MM-DD HH:mm:ss')
      },
    },
    {
      prop: 'updateTime',
      label: '更新时间',
      formatter: ({ value }) => {
        if (!value) return '-'
        return dayjs(value).format('YYYY-MM-DD HH:mm:ss')
      },
    },
    {
      prop: 'operator',
      label: '更新人',
    },
    {
      label: '操作',
      width: '300',
      columnRenderFn: ({ scope, column }) => {
        const { brandId: id, status } = scope.row
        return h(TableOperation, {
          status,
          onEdit: () => {
            toAddPage(id, scope.row)
          },
          // 停用
          onStop: () => {
            updateState(id, 1)
          },
          // 启用
          onStart: () => {
            updateState(id, 0)
          },
          // 系列按钮
          onDetail: () => {
            currentBrandId.value = id
          },
          onDelete: () => {
            if (!id) return
            deleteBrand([id])
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
  // 修改品牌状态
  const updateState = async (id, state) => {
    await api.product.updateState({
      brandId: id,
      state,
    })
    ElMessage({
      message: '更新状态成功',
      type: 'success',
    })
  }

  const toAddPage = (id, row) => {
    router.push({
      path: '/product/brand/add',
      query: {
        brandId: id,
        brandInfo: row,
      },
    })
  }

  const selection = ref([])
  const onSelectionChange = (selected) => {
    selection.value = selected
  }

  const batchDelete = () => {
    deleteBrand(selection.value.map((item) => item.id))
  }

  const deleteBrand = async (list = []) => {
    await api.product.deleteBrand({ brandIdList: list })
    ElMessage({
      message: '品牌删除成功',
      type: 'success',
    })
  }

  watch(
    () => [paginationConfig.value.pageSize, paginationConfig.value.currentPage],
    (val) => {
      onSearch()
    },
  )
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
