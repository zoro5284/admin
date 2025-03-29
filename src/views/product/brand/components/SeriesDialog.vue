<template>
  <el-dialog
    class="series-dialog"
    title="系列管理"
    :model-value="props.visible"
    :style="{
      minHeight: '300px',
    }"
    @close="(v) => $emit('update:visible', false)"
  >
    <Table :data="tableData" :columns="columns" :usePagination="false" />
    <div class="footer">
      <el-button type="primary" @click="addSeries()">
        <el-icon class="el-icon--plus">
          <Plus />
        </el-icon>
        <span style="margin-left: 6px">添加系列</span>
      </el-button>
    </div>
  </el-dialog>
  <el-dialog title="新增系列" v-model="addDialogVisible">
    <Form
      :schema="seriesSchema"
      v-model:form="seriesForm"
      @submit="onSubmit"
      @cancel="addDialogVisible = false"
    />
  </el-dialog>
</template>
<script setup>
  import { ref, reactive, computed, onMounted, h, nextTick, watch } from 'vue'
  import { Table, Form } from '@/components'
  import Icon from './Icon.vue'
  import { Edit, Delete } from '@element-plus/icons-vue'
  import { ElMessage } from 'element-plus'

  const emit = defineEmits(['update:visible'])
  const props = defineProps({
    visible: {
      type: Boolean,
      default: false,
    },
    brandId: {
      type: [Number, String],
      required: true,
    },
  })

  const tableData = ref([])
  const columns = [
    {
      label: '序号',
      formatter: ({ scope, key, value }) => {
        return scope.$index + 1
      },
    },
    {
      label: '系列名',
      prop: 'name',
    },
    {
      label: '系列描述',
      prop: 'introduction',
    },
    {
      label: '操作',
      width: '180',
      columnRenderFn: ({ scope, column }) => {
        const id = scope.row.seriesId
        return h(
          'div',
          { style: { display: 'flex', alignItems: 'center', justifyContent: 'center' } },
          [
            h(
              Icon,
              {
                background: '#407aFF',
                onClick: () => {
                  handleEditSeries(scope.row)
                },
              },
              { default: () => h(Edit) },
            ),
          ],
          [
            h(
              Icon,
              {
                style: { marginLeft: '8px' },
                onClick: () => {
                  if (!id) return
                  handleDeleteSeries([id])
                },
              },
              { default: () => h(Delete) },
            ),
          ],
        )
      },
    },
  ]

  // 重置表单
  const resetSeriesForm = () => {
    Object.keys(seriesForm.value).forEach((key) => {
      seriesForm.value[key] = ''
    })
  }

  // 新增系列
  const addSeries = () => {
    resetSeriesForm()
    addDialogVisible.value = true
  }

  // 编辑系列
  const handleEditSeries = async (row) => {
    resetSeriesForm()
    // 根据系列id赋值
    Object.keys(seriesForm).forEach((key) => {
      seriesForm[key] = row[key]
    })
    addDialogVisible.value = true
  }

  // 删除系列
  const handleDeleteSeries = async (list = []) => {
    const params = {
      seriesIdList: list,
    }
    await api.product.deleteSeries(params, { method: 'GET' })
    ElMessage({
      message: '删除系列成功',
      type: 'success',
    })
    init()
  }

  // 新增系列
  const addDialogVisible = ref(false)

  const seriesSchema = [
    {
      label: '品牌名',
      prop: 'key1',
      component: 'input',
      config: {
        placeholder: '请输入',
        style: {
          width: '300px',
        },
      },
    },
    {
      label: '系列名',
      prop: 'name',
      component: 'input',
      config: {
        placeholder: '请输入',
        style: {
          width: '300px',
        },
      },
    },
    {
      label: '系列简述',
      prop: 'introduction',
      component: 'input',
      config: {
        type: 'textarea',
        placeholder: '请输入',
        style: {
          width: '300px',
        },
      },
    },
  ]

  const seriesForm = ref({
    seriesId: '',
    name: '',
    seriesForm: '',
  })

  const onSubmit = async () => {
    const params = {
      ...seriesForm.value,
    }
    await api.product.addSeries(params, { method: 'GET' })
    ElMessage({
      message: `${seriesForm.value.seriesId ? '修改' : '新增'}系列成功`,
    })
    addDialogVisible.value = false
  }

  const init = async () => {
    const params = {
      brandId: props.brandId,
    }
    tableData.value = await api.product.querySeriesList(params, { method: 'GET' })
  }

  watch(addDialogVisible, (val) => {
    emit('update:visible', !val)
  })

  watch(
    () => props.visible,
    (val) => {
      val && init()
    },
  )
</script>

<style lang="scss" scoped>
  .series-dialog {
    .footer {
      margin-top: 18px;
      text-align: center;
    }
  }
</style>
