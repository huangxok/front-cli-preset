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
│ └─ home
├─ public
│ ├─ favicon.ico
│ └─ index.html
├─ proxy.config.js
└─ vue.config.js
```
