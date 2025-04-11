<template>
  <div>
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
        <span class="title">品牌列表</span>
        <el-button class="btn1 btn" type="primary" @click="toAddPage()">新建</el-button>
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
  import { generateBrandName } from '../utils'

  const router = useRouter()
  const api = useApi()

  // 搜索部分
  const searchSchema = [
    {
      label: '版本名称',
      prop: 'name',
      component: 'input',
      config: {
        placeholder: '请输入版本名称',
      },
    },
    {
      label: '所属型号',
      prop: 'model',
      component: 'select',
      config: {
        clearable: true,
        placeholder: '请选择',
        style: {
          width: '200px',
        },
      },
      options: [],
    },
    {
      label: '所属品牌',
      prop: 'brand',
      component: 'select',
      config: {
        clearable: true,
        placeholder: '请选择',
        style: {
          width: '200px',
        },
      },
      options: [],
    },
    {
      label: '在售状态',
      prop: 'saleState',
      component: 'select',
      config: {
        clearable: true,
        placeholder: '请选择',
        style: {
          width: '200px',
        },
      },
      options: [
        { value: 0, label: '启用' },
        { value: 2, label: '停用' },
      ],
    },
    {
      label: '品牌状态',
      prop: 'state',
      component: 'select',
      config: {
        clearable: true,
        placeholder: '请选择品牌状态',
        style: {
          width: '200px',
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
    model: '',
    brand: '',
    saleState: '',
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
    const ret = (await api.product.queryBrandList(params, { method: 'GET' })) ?? []
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
      label: '版本名称',
      prop: 'model',
    },
    {
      label: '缩略图',
      prop: 'img',
      columnRenderFn: ({ scope }) => {
        const img = scope.row.img
        return h('img', { style: { width: '60px', height: '60px' }, src: img })
      },
    },
    {
      label: '规格数量',
      prop: 'specNum',
    },
    {
      label: '所属型号',
      prop: 'version',
    },
    {
      label: '所属品牌',
      prop: 'brand',
    },
    {
      label: '在售状态',
      columnRenderFn: ({ scope }) => {
        const state = scope.row.state
        if (state !== 0 && state !== 2) return h('span', null, '-')
        const color = state === 0 ? '#09cd8a' : '#fa1919'
        const text = state === 0 ? '在售' : '停售'

        return h('span', { style: { color } }, text)
      },
    },
    {
      label: '参数配置',
      columnRenderFn: ({ scope }) => {
        const state = scope.row.state
        if (state !== 0 && state !== 2) return h('span', null, '-')
        const color = state === 0 ? '#09cd8a' : '#fa1919'
        const text = state === 0 ? '已配置' : '未配置'

        return h('span', { style: { color } }, text)
      },
    },
    {
      label: '版本状态',
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
        const { brandId: id, state } = scope.row
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
            deleteBrand([id])
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
  // 修改品牌状态
  const updateState = async (id, state) => {
    await api.product.updateBrandState(
      {
        brandId: id,
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
        path: '/product/model-version/add',
      })
      return
    }
    router.push({
      path: '/product/model-version/add',
      query: {
        modelVersionId: id,
      },
    })
  }

  const selection = ref([])
  const onSelectionChange = (selected) => {
    selection.value = selected
  }

  const batchDelete = () => {
    deleteBrand(selection.value.map((item) => item.brandId))
  }

  const deleteBrand = async (list = []) => {
    await api.product.deleteBrand({ brandIdList: list }, { method: 'POST' })
    ElMessage({
      message: '型号版本删除成功',
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
