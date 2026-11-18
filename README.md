# 简化广州中考公办高中录取模拟系统

软件系统开发 · 课程设计 ｜ 项目组（8 人）· 组长：陈晓烁

模拟广州中考公办高中四个批次的录取流程，覆盖招生计划管理、志愿填报、分数排位、梯度投档与滑档对照分析。

## 项目概览

| 项目 | 内容 |
|---|---|
| 课题 | 简化广州中考公办高中录取模拟系统 |
| 技术栈 | Spring Boot 3 + MySQL 8 + MyBatis-Plus + Vue3 + Element Plus |
| 部署方式 | 本地可复现部署：init.sql + 一键启动脚本 + 部署说明文档，不上线 |
| 团队规模 | 8 人（1 设计 + 3 后端 + 1 前端 + 3 测试） |
| 课程时间 | 第 14/15/16 周周二 13:50-17:20；第 17 周周一周二 8:30-17:20 |

## 目录结构

```
senior-high-admission-system/
├── backend/          # 后端服务（Spring Boot 3 + MyBatis-Plus + MySQL 8）
├── frontend/         # 前端应用（Vue 3 + Vite + Element Plus）
├── sql/              # 数据库脚本（DDL / 种子数据 / 模拟数据）
├── docs/             # 项目文档
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

### 3. IDE 导入说明

- **后端**：用 IDEA 单独打开 `backend/` 目录（不要打开仓库根目录），等 Maven 依赖加载完成后运行 `AdmissionApplication`。
- **前端**：用 VS Code 打开 `frontend/` 目录。

## 关于数据库

基础框架阶段**默认不连接数据库**，因此后端可直接启动、无需先建库。

启用数据库的步骤：

1. 执行 `sql/` 下的脚本创建 `admission_db`；
2. 在 `backend/src/main/resources/application-dev.yml` 填写本机 MySQL 账号密码；
3. 删除 `application.yml` 中的 `spring.autoconfigure.exclude` 配置。

## 团队分工

人员配置依据：业务与录取正确性 35% ＋ 测试与验证 25% ＝ 60%，因此后端引擎线与测试线获得较多人力，前端按一人配置。

| 角色 | 职责 | 贡献占比 |
|---|---|---|
| A · 组长 | 总体设计、规则清单、ER 图、接口契约、引擎调度层、报告统稿 | 14% |
| B · 后端① | 投档引擎核心（批次→梯度→志愿轮次→排序录取） | 15% |
| C · 后端② | 落库与数据一致性（StateWriter 实现、结转流水、事务边界） | 14% |
| G · 后端③ | 业务接口＋数据工程（数据生成器、导入校验、CRUD、统计 API） | 12% |
| D · 前端 | 四大界面、投档执行页、滑档对照 diff、ECharts 图表 | 12% |
| E · 测试① | 小数据集与 12 场景人工推演（预测试基准） | 12% |
| F · 测试② | 自动化测试、五条系统不变量断言、预期实际对照 | 11% |
| H · 测试③ | 滑档案例构造、倒挂分析、演示脚本与彩排 | 10% |

完整分工、阶段计划与风险表详见 [`docs/team-division-and-plan.md`](docs/team-division-and-plan.md)。

## 接口边界契约

| 契约 | 分界 | 作用 |
|---|---|---|
| StateWriter 接口 | B 调用 / C 实现 | 引擎算错归 B、落库错归 C，看接口两侧定位 |
| 投档日志表 | C 写入 / G 只读 | 解释类查询一律走日志表，不得自行推算 |
| REST 契约 | A 冻结 / D 依赖 | D 基于 mock 并行开发；改动契约须全组知会 |

## 协作规范

### 分支策略

`main ← feature/模块名-开发者`，例如 `feature/engine-b`、`feature/statewriter-c`。

- `main` 分支已开启保护：必须走 PR、需他人 Approve、禁止强推、禁止删除
- 任何人不得直接向 `main` 推送

### Commit 规范

`feat|fix|test|docs|chore(模块): 描述`

```text
feat(engine): 实现梯度优先与同梯度志愿优先
fix(statewriter): 修复结转重复执行导致余额重复增加
test(engine): 补 12 场景自动对照断言
docs(plan): 补充阶段 0 交付清单
chore(deps): 升级 MyBatis-Plus 至 3.5.5
```

禁止一次性巨型提交。

### PR 评审规则

- 引擎（B）与数据层（C）的 PR 必须双人评审（A 必审）
- 其余模块单人评审即可
- 合并前确认 `main` 分支可正常启动

### 版本标记

每个课程日末打 tag：`w14`、`w15`、`w16`、`v1.0`。

## 接口约定

- 前端统一以 `/api` 为前缀，经 Vite 代理转发到后端 8080 端口；
- 统一响应体、错误码、分页格式在 CONTRACT 冻结后写入本节。

## 文档索引

| 文档 | 说明 |
|---|---|
| [docs/team-division-and-plan.md](docs/team-division-and-plan.md) | 团队分工与开发规划（责任人、进度、风险、契约） |