---
title: Git 命令
date: 2023-12-21
updated: 2023-12-21
categories: 笔记
tags:
  - 笔记
top: 1
---

`[]`表示内容可自定义 **加粗** 表示常用命令 `?` 标识参数可选
## remote 相关命令
- **`git remote add origin [远程仓库地址]` 关联远程仓库**
- `git remote add [origin-name] [远程仓库地址]` 关联远程仓库并自定义 远程仓库名称
- `git remote add [origin-name-1] [远程仓库地址1]` 关联多个远程仓库 并指定仓库地址1
- `git remote add [origin-name-2] [远程仓库地址2]` 关联多个远程仓库 并指定仓库地址2
- **`git remote -v` 查看关联远程仓库**
- `git remote remove [origin-name]` 移除远程关联仓库
- `git remote rename [old-origin-name] [new-origin-name]` 重命名远程仓库名称
- `git remote show [origin-name]` 查看指定远程仓库的详细信息
应用场景
- `git remote set-url [origin-name] [new-origin-name]` 修改当前指定 origin 关联的
远程仓库地址
## status 相关命令
- **`git status` 查看文件状态**
- `git status -s` 简介明了的方式查看文件状态
- `git status --ignored` 显示被 Git 忽略的文件的状态。

<!-- ![](http://116.204.120.144:3000/staticResource/content/cnuY63sI9I54AsU.png)
![](http://116.204.120.144:3000/staticResource/content/YgRH3hrYFqJiFKL.png) -->



## add 相关命令
- `git add [文件地址]` 暂存指定文件
- **`git add .` 暂存所有修改的文件**

## commit 相关命令
- **`git commit -m "[提交备注]"` 提交并添加备注 请注意Git提交规范**

 ### commit 提交规范
 - feat 新功能 feature
 - fix 修补 bug
 - docs 文档 documentation
 - style 格式 不影响代码运行的变动
 - refactor 重构 (既不是新增功能，也不是修改bug的代码变动 代码优化)
 - test 增加测试
 - chore 构建过程和辅助工具的变动注释
 - perf 性能优化
 - ci 自动化流程配置修改


## barnch 相关命令
- **`git branch` 查看本地分支**
- **`git branch [分支名]` 创建指定分支**
- `git branch -m [旧的分支名称] [新分支名名称]` 重命名指定分支的名称 `git branch -m master main`
- `git branch -r` 查看远程分支

## checkout 相关命令
- **`git checkout [分支名称]` 切换到指定分支**
- **`git checkout -b [分支名称]` 新建分支**
- **`git checkout .` 取消当前目录下所有文件的更改 恢复到最近的提交状态**
- `git checkout [已修改的文件]` 取消指定已修改的文件

## tag 相关命令


## merge 相关命令


## reset 相关命令


## pull 相关命令
- **`git pull` 拉取默认关联的远程仓库代码**
- `git pull [origin-name] [远程分支名]:[本地分支名]` 拉取远程仓库的分支
- `git pull [远程分支] [远程分支名称]:[本地分支名称]` 拉取指定远程仓库的选中分支代码

 
## push 相关命令
- **`git push` 推送代码到默认关联的远程仓库**
- **`git push -u [origin-name] [分支名]` 远程仓库创建指定分支并推送代码**
- `git push [origin-name]` 推送到指定关联的远程仓库 
- `git push -u [origin-name] [分支名]` 推送到指定关联的远程仓库创建指定分支并推送代码


## fetch 相关命令
- `git fetch [origin-name] [远程分支名]:[本地分支名]` 拉取远程仓库的分支

## rebase 相关命令


## reset 相关命令
- `git reset HEAD .` 全部文件移除暂存区 (放弃全部 `git add`的文件)
- `git reset [文件地址]` 指定文件移除暂存区

## stash 相关命令
- `git stash` 暂存当前所有修改 使用最近一次的commit信息作为备注信息
- `git stash save "暂存信息"` 暂存当前所有修改 并添加备注信息
- `git stash list` 列出所有暂存信息 每个暂存都会分配一个唯一暂存标识 **stash@{n}**
- `git stash pop [暂存标识]?` 使用暂存内容并删除暂存记录 暂存标识参数不填写 则使用 最近暂存
- `git stash apply [暂存标识]?` 使用暂存内容不会删除暂存记录 暂存标识参数不填写 则使用 最近暂存
- `git stash drop [暂存标识]?` 删除暂存记录 暂存标识参数不填写 则删除 最近暂存
- `git stash clear` 清除所有暂存内容 慎用
- `git stash branch [分支名]` 这个命令会创建一个新的分支，并将指定的stash应用到新分支上，然后在当前分支上删除这个stash。这是一个方便的方式，在新分支上继续工作。