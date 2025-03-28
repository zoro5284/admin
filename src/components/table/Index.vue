<template>
  <el-table :data="data" v-bind="config" @selection-change="(v) => $emit('selection-change', v)">
    <el-table-column v-if="selectable" type="selection" width="50" />
    <TableColumn v-for="column in columns" :key="column.prop" :column="column" />
  </el-table>
  <el-pagination
    :style="{ 'justify-content': 'flex-end', 'margin-top': '10px' }"
    :current-page="currentPage"
    :page-size="pageSize"
    :total="total"
    :page-sizes="pageSizes"
    :layout="layout"
    @size-change="handleSizeChange"
    @current-change="handleCurrentChange"
  ></el-pagination>
</template>
<script setup>
  import { ref } from 'vue'
  import TableColumn from './TableColumn'

  const props = defineProps({
    data: {
      type: Array,
      default: () => [],
    },
    config: {
      type: Object,
      default: () => ({}),
    },
    selectable: {
      type: Boolean,
      default: false,
    },
    columns: {
      type: Array,
      default: () => [],
    },
    total: {
      type: Number,
      default: 0,
    },
    pageSize: {
      type: Number,
      default: 10,
    },
    pageSizes: {
      type: Array,
      default: () => [10, 20, 50],
    },
    layout: {
      type: String,
      default: 'total, sizes, prev, pager, next, jumper',
    },
    currentPage: {
      type: Number,
      default: 1,
    },
  })

  const emits = defineEmits(['update:pageSize', 'update:currentPage', 'selection-change'])

  const handleSizeChange = (val) => {
    emits('update:pageSize', val)
  }

  const handleCurrentChange = (val) => {
    emits('update:currentPage', val)
  }
</script>
<style lang="scss" scoped></style>
