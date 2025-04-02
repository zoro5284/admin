<template>
  <el-card>
    <div slot="header">自定义规格</div>
    <el-table :data="propertyList" style="width: 100%">
      <el-table-column prop="name" label="规格名">
        <template v-slot="{ $index, row }">
          <el-input
            v-model="propertyList[$index].name"
            @change="onPropertyChange($event, $index)"
          />
        </template>
      </el-table-column>
      <el-table-column prop="values" label="属性值">
        <template v-slot="{ $index, row }">
          <div v-for="(value, index) in row.values" :key="index" class="row">
            <el-input v-model="propertyList[$index].values[index]" />
            <el-icon class="del-icon" @click="deleteProperty($index, index)"><Delete /></el-icon>
          </div>
          <el-button
            type="primary"
            size="small"
            @click="addProperty($index)"
            style="margin-top: 8px"
          >
            <el-icon class="el-icon--plus">
              <Plus />
            </el-icon>
            <span style="margin-left: 6px">添加一行</span>
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
      <span style="margin-left: 6px">添加规格</span>
    </el-button>
  </el-card>
</template>
<script setup>
  import { CircleIcon } from '@/components'
  import { cloneDeep } from 'lodash-es'
  import { Delete } from '@element-plus/icons-vue'

  const propertyList = defineModel('propertyList', { type: Array, required: true })
  const EmptyRow = {
    name: '',
    values: [''],
  }

  const addRow = () => {
    propertyList.value.push(cloneDeep(EmptyRow))
  }

  const deleteRow = (rowIndex) => {
    propertyList.value.splice(rowIndex, 1)
  }

  const addProperty = (rowIndex) => {
    propertyList.value[rowIndex].values.push('')
  }

  const deleteProperty = (rowIndex, propertyIndex) => {
    propertyList.value[rowIndex].values.splice(propertyIndex, 1)
  }

  const onPropertyChange = ($event, rowIndex) => {
    if (propertyList.filter((item) => item.name === $event)?.length > 1) {
      ElMessage({
        message: `规格【${$event}】已经存在，请重新配置`,
        type: 'error',
      })
      propertyList.value[rowIndex].name = ''
    }
  }

  const onPropertyValueChange = ($event, rowIndex, index) => {
    const values = propertyList.value[rowIndex].values

    if (values.filter((value) => $event === value)?.length > 1) {
      ElMessage({
        message: `规格值【${$event}】已经存在，请重新配置`,
        type: 'error',
      })
      propertyList.value[rowIndex].values[index] = ''
    }
  }
</script>
<style lang="scss" scoped>
  .row {
    height: 48px;
    display: flex;
    align-items: center;
    .del-icon {
      color: red;
      margin-left: 8px;
    }
  }
</style>
