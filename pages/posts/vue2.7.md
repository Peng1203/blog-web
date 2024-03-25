---
title: Vue2.x 升级 Vue2.7.x
date: 2024-03-25
updated: 2024-03-25
categories: 笔记
tags:
  - Vue
top: 1
---

### 前言

公司项目升级node版本 顺便将 Vue 也升级到**2.x的最终版本(2.7.16)**

## 依赖变更

### sass

由于原本项目中使用的 scss 依赖为 [node-sass](https://www.npmjs.com/package/node-sass) 

node-sass 会锁node版本 所以只能替换为 [dart-sass](https://www.npmjs.com/package/sass)

dart-sass 不锁node版本 但是node版本不能低于 **14** 本次升级的node版本为 **18.x的LTS** 版本

**另外 dart-sass中 不支持 `/deep/` 的写法 需要全部替换为 `::v-deep`**

```json
  "devDependencies": {
    "node-sass": "^4.14.1", ---> "sass": "^1.72.0",
  }
```



### vue-cli / webpack

**@vue/cli-xxx** 相关的开发依赖最好升级到 **5.0.6**

``` json
  "devDependencies": {
    "@vue/cli-plugin-babel": "^4.5.12", ---> "@vue/cli-plugin-babel": "~5.0.6",
    "@vue/cli-plugin-eslint": "^4.5.12",  ---> "@vue/cli-plugin-eslint": "~5.0.6",
    "@vue/cli-service": "^4.5.12", ---> "@vue/cli-service": "~5.0.6",
  }
```



可能会遇到的问题

`@vue/cli-service` 启动服务导致的 `Error: error:0308010C:digital envelope routines::unsupported` https://blog.csdn.net/scholar_man/article/details/134491200
