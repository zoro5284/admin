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
      <el-button type="primary" @click="addDialogVisible = true">
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

  const emit = defineEmits(['update:visible'])
  const props = defineProps({
    visible: {
      type: Boolean,
      default: false,
    },
  })

  const tableData = ref([{ key1: 1 }])
  const columns = [
    {
      label: '序号',
      formatter: ({ scope, key, value }) => {
        return scope.$index + 1
      },
    },
    {
      label: '系列名',
      prop: 'key1',
    },
    {
      label: '系列描述',
      prop: 'key2',
    },
    {
      label: '操作',
      width: '180',
      columnRenderFn: ({ scope, column }) => {
        return h(
          'div',
          { style: { display: 'flex', alignItems: 'center', justifyContent: 'center' } },
          [
            h(
              Icon,
              {
                background: '#407aFF',
                onClick: () => {
                  console.log('edit')
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
                  console.log('delete')
                },
              },
              { default: () => h(Delete) },
            ),
          ],
        )
      },
    },
  ]

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
      prop: 'key2',
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
      prop: 'key5',
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
    key1: '',
    key2: '',
    key5: '',
  })

  const onSubmit = () => {}

  watch(addDialogVisible, (val) => {
    emit('update:visible', !val)
  })
</script>

<style lang="scss" scoped>
  .series-dialog {
    .footer {
      margin-top: 18px;
      text-align: center;
    }
  }
</style>
