<template>
  <div class="home">
    <el-card class="box" shadow="never">
      <template #header>
        <div class="header">
          <span class="title">中考招生录取模拟系统</span>
          <el-tag type="info" size="small">基础框架</el-tag>
        </div>
      </template>

      <p class="desc">
        前后端分离骨架已就绪。当前页面用于验证开发环境连通性，
        业务模块将在组内协商确定接口规范后逐步补充。
      </p>

      <el-descriptions :column="2" border size="small">
        <el-descriptions-item label="前端">Vue 3 + Vite + Element Plus</el-descriptions-item>
        <el-descriptions-item label="后端">Spring Boot 3 + MyBatis-Plus</el-descriptions-item>
        <el-descriptions-item label="前端端口">5173</el-descriptions-item>
        <el-descriptions-item label="后端端口">8080</el-descriptions-item>
      </el-descriptions>

      <el-divider />

      <div class="status-row">
        <span class="label">后端连通性：</span>
        <el-tag v-if="loading" type="warning">检测中…</el-tag>
        <el-tag v-else-if="connected" type="success">连通 ✓</el-tag>
        <el-tag v-else type="danger">未连通 ✗</el-tag>
        <el-button size="small" :loading="loading" @click="check">重新检测</el-button>
      </div>

      <el-alert
        v-if="!loading && !connected"
        class="tip"
        type="error"
        :closable="false"
        title="后端未响应"
        description="请确认后端已启动（mvn spring-boot:run，端口 8080），且 vite 代理配置正确。"
        show-icon
      />

      <el-alert
        v-if="!loading && connected"
        class="tip"
        type="success"
        :closable="false"
        :title="`后端响应：status=${health.status}`"
        :description="`服务：${health.service}　时间：${health.time}`"
        show-icon
      />
    </el-card>
  </div>
</template>

<script setup>
import { onMounted, ref } from 'vue'
import { getHealth } from '@/api/health'

const loading = ref(false)
const connected = ref(false)
const health = ref({})

async function check() {
  loading.value = true
  connected.value = false
  try {
    const data = await getHealth()
    health.value = data || {}
    connected.value = data?.status === 'UP'
  } catch (e) {
    connected.value = false
  } finally {
    loading.value = false
  }
}

onMounted(check)
</script>

<style scoped>
.home {
  min-height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 32px 16px;
}

.box {
  width: 100%;
  max-width: 720px;
}

.header {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.title {
  font-size: 16px;
  font-weight: 600;
}

.desc {
  margin: 0 0 16px;
  color: #606266;
  font-size: 14px;
  line-height: 1.7;
}

.status-row {
  display: flex;
  align-items: center;
  gap: 10px;
}

.label {
  font-size: 14px;
  color: #606266;
}

.tip {
  margin-top: 16px;
}
</style>