<template>
  <div class="model-add-page">
    <el-card>
      <template #header>
        <div class="card-title">基础信息</div>
      </template>
      <Form v-model:form="formData" :schema="schema" @submit="onSubmit" @cancel="toModelList" />
    </el-card>
  </div>
</template>
<script setup>
  import { ref, reactive, computed, onMounted, watch } from 'vue'
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
    brandSeriesId: '',
    photo: [],
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
      component: 'cascader',
      config: {
        placeholder: '请选择',
        style: {
          width: '300px',
        },
        options: [],
        props: {
          checkStrictly: true,
        },
      },
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
      prop: 'brandSeriesId',
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
      prop: 'photo',
      component: 'upload',
      config: {
        limit: 1,
      },
    },
    {
      label: '官方介绍',
      prop: 'introduction',
      component: 'editor',
    },
  ])

  const onSubmit = async () => {
    const categoryList = [...formData.value.categoryId]

    const params = {
      ...formData.value,
      photo: formData.value.photo[0]?.url,
    }

    modelId.value && (params.modelId = modelId.value)

    if (Array.isArray(categoryList)) {
      params.categoryId = categoryList[categoryList.length - 1]
    }

    await api.product.addModel(params, { method: 'POST' })
    ElMessage({
      message: `${modelId.value ? '修改' : '新增'}型号成功`,
      type: 'success',
    })
    toModelList()
  }

  const toModelList = () => {
    window.history.back()
    // router.go(-1)
    // router.push({
    //   path: '/product/model',
    // })
  }

  const setSeriesOptions = async (id) => {
    schema[4].options = (
      (await api.product.querySeriesList({ brandId: formData.value.brandId })) ?? []
    ).map((item) => {
      return {
        label: item.name,
        value: item.seriesId,
      }
    })
    formData.value.brandSeriesId = id
  }

  const generateOptions = async (categoryId, brandSeriesId) => {
    schema[2].config.options = await getAllCategory()
    schema[3].options = await getAllBrand()
    if (categoryId) {
      formData.value.categoryId = findCategoryPathById(schema[2].config.options, categoryId)
    }
    if (brandSeriesId) {
      await setSeriesOptions(brandSeriesId)
    }
  }

  const init = async () => {
    modelId.value = route.query.modelId
    let ret
    if (modelId.value) {
      ret = await api.product.getModelInfo({ modelId: modelId.value })
      Object.keys(formData.value).forEach((key) => {
        // 类目使用cascader，需特殊处理。系列在生成品牌options后赋值
        if (['category', 'brandSeriesId'].includes(key)) return
        if (key === 'photo') {
          formData.value[key] = [{ url: ret?.photo }]
          return
        }
        ret[key] && (formData.value[key] = ret[key])
      })
      console.log('ret', formData.value)
    }
    // 生成品牌，系列Options
    generateOptions(ret?.categoryId, ret?.brandSeriesId)
  }

  // 品牌变化时，清空已经选择的系列。重新查询系列数据
  watch(
    () => formData.value.brandId,
    (val) => {
      setSeriesOptions('')
    },
  )

  onMounted(() => {
    init()
  })
</script>

<style lang="scss" scoped>
  .model-add-page {
    height: 100%;
    overflow: scroll;
    .card-title {
      font-size: 16px;
      font-weight: bold;
    }
  }
</style>
