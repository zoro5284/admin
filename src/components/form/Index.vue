<template>
  <el-form ref="formRef" :model="form" label-width="80px" :rules="formRules">
    <el-form-item
      v-for="(field, index) in schema"
      :key="index"
      :prop="field.prop"
      :label="field.label"
    >
      <component
        :is="typeof field.component === 'string' ? componentMap[field.component] : field.component"
        v-bind="field.elConfig"
        :modelValue="form[field.prop]"
        @update:modelValue="updateModelValue($event, field)"
      >
        <template v-if="field.component === 'radio'">
          <el-radio v-for="option in field.options" :value="option.value" :label="option.label">{{
            option.label
          }}</el-radio>
        </template>
        <template v-if="field.component === 'checkbox'">
          <el-checkbox
            v-for="option in field.options"
            :value="option.value"
            :label="option.label"
            >{{ option.label }}</el-checkbox
          >
        </template>
      </component>
    </el-form-item>
    <el-button type="primary" @click="onSubmit">提交</el-button>
    <el-button @click="onCannel">取消</el-button>
  </el-form>
</template>
<script setup>
import { ref, h, reactive } from 'vue'
import { ElCheckboxGroup, ElInput, ElRadioGroup } from 'element-plus'

const componentMap = {
  input: ElInput,
  radio: ElRadioGroup,
  checkbox: ElCheckboxGroup,
}
const emits = defineEmits(['onSubmit', 'onSubmitFailed', 'onCancel'])
const props = defineProps({
  labelWidth: {
    type: String,
    default: '80px',
  },
  schema: {
    type: Array,
    default: () => [
      {
        prop: 'first',
        label: '第一个',
        value: '111',
        component: () => h('div', 'helloworld'),
      },
      {
        prop: 'second',
        label: '第二个',
        component: 'input',
        value: '222',
        elConfig: {
          type: 'textarea',
          placeholder: '第二个默认值',
          style: {
            width: '200px',
          },
        },
      },
      {
        prop: 'third',
        label: '第三个',
        component: 'radio',
        value: '2',
        options: [
          {
            value: '1',
            label: 'radio1',
          },
          {
            value: '2',
            label: 'radio2',
          },
        ],
      },
      {
        prop: 'fourth',
        label: '第四个',
        component: 'checkbox',
        value: ['1', '3'],
        options: [
          {
            value: '1',
            label: 'checkbox1',
          },
          {
            value: '2',
            label: 'checkbox2',
          },
          {
            value: '3',
            label: 'checkbox3',
          },
          {
            value: '4',
            label: 'checkbox4',
          },
        ],
      },
    ],
  },
})

const formRef = ref(null)
const form = reactive({})
const formRules = reactive({})

const updateModelValue = ($event, field) => {
  form[field.prop] = $event
}

// init
const generateForm = () => {
  props.schema.forEach((field) => {
    form[field.prop] = field.value
    formRules[field.prop] = field.rule || [
      { required: true, message: `${field.label}不能为空`, trigger: 'blur' },
    ]
  })
}

const init = () => {
  generateForm()
  console.log('form', form, formRules)
}

init()

// btn operations
const onSubmit = () => {
  if (!formRef.value) return
  formRef.value.validate((valid, field) => {
    if (valid) {
      emits('onSubmit', form)
    } else {
      emits('onSubmitFailed', field)
    }
  })
}

const onCannel = () => {
  emits('onCancel')
}
</script>
<style lang="less" scoped></style>
