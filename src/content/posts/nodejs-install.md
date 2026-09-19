---
title: 'Node.JS安装'
published: 2025-03-30
description: Node.JS安装。
tags: []
category: ""
draft: false
pinned: false
lang: zh_CN
---

### 下载并解压nodejs

```bash
wget https://nodejs.org/dist/v22.13.0/node-v22.13.0-linux-x64.tar.xz
```

```bash
tar zxvf node-v22.13.0-linux-x64.tar.gz
```

### 删去解压后多余的压缩包

```bash
rm -rf node-v22.13.0-linux-x64.tar.gz
```

### 将其更名并移动到/usr/local/

```bash
mkdir -p /usr/local && mv node-v22.13.0-linux-x64 /usr/local/nodejs
```

### 建立软链接使其作用于全局

```bash
ln -s /usr/local/nodejs/bin/node /usr/local/bin && ln -s /usr/local/nodejs/bin/npm /usr/local/bin
```

## 可直接使用以下脚本

```bash
#!/bin/bash
wget https://nodejs.org/dist/v22.13.0/node-v22.13.0-linux-x64.tar.xz
tar zxvf node-v22.13.0-linux-x64.tar.gz
rm -rf node-v22.13.0-linux-x64.tar.gz
mkdir -p /usr/local
mv node-v22.13.0-linux-x64 /usr/local/nodejs
ln -s /usr/local/nodejs/bin/node /usr/local/bin
ln -s /usr/local/nodejs/bin/npm /usr/local/bin
```

保存为node-install.sh
使用以下命令执行

```bash
chmod +x node-install.sh && ./node-install.sh
```

---
