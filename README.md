# 知简 · Daily Brief

个人新闻摘要聚合与英语学习站点。只展示来源摘要与原文链接，不进行原创新闻采编，也不转载新闻全文。

此开发分支导入现有知简站点的源码，作为 `BambooSword/my-news` 的后续开发基础。2017 年的 React 学习项目原样保留在 [`archive/react-learning-2017`](https://github.com/BambooSword/my-news/tree/archive/react-learning-2017)；旧版检查见 [迁移记录](docs/migration/2026-11-02-repository-audit.md)。

## 已有功能

- 新闻首页：国内、国际、科技分类，来源、发布时间、摘要和原文跳转。
- 新闻详情：只展示摘要和来源链接。
- 每日精选：AI、科技和欧美外贸文章；中文导读、推荐理由、阅读角度及英文导读。
- 学习收藏：单词/金句、英美 IPA、释义、原句、标签、笔记和学习状态；按登录账号存入云端数据库。
- 邮件简报：确认订阅、退订和每日发送接口；邮件服务未配置时不会假装订阅成功或发送邮件。
- 关于、隐私说明、免责声明及响应式布局。

新闻源当前为 BBC News RSS；新闻摘要保留来源原文，可能是英文。每日精选由维护者或已授权任务核实后写入，不绕过 Medium 等平台的访问限制。

## 技术与目录

React 19 + TypeScript + Tailwind CSS 4；使用 Vinext/Vite 与 Cloudflare Workers，D1 + Drizzle 持久化，Sites 提供托管身份与访问控制。锁定版本见 `package.json` 和 `pnpm-lock.yaml`，不是纯静态前端。

```text
app/                 页面、客户端界面和服务端 API
app/chatgpt-auth.ts   Sites 托管登录辅助函数
db/                  D1 数据库访问与表结构
drizzle/             只含建表结构的迁移，不含线上数据
lib/                 邮件、示例精选与公共工具
components/          共享组件
build/、scripts/     Sites/Vinext 构建与运行支持
.openai/hosting.json  既有站点标识及逻辑绑定名称，不含访问凭据
UPDATE-INSTRUCTIONS.md 每日内容维护约定
```

## 本地开发

要求 Node.js `>=22.13.0`，以及项目指定的 pnpm `11.25.0`。建议在 Linux 或兼容的开发容器中运行；Sites 提供的环境按其安装与构建流程处理。

```sh
corepack pnpm install --frozen-lockfile
corepack pnpm dev
corepack pnpm exec tsc --noEmit --incremental false
corepack pnpm build
```

本地 D1 需要初始化表结构后，新闻和收藏等接口才能工作。完整的平台登录、执行配置与本地数据库说明保留在 [Sites 运行文档](docs/SITES-RUNTIME.md)。独立部署不能只上传静态 HTML：需配置 Worker、D1 及兼容的身份认证和访问边界。

目前未配置自动化业务测试套件；类型检查和构建成功不等于邮件投递、真实用户登录、跨设备同步等线上链路全部验证通过。

## 密钥与用户数据在哪里

| 内容 | 当前存储位置 | 是否提交到 GitHub |
| --- | --- | --- |
| 邮件 API 密钥 `RESEND_API_KEY` | Sites 服务端生产运行环境 | 否；只保留变量名称与空模板 |
| 发件人配置 `NEWSLETTER_FROM` | 同上，不是订阅者名单 | 否 |
| 平台服务访问凭据 / Git 临时凭据 | 平台提供，自动化会话中临时使用 | 否 |
| 订阅邮箱、确认状态、订阅令牌 | D1 `subscriptions` 表 | 否 |
| 单词、金句、IPA、笔记、学习状态 | D1 `collections` 表，按 `user_id` 隔离 | 否 |
| 聚合新闻与精选记录 | D1 `content_items` 表 | 不导出线上记录；源码仅含明确的示例精选 |

2026-11-02 检查时，Sites 生产环境变量列表为空，邮件服务尚未配置。数据库连接由 Sites 提供 `DB` 绑定，不需要把数据库密码写入前端。

仓库只有数据库 schema，不包含数据库文件、订阅名单或收藏导出。`user_id` 区分收藏归属，不是数据库内逐条加密；当前 schema 也没有对订阅邮箱做应用层加密。不要把账号隔离误解成端到端加密。

本地敏感配置必须保持忽略，`.env.example` 只作为空值说明。生产值应通过 Sites 的环境变量设置配置，不能写进 `NEXT_PUBLIC_*`、`VITE_*`、前端代码、README 或 Git 历史。

## 公开源码不等于公开站点

**当前共享写入入口依赖既有站点的私有访问边界。** 单词收藏还会在服务端校验登录账号。公开 GitHub 源码不改变站点访问权限，也不公开 D1 数据。

若以后要让未登录访客访问网站，必须先给 `/api/refresh` 和相关管理操作增加独立授权、检查邮件接口的滥用防护，再调整站点受众。不要直接将当前部署切换为公开访问。

本次 GitHub 源码导入不重新部署，不搬迁数据库，不修改现有站点权限或每日任务。GitHub 仓库与 Sites 托管源码仓库目前是两个仓库，合并此 PR 不会自动部署到 Sites。

## 已知待办

- `/api/content` 目前对新闻与精选共用 250 条返回上限，较早精选可能被新新闻挤出；需分开查询和分页。
- 补充采集去重、权限隔离、收藏 CRUD、订阅确认/退订及邮件幂等的自动化测试。
- 配置邮件服务后，验证确认邮件与已确认订阅者简报的完整投递链路。
- 当前没有配置 GitHub 自动部署；发布需继续遵循 Sites 工作流。

项目包含的第三方运行支持与样式文件附有其许可证，迁移时予以保留。旧项目的 ISC 字段不替代这些第三方许可。
