---
title: van van Nuxt3 😋
date: 2024-4-2
updated: 2023-4-2
categories: 笔记
tags:
  - Vue
top: 1
---

# 什么是Nuxt?

[官方介绍](https://nuxt.com/docs/getting-started/introduction)

# 创建项目

这里选择 `vite`创建 + `pnpm` 管理项目

```shell
pnpm create vite
```

选择 **vue** 选项中 **Nuxt** 如果遇到以下错误 就需要我们修改一下 **host文件**

```she
ERROR  Error: Failed to download template from registry: Failed to download https://raw.githubusercontent.com/nuxt/starter/templates/templates/v3.json: TypeError: fetch failed
```



打开该网站 [IP Tracer](https://www.ipaddress.com/ip-lookup) 网站 将无法访问的域名输入 **raw.githubusercontent.com** 将解析的内容写入host文件中

windows下host文件所在位置 **C:\Windows\System32\drivers\etc\hosts**

```txt
185.199.108.133 raw.githubusercontent.com
185.199.109.133 raw.githubusercontent.com
185.199.110.133 raw.githubusercontent.com
185.199.111.133 raw.githubusercontent.com

2606:50c0:8001::154 raw.githubusercontent.com
2606:50c0:8002::154 raw.githubusercontent.com
2606:50c0:8003::154 raw.githubusercontent.com
2606:50c0:8000::154 raw.githubusercontent.com
```

写入完成保存退出 
刷新使用命令行刷新DNS缓存 `ipconfig/flushdns`

删除之前生成的目录 重新创建

# 参考链接

- https://blog.csdn.net/q1003675852/article/details/136218476