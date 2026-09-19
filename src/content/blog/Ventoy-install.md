---
title: 'Ventoy安装'
description: Ventoy安装。
pubDate: 2025-01-24
tags: []
draft: false
---

- Ventoy可以让一个U盘能够安装多个镜像，在启动时可选择引导镜像。一般用于多系统安装盘

## 下载并解压Ventoy

ventoy官方网站带宽较小，建议前往镜像站下载

- [南京大学镜像站-Ventoy下载](https://mirrors.nju.edu.cn/github-release/ventoy/Ventoy/Ventoy%201.0.99%20release/)

![南京大学镜像站](/img/ventoy-install/nju-mirror-site.png)

- 根据系统下载

![解压](/img/ventoy-install/ventoy-extract-folder.png)

## 安装至移动硬盘/U盘

- 双击其中的"Ventoy2Disk.exe"启动
![exp2](/img/ventoy-install/ventoy-disk-program.png)
- 打开配置选项进行配置
![exp3](/img/ventoy-install/ventoy-config-options.png)
- 若非不支持UEFI引导的远古设备，分区类型都建议使用GPT
![exp4](/img/ventoy-install/ventoy-partition-type.png)
- 建议使用NTFS

- 完成以后查看设备选择是否正确，点击安装

---
至此，Ventoy安装完成，只需要将要引导的镜像(iso)文件放入已安装Ventoy的设备，修改引导设备为此设备，即可引导任意镜像

---
