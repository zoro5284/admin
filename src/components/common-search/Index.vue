<template>
  <div class="common-search__wrapper">
    <el-form ref="formRef" label-width="auto" inline>
      <el-form-item
        v-for="(field, index) in schema"
        :key="index"
        :prop="field.prop"
        :label="field.label"
      >
        <template v-if="field.component === 'cascader'">
          <ElCascader
            clearable
            :modelValue="form[field.prop]"
            @update:modelValue="updateModelValue($event, field)"
            v-bind="field.config"
          />
        </template>
        <component
          v-else
          :is="
            typeof field.component === 'string' ? componentMap[field.component] : field.component
          "
          clearable
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
      <el-button type="primary" @click="$emit('search')">查询</el-button>
      <el-button @click="reset">重置</el-button>
    </div>
  </div>
</template>
<script setup>
  import { ref, reactive, computed, onMounted, watch } from 'vue'
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
    ElCascader,
  } from 'element-plus'
  // import mock from './mock'

  const componentMap = {
    input: ElInput,
    radio: ElRadioGroup,
    checkbox: ElCheckboxGroup,
    datePicker: ElDatePicker,
    select: ElSelect,
    upload: ElUpload,
    cascader: ElCascader,
  }
  const slotComponentMap = {
    radio: ElRadio,
    checkbox: ElCheckbox,
    select: ElOption,
  }

  const props = defineProps({
    schema: {
      type: Array,
      default: () => [],
    },
    form: {
      type: Object,
      default: () => ({}),
    },
  })
  const emits = defineEmits(['reset', 'search', 'update:form'])

  const formRef = ref(null)

  const updateModelValue = ($event, field) => {
    emits('update:form', { ...props.form, [field.prop]: $event })
  }

  const reset = () => {
    let empty = {}
    Object.keys(props.form).forEach((key) => {
      empty[key] = undefined
    })
    emits('update:form', empty)
    emits('reset')
  }
</script>

<style lang="scss" scoped>
  .common-search__wrapper {
    ::v-deep .el-form-item__label {
      font-weight: bold;
    }
    display: flex;
    .btns {
      min-width: 200px;
      margin-left: 28px;
    }
  }
</style>
