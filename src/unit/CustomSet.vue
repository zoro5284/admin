<template>
  <el-card>
    <div slot="header">自定义规格</div>
    <el-table :data="specList" style="width: 100%">
      <el-table-column prop="name" label="规格名">
        <template v-slot="scope">
          <el-input
            :model-value="scope.row.name"
            @update:model-value="updateModelValue($event, 'name', scope.$index)"
          />
        </template>
      </el-table-column>
      <el-table-column prop="values" label="属性值">
        <template v-slot="{ $index, row }">
          <template v-for="(value, index) in row" :key="index">
            <el-input
              :model-value="value"
              @update:model-value="updateModelValue($event, $index, index)"
            />
            <el-icon @click="deleteProperty($index, index)"><Delete /></el-icon>
          </template>
          <el-button type="primary" size="small" @click="addProperty($index)">
            <el-icon class="el-icon--plus">
              <Plus />
            </el-icon>
            <span style="margin-left: 6px">添加颜色</span>
          </el-button>
        </template>
      </el-table-column>
      <el-table-column label="操作">
        <template #default="scope">
          <CircleIcon @click="deleteRow(scope.$index)" />
        </template>
      </el-table-column>
    </el-table>
    <el-button type="primary" @click="addRow">
      <el-icon class="el-icon--plus">
        <Plus />
      </el-icon>
      <span style="margin-left: 6px">添加颜色</span>
    </el-button>
  </el-card>
</template>
<script setup>
  import { CircleIcon } from '@/components'
  import { cloneDeep } from 'lodash-es'
  import { Delete } from '@element-plus/icons-vue'
  const EmptyRow = {
    name: '',
    values: [],
  }
  const specList = reactive([
    {
      name: '',
      values: [],
    },
  ])

  const addRow = () => {
    specList.push(cloneDeep(EmptyRow))
  }

  const deleteRow = (rowIndex) => {
    specList.splice(rowIndex, 1)
  }

  const addProperty = (rowIndex) => {
    specList[rowIndex].values.push('')
  }

  const deleteProperty = (rowIndex, propertyIndex) => {
    specList[rowIndex].values.splice(propertyIndex, 1)
  }
</script>
<style lang="less" scoped></style>
