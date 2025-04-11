<template>
  <div class="model-version-add-page">
    <el-card>
      <div slot="header">基础信息</div>
      <Form v-model="baseForm" :schema="schema" :footer-visible="false" />
    </el-card>
    <ColorSet v-model:colorList="colorList" />
    <CustomSet v-model:propertyList="propertyList" />
    <PriceSet :color-list="colorList" :property-list="propertyList" v-model:priceList="priceList" />
    <el-card>
      <div slot="header">图文描述</div>
      <Form
        ref="introductionFormRef"
        v-model="introductionForm"
        :schema="schema2"
        :footer-visible="false"
      />
    </el-card>
    <div style="margin-top: 38px; margin-left: 38px">
      <el-button type="primary" :style="{ marginLeft: '40px' }" @click="onSubmit">提交</el-button>
      <el-button @click="onCannel">取消</el-button>
    </div>
  </div>
</template>
<script setup>
  import { ref, watchEffect, h } from 'vue'
  import { Form } from '@/components'
  import ColorSet from './components/ColorSet.vue'
  import CustomSet from './components/CustomSet.vue'
  import PriceSet from './components/PriceSet.vue'
  import SellingPoints from './components/SellingPoints.vue'
  import { isEqual, omit } from 'lodash-es'
  import schema from '@/components/form/schema'
  import router from '@/router'
  import { ElMessage } from 'element-plus'

  // 基本信息处理
  const baseFormRef = ref(null)
  const baseForm = ref({
    name: '',
    description: '',
    model: [],
    weight: [],
    logo: [],
    kuanshi: [],
    sellingPoints: [],
  })

  // 图文描述
  const introductionFormRef = ref(null)
  const introductionForm = ref({
    imgs: [],
    richtext: '',
  })

  const schema = [
    {
      label: '版本名',
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
      label: '版本描述',
      prop: 'description',
      component: 'textarea',
      rule: [{ required: false }],
      config: {
        placeholder: '请输入',
        style: {
          width: '300px',
        },
      },
    },
    {
      label: '所属版本',
      prop: 'model',
      component: 'select',
      config: {
        placeholder: '请选择',
        style: {
          width: '300px',
        },
      },
    },
    {
      label: '权重',
      prop: 'weight',
      component: 'select',
      config: {
        placeholder: '请选择',
        style: {
          width: '300px',
        },
      },
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
      label: '款式',
      prop: 'kuanshi',
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
      label: '卖点',
      prop: 'sellingPoints',
      component: () =>
        h(SellingPoints, {
          modelValue: baseForm.value.SellingPoints,
          'onUpload:modelValue': (val) => (baseForm.value.sellingPoints = val),
        }),
    },
  ]

  const schema2 = [
    {
      prop: 'imgs',
      label: '产品主图',
      component: 'upload',
      config: {
        autoUpload: false,
      },
    },
    {
      prop: 'richtext',
      label: '官方介绍',
      component: 'editor',
      config: {
        'list-type': 'picture-card',
        config: {
          width: 'auto',
        },
      },
    },
  ]

  // 颜色 & 规格 & 价格 处理
  const colorList = ref([])
  const propertyList = ref([])
  const priceList = ref([])

  const validatePriceTable = () => {
    const flag = priceList.value.some((row) => Object.values(row).some((col) => !col))
    return flag ? Promise.resolve(flag) : Promise.reject(flag)
  }

  const onSubmit = async () => {
    await baseForm.value.validateForm()
    try {
      await validatePriceTable()
    } catch (error) {
      ElMessage({
        message: '请填写所有价格属性',
        type: 'warning',
      })
      return
    }
    await introductionFormRef.value.validateForm()
    // 提交接口
    console.log('submit')
  }

  const onCannel = () => {
    router.go(-1)
    // router.push('/product/model-version/list')
  }

  watchEffect(() => {
    const list = propertyList.value.reduce(
      (acc, { name, values }) => {
        return acc.flatMap((obj) => values.map((value) => ({ ...obj, [name]: value })))
      },
      colorList.value.map(({ color }) => ({ color })),
    )

    list.forEach((row) => {
      const sameRow = priceList.value.find((originRow) => {
        return isEqual(row, omit(originRow, 'price'))
      })
      row.price = sameRow?.price || ''
    })

    priceList.value = list
  })
</script>
<style lang="scss" scoped></style>
