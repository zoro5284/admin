<template>
  <div class="common-search__wrapper">
    <el-form ref="formRef" label-width="auto" inline>
      <el-form-item v-for="(field, index) in schema" :key="index" :prop="field.prop" :label="field.label">
        <component
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
    </el-form>
    <div class="btns">
      <el-button type="primary" @click="$emit('search', form)">查询</el-button>
      <el-button @click="reset">重置</el-button>
    </div>
  </div>
</template>
<script setup>
  import { ref, reactive, computed, onMounted, watch } from 'vue';
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
  // import mock from './mock'

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

  const props = defineProps({
    schema: {
      type: Array,
      default: () => []
    },
    form: {
      type: Object,
      default: () => ({})
    }
  })
  const emits = defineEmits(['reset', 'update', 'search'])

  const formRef = ref(null)
  const form = reactive({})

  const updateModelValue = ($event, field) => {
    form[field.prop] = $event
    emits['update', form]
  }

  const reset = () => {
    let empty = {}
    Object.keys(form).forEach(key => {
      empty[key] = undefined
    })
    emits('update', empty)
    emits('reset')
  }

  const init = () => {
    Object.keys(props.form).forEach(key => {
      form[key] = props.form[key]
    })
  }

  watch(() => props.form, () => {
    init()
  }, { immediate: true, deep: true })

</script>


<style lang="scss" scoped>
  .common-search__wrapper {
    ::v-deep .el-form-item__label{
      font-weight: bold;
    }
    display: flex;
    .btns{
      margin-left: 20px;
    }
  }
</style>
