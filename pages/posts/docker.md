---
title: Docker 入门
date: 2023-12-25
updated: 2023-12-25
categories: 笔记
tags:
  - Docker
top: 1
---

## 安装 Docker (Linux)

 ### 先卸载
```Shell
yum remove docker \
    docker-client \
    docker-client-latest \
    docker-common \
    docker-latest \
    docker-latest-logrotate \
    docker-logrotate \
    docker-engine
```

### 安装 yum

```Bash
yum install -y yum-utils
```

   #### 配置 Docker 的yum源

```Bash
yum-config-manager --add-repo https://download.docker.com/linux/centos/docker-ce.repo
```

  ### 安装 Docker

```Bash
yum install -y docker-ce docker-ce-cli containerd.io docker-buildx-plugin docker-compose-plugin
```

   #### 启动和校验

```Bash
# 启动Docker
systemctl start docker

# 停止Docker
systemctl stop docker

# 重启
systemctl restart docker

# 设置开机自启
systemctl enable docker

# 执行docker ps命令，如果不报错，说明安装启动成功
docker ps
```

### 配镜像加速

https://developer.aliyun.com/article/1294592?spm=5176.26934562.main.2.6407175dZkgj9s



```Bash
#1.创建目录
mkdir -p /etc/docker

#2.复制内容，注意把其中的镜像加速地址改成你自己的
tee /etc/docker/daemon.json <<-'EOF'
{
  "registry-mirrors": ["加速地址"]
}
EOF

#3.重新加载配置
systemctl daemon-reload

#4.重启Docker
systemctl restart docker
```





## 容器(Container)和镜像(Images)

在 Docker 中，有两个核心概念：**容器（Container）**和**镜像（Image）**。

### 容器（Container）

容器是一个独立运行的、轻量级的可执行软件包，包含了运行一个应用程序所需的一切：代码、运行时、系统工具、系统库等。容器基于镜像创建，并且具有文件系统、环境变量、网络设置等独立的运行环境。

容器的特点包括：

- **隔离性：** 容器之间相互隔离，每个容器运行在独立的命名空间中，不会相互影响。
- **轻量级：** 与虚拟机相比，容器共享主机的内核，因此更轻量。
- **可移植性：** 由于容器包含了所有运行时所需的组件，因此可以轻松在不同的环境中运行。

### 镜像（Image）

镜像是一个只读的文件系统快照，包含了运行应用程序所需的所有内容：代码、运行时、库、环境变量等。镜像是容器的基础，容器实际上是在镜像的基础上创建的运行实例。

镜像的特点包括：

- **不可修改性：** 镜像是只读的，一旦创建就不能被修改。任何修改都会生成一个新的镜像。
- **分层存储：** 镜像由多个分层组成，每个分层都包含了文件系统的一部分。这种分层结构使得镜像可以共享相同的基础层，提高了存储效率。
- **版本控制：** 镜像可以通过标签来进行版本控制，不同的标签代表不同的版本或配置。



## Docker 安装 MySQL

### 基础命令

``````bash
docker run -d \
	--name mysql \
	-p 3306:3306 \
	-e TZ=Asia/Shanghai \
	-e MYSQL_ROOT_PASSWORD=root \
	mysql
``````
docker run -d \
	--name mysql_5.6 \
	-p 3307:3306 \
	-e TZ=Asia/Shanghai \
	-e MYSQL_ROOT_PASSWORD=114514m.. \
	mysql:5.6.50

### 完整命令

```bash
docker run -d \
	--name mysql \
	-p 3306:3306 \
	-e TZ=Asia/Shanghai \
	-e MYSQL_ROOT_PASSWORD=root \
	-v /root/mysql/data:/var/lib/mysql \
	-v /root/mysql/init:/docker-entrypoint-initdb.d \
	-v /root/mysql/conf:/etc/mysql/conf.d \
	--network test_net
	mysql
```



### 命令解读

`docker run`  **创建**并**运行**一个容器 在执行该命令时 Docker会先查看本地中是否存在所要的镜像 当镜像不存在时 则会使用 `docker pull` 命令 对应版本的镜像拉取到本地 当镜像存在时 则使用本地镜像

`-d` 参数 表示 容器在**后台**运行

`--name` 容器的名称 容器名称必须唯一

`-p` 设置端口映射 格式 **(宿主机端口):(容器端口)** 表示将容器的3306端口映射到宿主机的3306端口上

`-e` 用于配置容器内部的环境变量 

`-v` 本地目录挂载/数据卷挂载 格式 **(宿主机路径):(容器路径)**

`mysql` 表示要运行的镜像 例如: mysql nginx 等 完整格式 **(Tag):(Version)** 省略:后面的Version 则默认使用 latest 最新版本

`network` 表示该容器加入指定的 docker network 下

## Dockerfile



## 常用命令

1. **镜像操作：**
   - `docker pull <镜像名>`: 下载镜像。
   - `docker build -t <镜像名> <路径>`: 从 Dockerfile 构建镜像。
   - `docker images` 或 `docker image ls`: 列出本地所有镜像。
   - `docker rmi <镜像ID>`: 删除本地镜像。
2. **容器生命周期：**
   - `docker run <选项> <镜像>`: 运行容器。
   - `docker ps`: 列出运行中的容器。
   - `docker ps -a`: 列出所有容器，包括停止的。
   - `docker start <容器ID>`: 启动停止的容器。
   - `docker stop <容器ID>`: 停止运行中的容器。
   - `docker restart <容器ID>`: 重启容器。
   - `docker rm <容器ID>`: 删除容器。
3. **容器操作：**
   - `docker exec -it <容器ID> <命令>`: 在运行中的容器中执行命令。
   - `docker logs <容器ID>`: 查看容器日志。
   - `docker inspect <容器ID>`: 显示容器详细信息。
4. **网络操作：**
   - `docker network ls`: 列出所有网络。
   - `docker network inspect <网络ID>`: 查看网络详细信息。
5. **数据卷操作：**
   - `docker volume ls`: 列出所有数据卷。
   - `docker volume create <卷名>`: 创建数据卷。
   - `docker volume inspect <卷名>`: 查看数据卷详细信息。
6. **Docker Compose：**
   - `docker-compose up`: 启动容器。
   - `docker-compose down`: 停止并移除容器。
7. **其他：**
   - `docker info`: 显示 Docker 系统信息。
   - `docker version`: 显示 Docker 版本信息。
   - `docker help`: 显示 Docker 命令帮助信息。
