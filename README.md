# front-cli-preset

基于 vue-cli3 preset 搭建的前端项目模板

## 快速开始

```
# 安装 vue-cli 3.0
npm install -g @vue/cli

# 根据远程 preset 创建项目
vue create --preset ducenand/front-cli-preset my-project
# or
vue create --preset direct:https://github.com/ducenand/front-cli-preset.git my-project --clone

# 本地预览
cd my-project && npm run serve
```

## 项目模板具体目录结构

```
template
├─ src
│ ├─ App.vue
│ ├─ api
│ │ └─ index.js
│ ├─ assets
│ │ ├─ fonts
│ │ ├─ images
│ │ └─ sass
│ ├─ components
│ │ ├─ Footer
│ │ └─ PlatNav
│ ├─ consts
│ │ └─ messageConstant.js
│ ├─ main.js
│ ├─ router.js
│ ├─ store
│ │ ├─ actions.js
│ │ ├─ getters.js
│ │ ├─ index.js
│ │ ├─ mutation_types.js
│ │ ├─ mutations.js
│ │ └─ states.js
│ ├─ utils
│ │ ├─ filters.js
│ │ └─ http.js
│ └─ views
│   └─ home
├─ public
│ ├─ favicon.ico
│ └─ index.html
├─ proxy.config.js
└─ vue.config.js
```

## 目录设计

命名规则参考[vue 官方风格指南](https://cn.vuejs.org/v2/style-guide/#%E5%8D%95%E6%96%87%E4%BB%B6%E7%BB%84%E4%BB%B6%E6%96%87%E4%BB%B6%E7%9A%84%E5%A4%A7%E5%B0%8F%E5%86%99-%E5%BC%BA%E7%83%88%E6%8E%A8%E8%8D%90)

### api 设计，接口相关 api，

> 我们通过暴露接口的方式来进行请求地址，传参的封装，不但可以对 vue 的每个组件的代码量进行减少，这样也进行了低偶合，对请求接口 api 的设计就可以划分出一个独立的页在，在项目维护上，接口复用上也是很有必要性的。

```
- [api]
    - common.js
    - home.js
    - login.js
```

实例：common.js

```
import http from '../utils/http'
const commonApi = {
    login:(params=null)=>http.get()
}
export default commonApi

```

component

```
import commonApi from '../api/common'
export default {
    ...
    methods: {
        async viewFile() {
            const res = await commonApi.viewFile()
            if(res.code === 'success'){
                ...
            }else{
                alert(res.msg)
            }
        }
    }
}

```

### utils 抽离公用工具

> 主要放一些系统需要用的到的通用小工具。
> 如：http 请求工具类、日期格式工具类等。

```
- utils
    - http.js
    - date.js
    - filters.js
    ...
```

### assets 静态文件存放

```
- assets
    - images
    - css
        - base.css
        - ...
    - fonts
```

### vuex 状态管理器

```
- store
    - modules
    ...
```

### public

```
- public
```

### 全局公共组件：/src/components 示例

```
 - [components]
    - [Breadcrumb]
      - index.vue
    - [Hamburger]
      - index.vue
    - [SvgIcon]
      - index.vue
```

### 业务页面内部封装的组件：以 /src/views/layout/components 示例

```
-[src]
  - [views]
    - [layout]
      - [components]
        - [Sidebar]
          - index.vue
          - Item.vue
          - SidebarItem.vue
        - AppMain.vue
        - index.js
        - Navbar.vue
      - index.vue
```

index.js 导出组件方式：

```
export { default as AppMain } from './AppMain'
export { default as Navbar } from './Navbar'
export { default as Sidebar } from './Sidebar'
```

### vue 方法放置顺序

```
components

props

data

computed

metods

watch

created

mounted

activited

update

beforeRouteUpdate

filter

```

### 全局 filter

新建 filters.js 文件
utils/filters.js

```
import moment from 'moment'
const formatTime = value => moment(value).format('YYYY-MM-DD HH:mm')

export {
  formatTime
}
```

```
import * as filters from '/utils/filters'
Object.keys(filters).forEach(item => Vue.filter(item, filters[item]))
```

### 代理 devServer.proxy

[参考 vue 官方文档](https://cli.vuejs.org/zh/config/#devserver)
