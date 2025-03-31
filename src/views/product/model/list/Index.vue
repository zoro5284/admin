<template>
  <div class="model-page">
    <el-card>
      <CommonSearch
        v-model:form="searchForm"
        :schema="searchSchema"
        @search="onSearch(true)"
        @reset="onSearch(true)"
      />
    </el-card>
    <el-card style="margin-top: 28px">
      <div class="table-top">
        <span class="title">型号列表</span>
        <el-button class="btn1 btn" type="primary" @click="toAddPage()">新建</el-button>
        <el-button class="btn" :disabled="selection.length < 2" @click="batchDelete">
          批量删除
        </el-button>
      </div>
      <Table
        :data="tableData"
        :columns="columns"
        v-model:pageSize="paginationConfig.pageSize"
        v-model:currentPage="paginationConfig.currentPage"
        :total="paginationConfig.total"
        @selection-change="onSelectionChange"
        selectable
      />
    </el-card>
  </div>
</template>
<script setup>
  import { ref, watch, reactive, computed, onMounted, h } from 'vue'
  import { CommonSearch, Table, Form } from '@/components'
  import TableOperation from './components/TableOperation.vue'
  import { useRouter } from 'vue-router'
  import useApi from '@/api'
  import dayjs from 'dayjs'
  import { ElMessage } from 'element-plus'

  const router = useRouter()
  const api = useApi()

  // 搜索部分
  const searchSchema = [
    {
      label: '型号名称',
      prop: 'name',
      component: 'input',
      config: {
        placeholder: '请输入型号名称',
        style: {
          width: '150px',
        },
      },
    },
    {
      label: '所属品牌',
      prop: 'brand',
      component: 'select',
      config: {
        clearable: true,
        placeholder: '请选择品牌',
        style: {
          width: '150px',
        },
      },
    },
    {
      label: '所属类目',
      prop: 'category',
      component: 'select',
      config: {
        clearable: true,
        placeholder: '请选择类目',
        style: {
          width: '150px',
        },
      },
    },
    {
      label: '型号状态',
      prop: 'state',
      component: 'select',
      config: {
        clearable: true,
        placeholder: '请选择型号状态',
        style: {
          width: '150px',
        },
      },
      options: [
        { value: 0, label: '启用' },
        { value: 2, label: '停用' },
      ],
    },
  ]

  const searchForm = ref({
    name: '',
    brand: '',
    category: '',
    state: '',
  })

  const onSearch = async (resetPage) => {
    if (resetPage) {
      paginationConfig.currentPage = 1
    }
    const { pageSize, currentPage: pageNum } = paginationConfig
    const params = {
      ...searchForm.value,
      pageSize,
      pageNum,
    }
    const ret = (await api.product.queryModelList(params, { method: 'GET' })) ?? []
    tableData.value = ret.data
    paginationConfig.total = ret.total
  }

  // 表格部分
  const tableData = ref([])
  const columns = [
    {
      label: '序号',
      formatter: ({ scope, key, value }) => {
        return scope.$index + 1
      },
    },
    {
      prop: 'name',
      label: '型号名称',
    },
    {
      prop: 'brandName',
      label: '所属品牌',
    },
    {
      prop: 'category',
      label: '所属类目',
    },
    {
      prop: 'state',
      label: '型号状态',
      columnRenderFn: ({ scope }) => {
        const state = scope.row.state
        if (state !== 0 && state !== 2) return h('span', null, '-')
        const color = state === 0 ? '#09cd8a' : '#fa1919'
        const text = state === 0 ? '已启用' : '已停用'

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
        const { modelId: id, state } = scope.row
        return h(TableOperation, {
          state,
          onEdit: () => {
            toAddPage(id, scope.row)
          },
          // 停用
          onStop: () => {
            updateState(id, 2)
          },
          // 启用
          onStart: () => {
            updateState(id, 0)
          },
          onDelete: () => {
            if (!id) return
            deleteModel([id])
          },
        })
      },
    },
  ]

  const paginationConfig = reactive({
    pageSize: 10,
    currentPage: 1,
    total: 0,
  })

  // 操作部分
  // 修改型号状态
  const updateState = async (id, state) => {
    await api.product.updateModelState(
      {
        modelId: id,
        state,
      },
      { method: 'POST' },
    )
    ElMessage({
      message: '更新状态成功',
      type: 'success',
    })
    onSearch()
  }

  const toAddPage = (id, row) => {
    if (!id) {
      router.push({
        path: '/product/model/add',
      })
      return
    }
    router.push({
      path: '/product/model/add',
      query: {
        modelId: id,
      },
    })
  }

  const selection = ref([])
  const onSelectionChange = (selected) => {
    selection.value = selected
  }

  const batchDelete = () => {
    deleteModel(selection.value.map((item) => item.modelId))
  }

  const deleteModel = async (list = []) => {
    await api.product.deleteModel({ modelIdList: list }, { method: 'POST' })
    ElMessage({
      message: '型号删除成功',
      type: 'success',
    })
    onSearch(true)
  }

  watch(
    () => [paginationConfig.pageSize, paginationConfig.currentPage],
    (val) => {
      onSearch()
    },
    {
      immediate: true,
    },
  )
</script>

<style lang="scss" scoped>
  .model-page {
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
  }
</style>
