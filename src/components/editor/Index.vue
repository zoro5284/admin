<template>
  <div>
    <!-- api-key="jzlds2e6urz6akm9wxp4f70mnwg83d8fovsialqazxowyity" -->
    <Editor
      :model-value="modelValue"
      @update:modelValue="(v) => $emit('update:modelValue', v)"
      :init="editorConfig"
    />
  </div>
</template>

<script setup>
  import { ref } from 'vue'
  import Editor from '@tinymce/tinymce-vue'
  import 'tinymce/tinymce' // 引入 TinyMCE 核心模块
  import 'tinymce/models/dom' // 引入 DOM 模型（如果你需要处理 DOM）
  import 'tinymce/plugins/link' // 引入 link 插件
  import 'tinymce/plugins/image' // 引入 image 插件
  import 'tinymce/plugins/code' // 引入 code 插件
  import 'tinymce/themes/silver'
  import 'tinymce/icons/default/icons' // 引入默认图标集

  const props = defineProps({
    modelValue: {
      type: String,
      default: '',
    },
    config: {
      type: Object,
      default: () => ({}),
    },
  })

  const editorConfig = ref({
    height: 700,
    width: 375,
    branding: false,
    menubar: false,
    statusbar: false,
    promotion: false,
    plugins: 'image code link',
    toolbar:
      'undo redo | blocks fontfamily fontsize | formatselect | bold italic underline strithrough | link image | forecolor backcolor | lineheight alignleft aligncenter alignright',
    images_upload_handler: (blobInfo, success) =>
      new Promise((resolve, reject) => {
        const reader = new FileReader()
        reader.readAsDataURL(blobInfo.blob())
        reader.onload = function (e) {
          console.log('e', e)
          resolve(e.target.result)
        }
      }),
    language: 'zh_CN',
    skin_url: '/tinymce/skins/ui/oxide',
    content_css: '/tinymce/skins/content/default/content.min.css',
    language_url: 'tinymce/zh_CN.js',
    ...props.config,
  })
</script>

<style></style>
