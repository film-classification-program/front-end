# 基于LLM的电影搜索工具

一个基于Vue 3、Vite和Node.js开发的电影搜索前端界面，采用Google Search风格设计。

## 功能特点

- 简洁的Google风格搜索界面
- 响应式设计，适配不同设备屏幕
- 搜索结果页面，展示电影详细信息
- 蓝色电影标题链接，点击可在新标签页打开
- 可扩展的组件架构
- 连接后端API服务获取电影数据

## 快速开始

### 安装依赖

```bash
npm install
```

### 配置API地址

默认API地址为`http://localhost:4000`。您可以通过以下两种方式修改：

1. 修改项目根目录下的`.env`文件：

```
VITE_FILM_WEB_API_HOST=http://your-api-host:port
```

2. 或者在启动命令前设置环境变量：

```bash
# Linux/macOS
export VITE_FILM_WEB_API_HOST=http://your-api-host:port
npm run dev

# Windows
set VITE_FILM_WEB_API_HOST=http://your-api-host:port
npm run dev
```

### 开发模式运行

```bash
npm run dev
```

### 构建生产版本

```bash
npm run build
```

### 预览生产构建

```bash
npm run preview
```

## 项目结构

```
film-search-tool/
├── src/
│   ├── assets/
│   │   ├── main.css
│   │   └── film-logo.svg
│   ├── components/
│   │   ├── FilmLogo.vue
│   │   ├── SearchBar.vue
│   │   ├── FilmSearch.vue
│   │   └── SearchResults.vue
│   ├── router/
│   │   └── index.js
│   ├── services/
│   │   ├── apiConfig.js   # API配置
│   │   └── filmApi.js     # 电影API服务
│   ├── App.vue
│   └── main.js
├── .env                    # 环境变量配置
├── index.html
├── package.json
├── vite.config.js
└── README.md
```

## 页面路由

- `/` - 主页，显示搜索界面
- `/search?desc=关键词` - 搜索结果页面，显示匹配的电影列表

## API响应格式

后端API返回的JSON数据格式如下：

```json
{
    "films": [
        {
            "name_chinese": "点球成金",
            "name_english": "Monkeyball",
            "year": 2011,
            "link": "https://movie.douban.com/subject/3023164/",
            "type": "剧情 / 传记 / 运动",
            "duration_minutes": 133,
            "rating": 8.3,
            "alias": "魔球(港/台) / 钱与球 / 金球",
            "language": "英语",
            "imdb": "tt1210166",
            "starring": "布拉德·皮特 / 乔纳·希尔 / 菲利普·塞默·霍夫曼",
            "director": "贝尼特·米勒"
        }
    ],
    "success": true,
    "error_code": "",  
    "error_message": "",
    "timestamp": 1745206684
}
```

## 未来扩展计划

- 集成更多LLM后端API功能
- 添加电影详情页
- 实现搜索结果分页和过滤
- 添加电影分类功能
- 支持高级搜索选项

## 许可证

MIT 