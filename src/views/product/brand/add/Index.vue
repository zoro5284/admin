<template>
  <div class="brand-add-page">
    <el-card style="height: 100%">
      <template #header>
        <div class="card-title">基础信息</div>
      </template>
      <Form v-model:form="formData" :schema="schema" @submit="onSubmit" @cancel="onCancel" />
    </el-card>
  </div>
</template>
<script setup>
  import { ref, reactive, computed, onMounted } from 'vue'
  import { Form } from '@/components'
  import { alphabetArray } from '@/utils'
  import { ElMessage } from 'element-plus'
  import { useRoute, useRouter } from 'vue-router'
  const router = useRouter()

  const formData = ref({
    key1: '',
    key2: '',
    key3: [],
    key4: [],
    key5: '',
  })

  const schema = [
    {
      label: '品牌中文名',
      prop: 'key1',
      component: 'input',
      rule: [{ required: false }],
      config: {
        placeholder: '请输入',
        style: {
          width: '300px',
        },
      },
    },
    {
      label: '品牌英文名',
      prop: 'key2',
      component: 'input',
      rule: [{ required: false }],
      config: {
        placeholder: '请输入',
        style: {
          width: '300px',
        },
      },
    },
    {
      label: '首字母',
      prop: 'key3',
      component: 'select',
      config: {
        placeholder: '请选择',
        style: {
          width: '300px',
        },
      },
      options: alphabetArray.map((i) => ({ label: i, value: i })),
    },
    {
      label: '品牌logo',
      prop: 'key4',
      component: 'upload',
    },
    {
      label: '品牌简介',
      prop: 'key5',
      component: 'input',
      config: {
        placeholder: '请输入',
        type: 'textarea',
        style: {
          width: '300px',
        },
      },
    },
  ]

  const onSubmit = () => {
    if (!formData.key1 && !formData.key2) {
      ElMessage({
        message: '请输入品牌中文名或品牌英文名',
        type: 'warning',
      })
      return
    }
    console.log('vlaidate', formData.value)
  }

  const onCancel = () => {
    router.push({
      path: '/product/brand',
    })
  }

  onMounted(() => {
    console.log('Component mounted')
  })
</script>

<style lang="scss" scoped>
  .brand-add-page {
    height: 100%;
    .card-title {
      font-size: 16px;
      font-weight: bold;
    }
  }
</style>
