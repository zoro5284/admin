<template>
  <el-image
    :style="{ width, height }"
    :src="url"
    :preview-src-list="previewSrcList"
    fit="fill"
    @show="onPreviewShow"
  >
    <template #toolbar="{ actions, reset }">
      <el-icon @click="actions('zoomOut')"><ZoomOut /></el-icon>
      <el-icon @click="actions('zoomIn')"><ZoomIn /></el-icon>
      <el-icon @click="reset"><Refresh /></el-icon>
    </template>
  </el-image>
</template>
<script setup>
  import { ref, computed, nextTick, watch } from 'vue'
  import { ZoomIn, ZoomOut, Refresh } from '@element-plus/icons-vue'
  import { useEventListener } from '@vueuse/core'

  const props = defineProps({
    url: {
      type: String,
      required: true,
    },
    width: {
      type: String,
      default: '100px',
    },
    height: {
      type: String,
      default: '100px',
    },
    defaultPosition: {
      type: Array,
      required: false,
    },
  })

  const isUndef = (v) => !v && v !== 0

  const previewImg = ref(null)
  const markedUrl = ref('')

  const previewSrcList = computed(() => {
    return [markedUrl.value || props.url]
  })

  const onPreviewShow = async (e) => {
    bindImageListener()
  }

  const bindImageListener = async () => {
    await nextTick()
    previewImg.value = document.querySelector('.el-image-viewer__img')
    useEventListener(previewImg.value, 'click', onPreviewClick)
  }

  const onPreviewClick = async (event) => {
    // 获取缩放比例
    const transform = window.getComputedStyle(previewImg.value).transform
    const matches = transform.match(/matrix\(([\d.]+),/)
    const scale = matches ? parseFloat(matches[1]) : 1
    // 获取图片真实像素 & 显示像素 宽高
    const { naturalWidth, naturalHeight, width, height } = previewImg.value
    // 获取图片位置
    const rect = previewImg.value.getBoundingClientRect()
    const imgLeft = rect.left
    const imgBottom = rect.bottom
    // 获取鼠标位置
    const mouseLeft = event.clientX
    const mouseBottom = event.clientY
    // 计算相对坐标(相对图片真实像素)
    let xPixel = (mouseLeft - imgLeft) / ((width * scale) / naturalWidth)
    let yPixel = (imgBottom - mouseBottom) / ((height * scale) / naturalHeight)
    markedUrl.value = await drawDotOnImage(xPixel, yPixel)
    // 替换图片后，重新对图片添加点击事件
    bindImageListener()
  }

  const drawDotOnImage = (x, y) => {
    return new Promise((resolve, reject) => {
      const img = new Image()
      img.src = props.url
      img.onload = function () {
        const canvas = document.createElement('canvas')
        const ctx = canvas.getContext('2d')
        canvas.width = img.naturalWidth
        canvas.height = img.naturalHeight
        ctx.drawImage(img, 0, 0)

        const dotX = x
        const dotY = canvas.height - y
        ctx.fillStyle = 'red'
        ctx.fillRect(dotX, dotY, 3, 3)
        resolve(canvas.toDataURL('image/png'))
      }
    })
  }

  watch(
    () => props.defaultPosition,
    async (val) => {
      const [x, y] = val || []
      if (isUndef(x) && isUndef(y)) return
      markedUrl.value = await drawDotOnImage(x, y)
    },
    {
      immediate: true,
      deep: true,
    },
  )
</script>
<style lang="scss" scoped></style>
