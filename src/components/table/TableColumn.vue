<template>
  <el-table-column align="center" v-bind="omit(column, 'children')">
    <template v-if="!column.children" v-slot="scope">
      <component v-if="column.columnRenderFn" :is="column.columnRenderFn({ scope, column })" />
      <span v-else-if="column.formatter">
        {{ column.formatter({ scope, key: column.prop, value: scope.row[column.prop] }) }}
      </span>
      <span v-else>{{ scope.row[column.prop] }}</span>
    </template>
    <!-- 处理子元素 -->
    <template v-if="column.children">
      <TableColumn v-for="subColumn in column.children" :key="subColumn.prop" :column="subColumn" />
    </template>
  </el-table-column>
</template>
<script setup>
  import { omit } from 'lodash-es'
  defineOptions({
    name: 'TableColumn',
  })

  const props = defineProps({
    column: {
      type: Object,
      default: () => ({}),
    },
  })
</script>
<style lang="scss" scoped></style>
