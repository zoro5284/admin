//  src/utils/request.ts
import axios from 'axios'
import { ElMessageBox } from 'element-plus'

// import { useUserStoreHook } from '@/store/modules/user'

// 创建 axios 实例
const service = axios.create({
  baseURL: import.meta.env.VITE_APP_BASE_API,
  timeout: 50000,
  headers: { 'Content-Type': 'application/json;charset=utf-8' },
})

// 请求拦截器
service.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token')
    if (token) {
      config.headers.Authorization = token
    }
    return config
  },
  (error) => {
    return Promise.reject(error)
  },
)

// 响应拦截器
service.interceptors.response.use(
  (response) => {
    const silent = response.config.silent
    console.log('silent', silent, response.config)
    const { code, msg } = response.data
    // 正常返回
    if (code === 0) {
      return promise.resolve(response.data)
    }

    // ElMessage.error(msg || '系统出错')
    // return Promise.reject(new Error(msg || 'Error'))
  },
  (error) => {
    if (error.response.data) {
      const { code, msg } = error.response.data
      // token 过期，跳转登录页
      if (code === 10003) {
        // ElMessageBox.confirm('当前页面已失效，请重新登录', '提示', {
        //   confirmButtonText: '确定',
        //   cancelButtonText: '取消',
        //   type: 'warning',
        // }).then(() => {
        //   window.location.href = '/login'
        // })
        // 其他报错情况  待完善
      } else {
        ElMessage.error(msg || '系统出错')
      }
    }
    return Promise.reject(error.message)
  },
)

// 导出 axios 实例
export default service
