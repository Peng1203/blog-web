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

### 依赖变更

#### sass

由于原本项目中使用的 scss 依赖为 [node-sass](https://www.npmjs.com/package/node-sass) 

node-sass 会锁node版本 所以只能替换为 [dart-sass](https://www.npmjs.com/package/sass)

dart-sass 不锁node版本 但是node版本不能低于 **14** 本次升级的node版本为 **18.x的LTS** 版本

**另外 dart-sass中 不支持 `/deep/` 的写法 需要全部替换为 `::v-deep`**

```json
 "devDependencies": {
   "node-sass": "^4.14.1", ---> "sass": "^1.72.0",
 }
```



#### vue-cli / webpack

**@vue/cli-xxx** 相关的开发依赖最好升级到 **5.0.6**

``` json
 "devDependencies": {
   "@vue/cli-plugin-babel": "^4.5.12", ---> "@vue/cli-plugin-babel": "~5.0.6",
   "@vue/cli-plugin-eslint": "^4.5.12",  ---> "@vue/cli-plugin-eslint": "~5.0.6",
   "@vue/cli-service": "^4.5.12", ---> "@vue/cli-service": "~5.0.6",
 }
```



##### 可能会遇到的问题

-  [Error: error:0308010C:digital envelope routines::unsupported ](https://blog.csdn.net/scholar_man/article/details/134491200) 导致原因大概率为**`@vue/cli-service`版本过低** 升级至上述版本即可

#### eslint

`@vue/cli-plugin-eslint` 依赖升级之后 需要 **eslint**相关的依赖也需要升级

```json
"devDependencies": {
   "eslint": "^6.8.0", ---> "eslint": "^7.5.0",
   "eslint-plugin-vue": "^6.2.2", ---> "eslint-plugin-vue": "^9.4.0",
 }
```





### setup 语法变更

#### Vuex

**Vue2.x对应的vuex版本**并没有直接提供hooks工具函数在 setup中使用 可以自己封装对应的工具函数

##### vuex 封装的 hook 函数

```js
import { getCurrentInstance } from "vue";
import store from "@/store";
import state from "@/store/state";
import * as mutationTypes from "@/store/mutation-types";


/**
 * 使用 Vuex
 * @export
 * @returns {typeof store}
 */
export function useStore() {
  const vm = getCurrentInstance()
  if (!vm) throw new Error('must be called in setup')
  return vm.proxy.$store
}

/**
 * 使用 vuex 中的 state
 * @export
 * @returns {typeof state}
 */
export function useStoreState() {
  const vm = getCurrentInstance()
  if (!vm) throw new Error('must be called in setup')
  return vm.proxy.$store.state
}

const mutationsHashMapping = {}
/**
 * 使用 mutations
 * @date 2024/3/26 - 10:38:08
 * @author Peng
 *
 * @export
 * @returns {typeof mutationTypes} 返回一个对象 对象包含mutations中所有方法
 */
export function useStoreMutations() {
  const vm = getCurrentInstance()
  if (!vm) throw new Error('must be called in setup')

  if (Object.keys(mutationsHashMapping).length) return mutationsHashMapping

  for (const key in mutationTypes) {
    mutationsHashMapping[key] = (params) => vm.proxy.$store.commit(mutationTypes[key], params)
  }

  return mutationsHashMapping
}
```

##### state

```vue
<template>
  <div>
    {{ store.state.versionNumber }}
  </div>
</template>

<script setup>
import { onMounted } from 'vue'
import { useStore, useStoreState } from '@/hooks'

const store = useStore() // 等同于 this.$state

const state = useStoreState()
const { versionNumber } = useStoreState()

onMounted(() => {
  console.log('store ------', store.state.versionNumber)
  console.log('state ------', state.versionNumber)
  console.log('versionNumber ------', versionNumber)
})
</script>
```

![image-20240326123146944](C:\Users\csq\AppData\Roaming\Typora\typora-user-images\image-20240326123146944.png)

两种方式都可以调用 state 中的变量 `useStoreState`还可以通过对象的解构来获取 指定的state `const { versionNumber } = useStoreState()` 另外`useStoreState`方法返回的对象有类型标注 所以会有代码提示 **推荐使用 `useStoreState`**



##### mutations

```VUE
<script setup>
import { onMounted } from 'vue'
import { useStore, useStoreMutations } from '@/hooks'
import { SET_USER } from '@/store/mutation-types'

const store = useStore()
const mutations = useStoreMutations()
const { SET_AUTH_MENU } = useStoreMutations()

onMounted(() => {
  store.commit(SET_USER, {})
  mutations.SET_AUTH_MENU([1, 2, 3, 4, 5])
  SET_AUTH_MENU([114514])
})
</script>
```

上述3种调用方式都是可以的 `useStoreMutations` 调用会有代码提示 **推荐使用`useStoreMutations`**



##### actions

```vue
<script setup>
import { onMounted, reactive } from 'vue'
import { useStore } from '@/hooks'

const params = reactive({
  page: 1,
  pageSize: 10,
})

const store = useStore()

onMounted(() => {
  store.dispatch('getUserData', params)
})
</script>
```

actions 调用 同 **`this.$store.dispatch`** 同理 第一个参数传递 actions中的函数名 第二个为传递的参数





#### Router

##### router 封装的 hook 函数

```js
import { getCurrentInstance } from "vue";

export function useRouter() {
  const vm = getCurrentInstance()
  if (!vm) throw new Error('must be called in setup')
  return vm.proxy.$router
}

export function useRoute() {
  const vm = getCurrentInstance()
  if (!vm) throw new Error('must be called in setup')
  return vm.proxy.$route
}
```

##### 调用

```vue
<script setup>
import { onMounted } from 'vue'
import { useRoute, useRouter } from '@/hooks'

// 等同于 this.$route
const route = useRoute()

// 等同于 this.$router
const router = useRouter()

const goHome = () => {
  router.push({ name: 'Home' })
}

onMounted(() => {
  console.log('route ------', route)
  console.log('router ------', router)
})
</script>
```

