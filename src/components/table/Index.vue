<template>
  <el-table :data="data" v-bind="config">
    <TableColumn v-for="column in columns" :key="column.prop" :column="column" />
  </el-table>
  <el-pagination
    :style="{ 'justify-content': 'flex-end', 'margin-top': '10px' }"
    v-model:current-page="currentPage"
    :page-size="pageSize"
    :total="total"
    :page-sizes="[10, 20, 50]"
    :layout="'total, sizes, prev, pager, next, jumper'"
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
    columns: {
      type: Array,
      default: () => [],
    },
    total: {
      type: Number,
      default: 50,
    },
  })

  const currentPage = ref(1)
  const pageSize = ref(10)

  const handleSizeChange = (val) => {
    console.log('size-change', val)
  }

  const handleCurrentChange = (val) => {
    console.log('current-change', val)
  }
</script>
<style lang="scss" scoped></style>
