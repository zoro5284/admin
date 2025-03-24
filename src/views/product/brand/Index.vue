<template>
  <div class="brand-page">
    <CommonSearch :form="form" :schema="searchSchema" @search="onSearch" @update="updateForm" />
  </div>
</template>
<script setup>
import { ref, reactive, computed, onMounted } from 'vue';
import { CommonSearch } from '@/components'

  const searchSchema = [
    {
      label: '品牌名称',
      prop: 'key2',
      component: 'input',
      config: {
        placeholder: '请输入品牌名称',
      }
    },
    {
      label: '品牌状态',
      prop: 'key1',
      component: 'select',
      config: {
        placeholder: '请选择品牌状态',
        style: {
          width: '200px'
        },
      },
      options: [
        { value: '1', label: '启用' },
        { value: '2', label: '停用' }
      ]
    }
  ]

  const form = ref({
    key1: '',
    key2: ''
  })

  const onSearch = (val) => {
    console.log('on-search', val)
    form.value = val
  }

  const updateForm = (val) => {
    console.log('update-form', val)
    form.value = val
  }

</script>


<style lang="scss" scoped>
</style>
