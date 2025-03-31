<template>
  <div class="brand-add-page">
    <el-card style="height: 100%">
      <template #header>
        <div class="card-title">基础信息</div>
      </template>
      <Form v-model:form="formData" :schema="schema" @submit="onSubmit" @cancel="toCategoryList" />
    </el-card>
  </div>
</template>
<script setup>
  import { ref, reactive, computed, onMounted } from 'vue'
  import { Form } from '@/components'
  import { alphabetArray } from '@/utils'
  import { ElMessage } from 'element-plus'
  import { useRoute, useRouter } from 'vue-router'
  import useApi from '@/api'

  const router = useRouter()
  const route = useRoute()
  const api = useApi()

  const categoryId = ref()
  const formData = ref({
    name: '',
    introduction: '',
    upperCategoryId: '',
  })

  const schema = [
    {
      label: '名称',
      prop: 'name',
      component: 'input',
      config: {
        placeholder: '请输入',
        style: {
          width: '300px',
        },
      },
    },
    {
      label: '描述',
      prop: 'introduction',
      component: 'input',
      config: {
        placeholder: '请输入',
        type: 'textarea',
        rows: 5,
        style: {
          width: '300px',
        },
      },
    },
    {
      label: '上级类目',
      props: 'upperCategoryId',
      component: 'select',
      config: {
        placeholder: '请选择',
        style: {
          width: '300px',
        },
      },
      options: [
        {
          value: '1',
          label: '1',
        },
        {
          value: '2',
          label: '2',
        },
      ],
    },
  ]

  const onSubmit = async () => {
    const params = {
      ...formData.value,
    }
    await api.product.addCategory(params, { method: 'POST' })
    ElMessage({
      message: `${categoryId.value ? '修改' : '新增'}类目成功`,
      type: 'success',
    })
    toCategoryList()
  }

  const toCategoryList = () => {
    router.push({
      path: '/product/brand',
    })
  }

  const init = async () => {
    // 生成上级类目OPTIONS TODO

    categoryId.value = route.query.categoryId
    if (categoryId.value) {
      const ret = await api.product.getCategoryInfo({ categoryId: categoryId.value })
      Object.keys(formData.value).forEach((key) => {
        ret[key] && (formData.value[key] = ret[key])
      })
      console.log('ret', formData.value)
    }
  }

  onMounted(() => {
    init()
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
