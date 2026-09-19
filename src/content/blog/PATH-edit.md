---
title: '如何环境变量修改？（win/linux）'
description: 如何环境变量修改？（win/linux）。
pubDate: 2025-05-05
tags: []
draft: false
---

# 环境变量修改教程（Windows & Linux）

## 一、Windows 环境变量修改

### 方法 1：图形化

**步骤：**

1. **打开系统设置**

   - **设置** → **系统** → **系统信息** → **高级系统设置** → **环境变量**
   - 右键点击 **此电脑** → **属性** → **高级系统设置** → **环境变量**

2. **保存并生效**
   - 所有窗口点击 **确定** 关闭 → 重启已打开的终端或程序。

---

### 方法 2：命令行

- **1. 临时变量（仅当前会话有效）**

```cmd
# CMD
set MY_VAR=value

# PowerShell
$env:MY_VAR = "value"
```

- **2. 永久变量（需管理员权限）**

```powershell
# 设置用户变量
setx MY_VAR "value"

# 设置系统变量（需以管理员运行）
setx MY_VAR "value" /M

# 添加路径到 PATH
setx PATH "%PATH%;C:\my\path"          # CMD
setx PATH "$env:PATH;C:\my\path"       # PowerShell
```

---

## 二、Linux 环境变量修改

### 方法 1：临时变量（当前终端有效）

```shell
export MY_VAR="value"          # 设置变量
export PATH="$PATH:/my/path"   # 添加路径到 PATH
```

---

### 方法 2：永久变量（按作用范围选择）

#### **2.1 用户级配置（仅对当前用户生效）**

- **Bash 用户**：编辑 `~/.bashrc` 或 `~/.bash_profile`
- **Zsh 用户**：编辑 `~/.zshrc`

**步骤：**

```shell
# 1. 打开配置文件
nano ~/.bashrc

# 2. 添加变量（示例）
export 变量名="值"

# 3. 立即生效
source ~/.bashrc
```

#### **2.2 系统级配置（所有用户生效）**

- 编辑 `/etc/environment`（全局变量，不依赖Shell）
- 编辑 `/etc/profile` 或 `/etc/profile.d/*.sh`（需Shell登录）

**示例（/etc/environment）：**

```shell
# 格式：KEY=value（无需 export）
JAVA_HOME="/usr/lib/jvm/java-17-openjdk"
```

---

## 三、验证环境变量

- **Windows（CMD/PowerShell）**：

  ```cmd
  echo %MY_VAR%      # CMD
  echo $env:MY_VAR   # PowerShell
  ```
  
- **Linux/Mac**：

  ```shell
  echo $MY_VAR
  printenv MY_VAR    # 查看所有变量用 printenv
  ```

---
