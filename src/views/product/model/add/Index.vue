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
  import { alphabetArray, findCategoryPathById, getAllBrand, getAllCategory } from '@/utils'
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
    categoryId: [],
    brandId: '',
    seriesId: '',
    logo: [],
    introduction: '',
  })

  const schema = reactive([
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
      prop: 'categoryId',
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
      prop: 'brandId',
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
      prop: 'seriesId',
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
  ])

  const onSubmit = async () => {
    const categoryList = [...formData.value.categoryId]

    const params = {
      ...formData.value,
      categoryId: categoryList[categoryList.length - 1],
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

  const generateOptions = async (categoryId, seriesId) => {
    schema[2].options = await getAllCategory()
    schema[3].options = await getAllBrand()
    if (categoryId) {
      formData.value.categoryId = findCategoryPathById(schema[2].options, categoryI)
    }
    if (seriesId) {
      formData.value.seriesId = seriesId
      schema[4].options = await querySeriesList({ brandId: formData.value.brandId })
    }
  }

  const init = async () => {
    modelId.value = route.query.modelId
    if (modelId.value) {
      const ret = await api.product.getModelInfo({ modelId: modelId.value })
      Object.keys(formData.value).forEach((key) => {
        // 类目使用cascader，需特殊处理。系列在生成品牌options后赋值
        if (['category', 'seriesId'].includes(key)) return
        ret[key] && (formData.value[key] = ret[key])
      })
      console.log('ret', formData.value)
    }
    // 生成品牌，系列Options
    generateOptions(ret.categoryId, ret.seriesId)
  }

  // 品牌变化时，清空已经选择的系列。重新查询系列数据
  watch(
    () => formData.value.brandId,
    (val) => {
      formData.value.seriesId = ''
      scheme[4].options = querySeriesList({ brandId: val })
    },
  )

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
