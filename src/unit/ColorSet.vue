<template>
  <el-card>
    <template #header>
      <div class="card-title">颜色属性</div>
    </template>
    <el-table :data="colorList" style="width: 100%">
      <el-table-column prop="color" label="主色">
        <template #default="scope">
          <el-input
            v-model="colorList[scope.$index].color"
            @change="onColorChange($event, scope.$index)"
          />
        </template>
      </el-table-column>
      <el-table-column prop="remark" label="备注">
        <template #default="scope">
          <el-input v-model="colorList[scope.$index].remark" />
        </template>
      </el-table-column>
      <el-table-column prop="logo" label="缩略图">
        <template #default="scope">
          <Upload
            class="upload"
            v-model:file-list="colorList[scope.$index].logo"
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
  import { Upload, CircleIcon } from '@/components'
  import { ElMessage } from 'element-plus'
  import { cloneDeep } from 'lodash-es'

  const colorList = defineModel('colorList', { type: Array, required: true })

  const EmptyRow = {
    color: '',
    remark: '',
    logo: [],
  }

  const addColor = () => {
    colorList.value.push(cloneDeep(EmptyRow))
  }

  const deleteColor = (idx) => {
    colorList.value.splice(idx, 1)
  }

  const onColorChange = ($event, rowIndex) => {
    if (colorList.filter((item) => item.color === $event)?.length > 1) {
      ElMessage({
        message: `颜色【${$event}】已经存在，请重新配置`,
        type: 'error',
      })
      colorList.value[rowIndex].color = ''
    }
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
