---
title: 'FlexiBook：在翻开书的那一刻才排版'
published: 2026-11-28
description: '一个 Minecraft 1.20.1 ~ 26.3 的自定义书模组：富文本、按当前语言自动重排版、图片、安全链接与书内搜索，附带网页版编辑器。'
image: '/img/flexibook/in-game.png'
tags: ['Minecraft', '模组', 'Java']
category: 'Minecraft'
draft: false
pinned: false
lang: zh_CN
---

> FlexiBook 不在写书的时候排版，而是在你翻开书的那一刻才排版。

原版 Minecraft 的成书是「写的时候就把每一页排好」：换行、分页在写入的那一刻就固定了。内容一多就得手动拆页；想翻译成另一种语言更是灾难——英文和中文的字宽不一样，原来刚好放下的段落会溢出，只能整本重新排。至于图片、可点击的链接、书内搜索，原版书里都没有。

FlexiBook 换了个思路：**书里只存内容，怎么排交给打开书的人。**

## 排版发生在打开时

FlexiBook 用 DataComponent（1.20.1 走传统 NBT）保存一本「语义化」的书：标题、段落、列表、图片、链接、行内样式，而不是一堆已经排好版的字符。翻开书时，客户端布局引擎 `AdaptiveBookScreen` 现场计算：

- 按当前客户端语言解析翻译键，取到真正要显示的文字；
- 按当前字体的实际字宽度量，而不是按字符数估算；
- 算出这一页能放多少行、在哪里断行，再分页；
- 内容太长时先自动缩小字号（最低到 0.6），还不够就切换成双栏；
- 排版结果按「内容 + 语言 + GUI 缩放 + 主题 + 字体 + 搜索词」缓存，来回翻页不会重算。

同一本示例书，中文和英文都是 3 页，但断行位置与每页的内容完全不同——视频里有实机对比。

## 一本书里能放什么

内容用一套 HTML 子集标签书写，打开时再解析：

| 标签 | 作用 |
| :--- | :--- |
| `[h1]` `[h2]` | 标题 |
| `[p]` | 段落，可以嵌套行内样式 |
| `[b]` `[i]` `[u]` | 粗体 / 斜体 / 下划线 |
| `[color=#RRGGBB]` | 颜色 |
| `[font font="ns:id"]` | 行内字体，覆盖书级字体 |
| `[bullet]` | 列表项 |
| `[divider]` | 分割线 |
| `[img src="..." width="48" height="48" /]` | 图片 |
| `[link cmd="modid:action"]` / `[link url="https://..."]` | 安全链接 |

举个例子：

```text
[h1]mymod.book.ch1[/h1]
[p]mymod.book.p1[/p]
[img src="mymod:textures/gui/guide.png" width="64" height="64" /]
[bullet]mymod.book.point1[/bullet]
[link cmd="mymod:open_map"]mymod.book.open_map[/link]
```

几个细节：

- **内置字体** `flexibook:default`（unihex Unifont）。省略 `font` 时不会掉回 `minecraft:default`，中文、符号的覆盖更稳。
- **链接是安全的**：只放行注册过的 command id，或者确认过的 http(s) 地址，书里不会成为任意指令的入口。
- **书内搜索**：底部输入关键词，匹配处直接高亮，排版缓存也会按搜索词区分。

## 外观也是数据驱动的

字号、行距、背景贴图、配色这些都放在主题 JSON 里，路径是 `assets/<命名空间>/flexibook/themes/<id>.json`，id 就是 `namespace:path`。想换一套观感，换一个主题 JSON 就行，不用改代码；改完在游戏里按 `F3+T` 重载资源包即可看到效果。

## 自带网页版编辑器

不写代码也能做书。编辑器左边调主题、字体、颜色，右边实时渲染出真正的书页；改完直接导出资源包，进游戏就能用。它也可以打包成 Electron 应用单独运行，并且和游戏共用同一份 unihex 字体 ZIP，编辑器里看到的效果就是游戏里的效果。

![FlexiBook 网页版编辑器，左侧设置、右侧实时预览](/img/flexibook/editor.png)

## 内容不必写死在代码里

一本书可以完全由资源包提供，布局是六段式的：

```text
assets/<ns>/
  lang/*.json
  font/*
  textures/gui/book.png
  textures/item/flexi_book.png   # 可选，写在 assets/flexibook/... 下可覆盖物品图标
  flexibook/
    books/<id>.json              # 索引：content + theme + 可选 font
    contents/<id>.json           # 正文
    themes/<id>.json
```

启用资源包后按 `F3+T` 重载，然后用命令取书（需要权限等级 ≥ 2）：

```text
/flexibook list
/flexibook give <namespace:bookId>
# 例如 /flexibook give note:note11
```

创造模式物品栏里有一个 **FlexiBook** 分类：空白书 `flexi_book`，以及一本中英双语的 **FlexiBook Field Guide** 示例书，自适应布局、i18n、富文本、图片、链接、搜索都能在里面看到。

## 版本与加载器

从 1.20.1 到 26.3，覆盖 7 个 Minecraft 版本、13 个构建，Forge / NeoForge / Fabric 三个加载器，共用同一份排版代码和同一套内容格式：

| Minecraft | Forge | NeoForge | Fabric |
| :--- | :---: | :---: | :---: |
| 1.20.1 | ✓ | — | ✓ |
| 1.21.1 | — | ✓ | ✓ |
| 1.21.4 | — | ✓ | ✓ |
| 1.21.11 | — | — | ✓ |
| 26.1.2 | — | ✓ | ✓ |
| 26.2 | — | ✓ | ✓ |
| 26.3 | — | ✓ | ✓ |

> 26.1 和 26.1.1 可以直接用 26.1.2 的 Fabric 包。

## 安装

1. 确认自己的 Minecraft 版本和加载器；
2. 在 CurseForge 或 Modrinth 下载对应的 jar；
3. 丢进 `mods` 文件夹；
4. 单人可以进游戏直接用；联机时服务端也要装——排版在客户端做，但书的内容和物品是两端都要注册的。

## 给模组和整合包作者

别的模组可以直接调 API 生成一本书，也可以只注册一个安全的命令动作：

```java
ItemStack book = FlexiBookAPI.builder("my_guide")
    .titleKey("mymod.book.title")
    .h1("mymod.book.ch1")
    .p("mymod.book.p1")
    .image(ResourceLocation.fromNamespaceAndPath("mymod", "textures/gui/icon.png"), 48, 48)
    .link("mymod.book.click", FlexiBookAPI.commandAction("mymod:open_map"))
    .divider()
    .buildItem();

FlexiBookAPI.registerCommandAction("mymod:open_map", ctx -> ctx.message("mymod.map.opened"));
```

书内容对应的 DataComponent 是 `flexibook:adaptive_book_content`。完整的 Builder、标签属性、主题 JSON 和常见问题都在仓库的 `docs/API.zh-CN.md` 里。

## 已知限制

- 讲台只留了 `FlexiBookAPI.LecternCompat` 桩，没有完整兼容；
- 不劫持原版 `written_book`，可以和原版书共存；
- 暂时没有书内编辑、表格、自动目录和 3D 翻书动画。

## 相关链接

- CurseForge：[FlexiBook](https://www.curseforge.com/minecraft/mc-mods/flexibook)
- Modrinth：[FlexiBook](https://modrinth.com/mod/flexibook)
- GitHub：[PhantomDaze/flexibook](https://github.com/PhantomDaze/flexibook)
- B 站演示视频：[Minecraft 自动重排版富文本 i18n 自定义书模组 | FlexiBook](https://www.bilibili.com/video/BV1bM1KzcE14/)
- MC 百科：[自定义书 (FlexiBook)](https://www.mcmod.cn/class/29288.html)

代码以 [GPL-3.0](https://www.gnu.org/licenses/gpl-3.0.html) 开源，欢迎提 issue 或者直接改。如果这个模组帮到了你，也可以在[爱发电](https://ifdian.net/a/PhantomDaze)请我喝杯茶。
