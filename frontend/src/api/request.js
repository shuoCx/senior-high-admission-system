import axios from 'axios'
import { ElMessage } from 'element-plus'

/**
 * axios 实例。
 *
 * baseURL 取自 .env.development 的 VITE_API_BASE_URL（默认 /api），
 * 实际请求经 vite 代理转发到 http://localhost:8080。
 *
 * 响应拦截器目前只做错误提示；组内协商统一响应体（如 { code, msg, data }）后，
 * 在这里集中做 code 判断，避免每个页面重复写。
 */
const request = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || '/api',
  timeout: 15000
})

// 请求拦截器：后续可在此统一附加 token
request.interceptors.request.use(
  (config) => config,
  (error) => Promise.reject(error)
)

// 响应拦截器：统一异常提示
request.interceptors.response.use(
  (response) => response.data,
  (error) => {
    const msg =
      error.response?.data?.message ||
      error.response?.data?.msg ||
      error.message ||
      '请求失败'
    ElMessage.error(msg)
    return Promise.reject(error)
  }
)

export default request