---
title: 'Nix的基本使用'
published: 2025-10-26
description: Nix的基本使用。
tags: []
category: ""
draft: false
pinned: false
lang: zh_CN
---

> Nix是NixOS的默认包管理器。Nix是一个声明式包管理器，使用它的系统能更易迁移


## 一、基础命令操作  

### 1.1 安装软件包  
使用 `nix-env` 安装指定包（以 `nano` 为例）：  
```bash
nix-env -iA nixpkgs.nano
```
- `-iA`：`-i` 表示安装，`-A` 表示从 `nixpkgs` 属性集查找包名。  

### 1.2 卸载软件包  
```bash
nix-env --uninstall nano
```

### 1.3 搜索软件包  
通过网页搜索 [https://search.nixos.org](https://search.nixos.org) 或终端命令：  
```bash
nix search nixpkgs firefox
```

### 1.4 创建临时开发环境  
通过 `nix-shell` 构建隔离环境（以 Python 为例）：  
```bash
nix-shell -p python313
```
退出环境后，所有依赖自动清理。  

---

## 二、高级功能  

### 2.1 配置国内镜像加速  
修改 `/etc/nix/nix.conf` 添加镜像源：  
```bash
substituters = https://mirror.sjtu.edu.cn/nix-channels/store https://cache.nixos.org/
```
更新通道：  
```bash
nix-channel --add https://mirrors.ustc.edu.cn/nix-channels/nixpkgs-unstable nixpkgs
nix-channel --update
```

### 2.2 版本回滚  
当系统更新异常时，回滚到上一版本：  
```bash
nix-env --rollback
# 或针对系统配置
nixos-rebuild switch --rollback
```

### 2.3 清理无用包  
Nix 会保留历史版本，手动清理：  
```bash
nix-collect-garbage
```

---

## 三、常见问题  

### 3.1 权限不足  
Nix 支持以非 root 用户安装软件，使用 `--user` 参数：  
```bash
nix-env -iA nixpkgs.git --user
```

### 3.2 依赖冲突  
Nix 的路径隔离机制避免冲突，若需强制覆盖：  
```bash
nix-env --upgrade <package>
```

---

> 这就是Nix的全部基本功能，已经足够用于日常使用
