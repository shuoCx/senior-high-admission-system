import request from './request'

/** 健康检查：验证前后端链路 */
export function getHealth() {
  return request.get('/health')
}