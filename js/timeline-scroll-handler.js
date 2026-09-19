// 全局时间线横向滚动处理脚本
// 该脚本处理所有带有 timeline-horizontal-scroll 类的元素的鼠标滚轮横向滚动

(() => {
	// 存储已绑定事件的元素，防止重复绑定
	const boundElements = new Set();

	// 处理鼠标滚轮事件的函数
	function handleWheel(e) {
		// 检查是否为水平滚动容器
		if (!this.classList.contains("timeline-horizontal-scroll")) {
			return;
		}

		// 阻止默认的垂直滚动
		if (Math.abs(e.deltaY) > Math.abs(e.deltaX)) {
			e.preventDefault();
			// 将垂直滚动转换为水平滚动
			this.scrollLeft += e.deltaY;
		}
	}

	// 初始化滚动功能的函数
	function initTimelineScroll() {
		// 查找所有时间线水平滚动容器
		var scrollContainers = document.querySelectorAll(
			".timeline-horizontal-scroll",
		);

		scrollContainers.forEach((scrollContainer) => {
			// 检查元素是否已经绑定过事件
			if (boundElements.has(scrollContainer)) {
				return;
			}

			// 检测是否为桌面端
			var isDesktop = window.matchMedia("(min-width: 768px)").matches;

			if (isDesktop) {
				// 移除之前可能添加的事件监听器，防止重复绑定
				scrollContainer.removeEventListener("wheel", handleWheel);

				// 添加新的事件监听器
				scrollContainer.addEventListener("wheel", handleWheel, {
					passive: false,
				});

				// 标记元素已绑定事件
				boundElements.add(scrollContainer);
			}
		});
	}

	// 清理函数，用于页面切换时清理已绑定的元素
	function cleanupBoundElements() {
		boundElements.clear();
	}

	// 页面加载完成后初始化
	document.addEventListener("DOMContentLoaded", () => {
		initTimelineScroll();

		// 在DOM更新后再次初始化（处理SWUP等SPA场景）
		setTimeout(initTimelineScroll, 100);
	});

	// 监听可能的DOM变化
	if (typeof MutationObserver !== "undefined") {
		var observer = new MutationObserver((mutations) => {
			var shouldInit = false;

			mutations.forEach((mutation) => {
				if (mutation.type === "childList") {
					// 检查是否有新的时间线元素被添加
					mutation.addedNodes.forEach((node) => {
						if (node.nodeType === 1) {
							// 检查直接添加的节点
							if (node.classList?.contains("timeline-horizontal-scroll")) {
								shouldInit = true;
							}
							// 检查节点内的子元素
							if (node.querySelectorAll) {
								var timelineElements = node.querySelectorAll(
									".timeline-horizontal-scroll",
								);
								if (timelineElements.length > 0) {
									shouldInit = true;
								}
							}
						}
					});
				}
			});

			if (shouldInit) {
				setTimeout(initTimelineScroll, 50);
			}
		});

		// 观察整个文档的变化
		observer.observe(document.body, {
			childList: true,
			subtree: true,
		});
	}

	// 监听页面导航事件
	window.addEventListener("load", () => {
		cleanupBoundElements();
		setTimeout(initTimelineScroll, 100);
	});

	// 处理浏览器前进/后退导航
	window.addEventListener("pageshow", (event) => {
		if (event.persisted) {
			cleanupBoundElements();
			setTimeout(initTimelineScroll, 100);
		}
	});

	// 如果使用SWUP，监听其事件
	if (typeof window.Swup !== "undefined") {
		// 监听 SWUP 开始过渡事件
		document.addEventListener("swup:transitionStart", () => {
			cleanupBoundElements();
		});

		// 监听 SWUP 内容替换事件
		document.addEventListener("swup:contentReplaced", () => {
			cleanupBoundElements();
			// 延迟初始化以确保DOM完全更新
			setTimeout(initTimelineScroll, 50);
		});

		// 监听 SWUP 页面视图事件
		document.addEventListener("swup:pageView", () => {
			cleanupBoundElements();
			setTimeout(initTimelineScroll, 100);
		});
	}

	// 增强对 Astro 导航的支持
	document.addEventListener("astro:page-load", () => {
		cleanupBoundElements();
		setTimeout(initTimelineScroll, 100);
	});

	document.addEventListener("astro:after-swap", () => {
		cleanupBoundElements();
		setTimeout(initTimelineScroll, 100);
	});

	// 暴露初始化函数到全局作用域，供其他脚本调用
	window.initTimelineScrollGlobal = initTimelineScroll;
	window.cleanupTimelineScroll = cleanupBoundElements;

	// 立即执行一次初始化，确保在脚本加载时就绑定事件
	if (document.readyState === "loading") {
		document.addEventListener("DOMContentLoaded", initTimelineScroll);
	} else {
		// DOM 已经加载完成
		initTimelineScroll();
	}

	// 如果页面已经加载完成，立即初始化
	if (
		document.readyState === "complete" ||
		document.readyState === "interactive"
	) {
		setTimeout(initTimelineScroll, 10);
	}
})();
