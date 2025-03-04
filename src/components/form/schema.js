import { h } from 'vue'

export default [
  // 自定义Comp
  {
    prop: 'custom',
    label: '自定义',
    value: 'a',
    component: () => h('div', '自定义Comp'),
  },
  // Input
  {
    prop: 'input',
    label: 'Input',
    component: 'input',
    value: 'b',
    config: {
      //   type: 'textarea',
      placeholder: '这是一个input',
      style: {
        width: '200px',
      },
    },
  },
  // Radio
  {
    prop: 'radio',
    label: 'Radio',
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
  // Checkbox
  {
    prop: 'checkbox',
    label: 'CheckBox',
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
  // DatePicker
  {
    prop: 'datepicker',
    label: 'DatePicker',
    component: 'datePicker',
    value: '2025-01-02',
    config: {
      type: 'date', // date\ datetime、month
      format: 'YYYY/MM/DD',
      'value-format': 'YYYY-MM-DD',
      placeholder: '请选择时间',
    },
  },
  // ElSelect
  {
    prop: 'select',
    label: 'ElSelect',
    component: 'select',
    config: {
      style: {
        width: '200px',
      },
    },
    options: [
      {
        value: '1',
        label: 'Select1',
      },
      {
        value: '2',
        label: 'Select2',
      },
      {
        value: '3',
        label: 'Select3',
      },
      {
        value: '4',
        label: 'Select4',
      },
    ],
  },
]
