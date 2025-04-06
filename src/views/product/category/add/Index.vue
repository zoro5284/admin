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
  import { ElCascader, ElMessage } from 'element-plus'
  import { useRoute, useRouter } from 'vue-router'
  import { getAllCategory, findCategoryPathById } from '@/utils'
  import useApi from '@/api'

  const router = useRouter()
  const route = useRoute()
  const api = useApi()

  const categoryId = ref()
  const formData = ref({
    name: '',
    desc: '',
    parentCategoryId: '',
  })

  const schema = reactive([
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
      prop: 'desc',
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
      prop: 'parentCategoryId',
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
  ])

  const onSubmit = async () => {
    const categoryList = formData.value.parentCategoryId
    const params = {
      ...formData.value,
      parentCategoryId: categoryList[categoryList.length - 1],
    }
    categoryId.value && (params.categoryId = categoryId.value)
    await api.product.addCategory(params, { method: 'POST' })
    ElMessage({
      message: `${categoryId.value ? '修改' : '新增'}类目成功`,
      type: 'success',
    })
    toCategoryList()
  }

  const toCategoryList = () => {
    router.push({
      path: '/product/category',
    })
  }

  const generateOptions = async (id) => {
    const options = await getAllCategory([categoryId.value])
    schema[2].config = { ...schema[2].config, options }

    if (id) {
      console.log('path', findCategoryPathById(options, id))
      formData.value.parentCategoryId = findCategoryPathById(options, id)
    }
  }

  const init = async () => {
    categoryId.value = route.query.categoryId
    let ret
    if (categoryId.value) {
      ret = await api.product.getCategoryInfo({ categoryId: categoryId.value })
      Object.keys(formData.value).forEach((key) => {
        // 上级类目需特殊处理
        if (key === 'parentCategoryId') return
        ret[key] && (formData.value[key] = ret[key])
      })
    }
    // 生成上级类目OPTIONS
    await generateOptions(ret?.parentCategoryId)
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
