<template>
  <div class="brand-add-page">
    <el-card style="height: 100%">
      <template #header>
        <div class="card-title">基础信息</div>
      </template>
      <Form v-model:form="formData" :schema="schema" @submit="onSubmit" @cancel="toModelList" />
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

  const modelId = ref()
  const formData = ref({
    name: '',
    desc: '',
    category: [],
    brand: [],
    series: [],
    logo: [],
    introduction: '',
  })

  const schema = [
    {
      label: '产品型号',
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
      label: '产品描述',
      prop: 'desc',
      component: 'input',
      rule: [{ required: false }],
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
      label: '所属类目',
      prop: 'category',
      component: 'select',
      config: {
        placeholder: '请选择',
        style: {
          width: '300px',
        },
      },
      options: [],
    },
    {
      label: '所属品牌',
      prop: 'brand',
      component: 'select',
      config: {
        placeholder: '请选择',
        style: {
          width: '300px',
        },
      },
      options: [],
    },
    {
      label: '所属系列',
      prop: 'series',
      component: 'select',
      rule: [{ required: false }],
      config: {
        placeholder: '请选择',
        style: {
          width: '300px',
        },
      },
      options: [],
    },
    {
      label: '缩略图',
      prop: 'logo',
      component: 'upload',
      config: {
        limit: 1,
      },
    },
    {
      label: '官方介绍',
      prop: 'introduction',
      component: 'input',
    },
  ]

  const onSubmit = async () => {
    const params = {
      ...formData.value,
    }
    await api.product.addModel(params, { method: 'POST' })
    ElMessage({
      message: `${modelId.value ? '修改' : '新增'}型号成功`,
      type: 'success',
    })
    toModelList()
  }

  const toModelList = () => {
    router.push({
      path: '/product/model',
    })
  }

  const init = async () => {
    // 生成上级型号OPTIONS TODO

    modelId.value = route.query.modelId
    if (modelId.value) {
      const ret = await api.product.getModelInfo({ modelId: modelId.value })
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
