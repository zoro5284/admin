<template>
  <el-card>
    <div slot="header">价格属性</div>
    <el-table :data="priceList" style="width: 100%">
      <el-table-column prop="color" label="颜色" />
      <el-table-column v-for="(column, index) in propertyList" :key="index" :prop="column.name" />
      <el-table-column prop="price" label="价格">
        <template v-slot="{ $index, row }">
          <el-input v-model="priceList[$index].price" />
        </template>
      </el-table-column>
    </el-table>
  </el-card>
</template>
<script setup>
  import { watchEffect, ref } from 'vue'

  const priceList = defineModel('priceList', { type: Array, required: true })

  const props = defineProps({
    colorList: {
      type: Array,
      required: true,
    },
    propertyList: {
      type: Array,
      required: true,
    },
  })

  watchEffect(() => {
    const list = props.propertyList.reduce(
      (acc, { name, values }) => {
        console.log('acc', acc, values)
        return acc.flatMap((obj) => values.map((value) => ({ ...obj, [name]: value })))
      },
      props.colorList.map(({ color }) => ({ color })),
    )
    console.log('list ', list)
  })
</script>
<style lang="scss" scoped></style>
