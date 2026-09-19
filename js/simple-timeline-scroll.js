// 简单直接的时间线滚动处理脚本
// 该脚本使用最简单的方式实现时间线滚动功能

(() => {
	// 简单的滚动处理函数
	function handleSimpleScroll(e) {
		// 检查是否为时间线滚动容器
		if (!this.classList.contains("timeline-horizontal-scroll")) {
			return;
		}

		// 检测是否为桌面端
		var isDesktop = window.matchMedia("(min-width: 768px)").matches;
		if (!isDesktop) {
			return;
		}

		// 检查是否主要是垂直滚动
		if (Math.abs(e.deltaY) > Math.abs(e.deltaX)) {
			// 阻止默认行为
			e.preventDefault();
			// 将垂直滚动转换为水平滚动
			this.scrollLeft += e.deltaY;
		}
	}

	// 初始化函数
	function initSimpleScroll() {
		// 查找所有时间线水平滚动容器
		var scrollContainers = document.querySelectorAll(
			".timeline-horizontal-scroll",
		);

		// 为每个容器添加滚动事件监听器
		scrollContainers.forEach((container) => {
			// 移除之前的事件监听器
			container.removeEventListener("wheel", handleSimpleScroll);
			// 添加新的事件监听器
			container.addEventListener("wheel", handleSimpleScroll, {
				passive: false,
			});
		});
	}

	// 页面加载完成后初始化
	if (document.readyState === "loading") {
		document.addEventListener("DOMContentLoaded", initSimpleScroll);
	} else {
		// DOM 已经加载完成
		initSimpleScroll();
	}

	// 监听页面加载事件
	window.addEventListener("load", () => {
		setTimeout(initSimpleScroll, 100);
	});

	// 监听浏览器前进/后退事件
	window.addEventListener("pageshow", (event) => {
		if (event.persisted) {
			setTimeout(initSimpleScroll, 100);
		}
	});

	// 如果使用 SWUP，监听其事件
	if (typeof window.Swup !== "undefined") {
		document.addEventListener("swup:contentReplaced", () => {
			setTimeout(initSimpleScroll, 100);
		});

		document.addEventListener("swup:pageView", () => {
			setTimeout(initSimpleScroll, 100);
		});
	}

	// 监听 Astro 导航事件
	document.addEventListener("astro:page-load", () => {
		setTimeout(initSimpleScroll, 100);
	});

	document.addEventListener("astro:after-swap", () => {
		setTimeout(initSimpleScroll, 100);
	});

	// 使用 MutationObserver 监听 DOM 变化
	if (typeof MutationObserver !== "undefined") {
		var observer = new MutationObserver(() => {
			// 每次 DOM 变化时都重新初始化
			setTimeout(initSimpleScroll, 50);
		});

		// 观察整个文档的变化
		observer.observe(document.body, {
			childList: true,
			subtree: true,
		});
	}
})();
