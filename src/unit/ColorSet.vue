<template>
  <el-card>
    <template #header>
      <div class="card-title">颜色属性</div>
    </template>
    <el-table :data="colorList" style="width: 100%">
      <el-table-column prop="color" label="主色">
        <template #default="scope">
          <el-input
            :model-value="scope.row.color"
            @update:model-value="updateModelValue($event, 'color', scope.$index)"
          />
        </template>
      </el-table-column>
      <el-table-column prop="remark" label="备注">
        <template #default="scope">
          <el-input
            :model-value="scope.row.remark"
            @update:model-value="updateModelValue($event, 'remark', scope.$index)"
          />
        </template>
      </el-table-column>
      <el-table-column prop="logo" label="缩略图">
        <template #default="scope">
          <Upload
            class="upload"
            :file-list="scope.row.logo"
            @update:file-list="updateModelValue($event, 'logo', scope.$index)"
            :config="{ 'list-type': 'picture-card', limit: 1 }"
          />
        </template>
      </el-table-column>
      <el-table-column label="操作">
        <template #default="scope">
          <CircleIcon @click="deleteColor(scope.$index)" />
        </template>
      </el-table-column>
    </el-table>
    <el-button type="primary" @click="addColor">
      <el-icon class="el-icon--plus">
        <Plus />
      </el-icon>
      <span style="margin-left: 6px">添加颜色</span>
    </el-button>
  </el-card>
</template>
<script setup>
  import { reactive, ref } from 'vue'
  import { Upload, CircleIcon } from '@/components'
  import { cloneDeep } from 'lodash-es'

  const EmptyRow = {
    color: '',
    remark: '',
    logo: [],
  }

  const colorList = reactive([
    {
      color: '暗夜黑',
      remark: '备注',
      logo: [],
    },
  ])

  const addColor = () => {
    colorList.push(cloneDeep(EmptyRow))
    console.log('color-list', colorList)
  }

  const deleteColor = (idx) => {
    colorList.splice(idx, 1)
  }

  const updateModelValue = (value, key, index) => {
    // console.log('update', value, key, index)
    colorList[index][key] = value
  }
</script>
<style lang="scss" scoped>
  ::v-deep .upload {
    .el-upload-list--picture-card .el-upload-list__item,
    .el-upload--picture-card {
      width: 100px;
      height: 100px;
    }
  }
</style>
