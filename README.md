# 中考招生录取模拟系统

软件系统开发实践 · 课程设计

一个模拟中考四批次录取流程的系统，覆盖招生计划管理、志愿填报、分数排位与投档录取。

## 目录结构

```
senior-high-admission-system/
├── backend/          # 后端服务（Spring Boot 3 + MyBatis-Plus + MySQL）
├── frontend/         # 前端应用（Vue 3 + Vite + Element Plus）
├── sql/              # 数据库脚本（建表 / 字典 / 模拟数据）
└── README.md
```

## 环境要求

| 工具 | 版本 |
|---|---|
| JDK | 17 |
| Maven | 3.8+ |
| Node.js | 18+ |
| MySQL | 8.0+ |

## 快速启动

### 1. 启动后端

```bash
cd backend
mvn spring-boot:run
```

启动成功后访问 <http://localhost:8080/api/health>，应返回：

```json
{ "status": "UP", "service": "admission-server", "time": "..." }
```

### 2. 启动前端

```bash
cd frontend
npm install
npm run dev
```

访问 <http://localhost:5173>，页面显示「后端连通 ✓」说明链路正常。

## 关于数据库

基础框架阶段**默认不连接数据库**，因此后端可直接启动、无需先建库。

启用数据库的步骤：

1. 执行 `sql/` 下的脚本创建 `admission_db`；
2. 在 `backend/src/main/resources/application-dev.yml` 填写本机 MySQL 账号密码；
3. 删除 `application.yml` 中的 `spring.autoconfigure.exclude` 配置。

## 接口约定

- 前端统一以 `/api` 为前缀，经 Vite 代理转发到后端 8080 端口；
- 统一响应体、错误码、分页格式等待组内协商后写入本文档。

## 团队协作

（分工表、分支规范待补充）