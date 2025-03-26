<template>
  <el-form ref="formRef" :model="form" label-width="80px" :rules="formRules">
    <el-form-item
      v-for="(field, index) in schema"
      :key="index"
      :prop="field.prop"
      :label="field.label"
    >
      <template v-if="field.component === 'upload'">
        <Upload
          :config="field.config"
          :file-list="form[field.prop]"
          @update:file-list="updateModelValue($event, field)"
        />
      </template>
      <component
        v-else
        :is="typeof field.component === 'string' ? componentMap[field.component] : field.component"
        v-bind="field.config"
        :modelValue="form[field.prop]"
        @update:modelValue="updateModelValue($event, field)"
      >
        <!-- 处理 ElRadio | ElSelect | ElOption-->
        <template v-if="['radio', 'select', 'checkbox'].includes(field.component)">
          <component
            v-for="opt in field.options"
            :is="slotComponentMap[field.component]"
            :key="opt.value"
            :value="opt.value"
            :label="opt.label"
          />
        </template>
      </component>
    </el-form-item>
    <template v-if="footerVisible">
      <el-button type="primary" @click="onSubmit">提交</el-button>
      <el-button @click="onCannel">取消</el-button>
    </template>
  </el-form>
</template>
<script setup>
  import { ref, h, reactive, nextTick } from 'vue'
  import {
    ElCheckboxGroup,
    ElCheckbox,
    ElRadioGroup,
    ElRadio,
    ElSelect,
    ElOption,
    ElDatePicker,
    ElInput,
    ElUpload,
  } from 'element-plus'
  import Upload from '@/components/upload/Index.vue'

  const componentMap = {
    input: ElInput,
    radio: ElRadioGroup,
    checkbox: ElCheckboxGroup,
    datePicker: ElDatePicker,
    select: ElSelect,
    upload: ElUpload,
  }

  const slotComponentMap = {
    radio: ElRadio,
    checkbox: ElCheckbox,
    select: ElOption,
  }

  const emits = defineEmits(['submit', 'submit-failed', 'cancel', 'update:form'])
  const props = defineProps({
    footerVisible: {
      type: Boolean,
      default: true,
    },
    labelWidth: {
      type: String,
      default: '120px',
    },
    schema: {
      type: Array,
      default: () => [],
    },
    form: {
      type: Object,
      default: () => ({}),
    },
  })

  const formRef = ref(null)
  const formRules = reactive({})

  // 自定义校验
  const generateCustomValidator = ({ type, prop }) => {
    if (type === 'array') {
      const validator = (rule, value, callback) => {
        if (props.form[prop].length === 0) {
          callback(new Error(`${form[prop]}不能为空`))
        } else {
          callback()
        }
      }
      return [[{ validator, trigger: 'change' }]]
    }
  }

  const updateModelValue = async ($event, field) => {
    emits('update:form', { ...props.form, [field.prop]: $event })
    await nextTick()
    // 数组更新值的时候，统一校验一次表单，清空红色部分
    if (Array.isArray(props.form[field.prop])) {
      formRef.value.validateField(field.prop).catch((err) => {
        console.log('validate-field', err)
      })
    }
  }

  // init
  const generateRules = () => {
    props.schema.forEach((field) => {
      if (Array.isArray(props.form[field.prop])) {
        formRules[field.prop] = generateCustomValidator({ type: 'array', prop: field.prop })
      }

      formRules[field.prop] = field.rule || [
        { required: true, message: `${field.label}不能为空`, trigger: 'blur' },
      ]
    })
    console.log('form-rules', formRules)
  }

  // 初始化生成规则
  const init = () => {
    generateRules()
  }

  init()

  // btn operations
  const onSubmit = () => {
    if (!formRef.value) return
    formRef.value.validate((valid, field) => {
      if (valid) {
        emits('submit')
      } else {
        emits('submit-failed', field)
      }
    })
  }

  const onCannel = () => {
    emits('cancel')
  }
</script>
<style lang="less" scoped></style>
