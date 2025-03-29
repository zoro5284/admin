<template>
  <div class="brand-add-page">
    <el-card style="height: 100%">
      <template #header>
        <div class="card-title">基础信息</div>
      </template>
      <Form v-model:form="formData" :schema="schema" @submit="onSubmit" @cancel="toBrandList" />
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

  const formData = ref({
    brandId: '',
    nameZh: '',
    nameEn: '',
    nameFirstLetter: [],
    logo: [],
    introduction: '',
  })

  const schema = [
    {
      label: '品牌中文名',
      prop: 'nameZh',
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
      prop: 'nameEn',
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
      prop: 'nameFirstLetter',
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
      prop: 'logo',
      component: 'upload',
    },
    {
      label: '品牌简介',
      prop: 'introduction',
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

  const onSubmit = async () => {
    if (!formData.nameZh && !formData.nameEn) {
      ElMessage({
        message: '请输入品牌中文名或品牌英文名',
        type: 'warning',
      })
      return
    }
    const params = {
      ...formData.value,
    }
    await api.product.addBrand(params)
    ElMessage({
      message: `${formData.value.brandId ? '修改' : '新增'}品牌成功`,
    })
    toBrandList()
  }

  const toBrandList = () => {
    router.push({
      path: '/product/brand',
    })
  }

  const init = () => {
    brandInfo = route.query.brandIndo ?? {}
    Object.keys(formData.value).forEach((key) => {
      formData.value[key] = brandIndo
    })
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
