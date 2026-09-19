// 全局时间线功能初始化脚本
// 该脚本会在每次页面加载或导航后初始化时间线功能

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

	// 初始化时间线滚动功能
	function initTimelineScroll() {
		// 检查是否在时间线页面
		const isTimelinePage = document.querySelector(
			".timeline-horizontal-scroll",
		);
		if (!isTimelinePage) {
			return;
		}

		// 查找所有时间线水平滚动容器
		var scrollContainers = document.querySelectorAll(
			".timeline-horizontal-scroll",
		);

		scrollContainers.forEach((scrollContainer) => {
			// 移除之前可能添加的事件监听器，防止重复绑定
			scrollContainer.removeEventListener("wheel", handleWheel);

			// 检测是否为桌面端
			var isDesktop = window.matchMedia("(min-width: 768px)").matches;

			if (isDesktop) {
				// 添加新的事件监听器
				scrollContainer.addEventListener("wheel", handleWheel, {
					passive: false,
				});
			}
		});
	}

	// 初始化时间线节点动画
	function initTimelineAnimations() {
		// 检查是否在时间线页面
		const isTimelinePage = document.querySelector(".timeline-node");
		if (!isTimelinePage) {
			return;
		}

		// 添加时间线节点动画效果
		var timelineNodes = document.querySelectorAll(".timeline-node");
		timelineNodes.forEach((node, index) => {
			// 添加延迟，使动画依次出现
			node.style.animationDelay = `${index * 0.2}s`;
		});
	}

	// 初始化悬停效果
	function initHoverEffects() {
		// 确保悬停效果正常工作
		var hoverElements = document.querySelectorAll(".hover\\:shadow-lg");
		hoverElements.forEach((element) => {
			// 强制重新计算样式以确保悬停效果正常
			element.style.transform = "translateZ(0)";
		});
	}

	// 全局初始化函数
	function globalInit() {
		// 初始化所有时间线功能
		initTimelineScroll();
		initTimelineAnimations();
		initHoverEffects();
	}

	// 清理函数
	function cleanup() {
		// 清理已绑定的元素
		boundElements.clear();
	}

	// 页面加载完成后初始化
	if (document.readyState === "loading") {
		document.addEventListener("DOMContentLoaded", globalInit);
	} else {
		// DOM 已经加载完成
		globalInit();
	}

	// 监听页面加载事件
	window.addEventListener("load", () => {
		setTimeout(globalInit, 100);
	});

	// 监听浏览器前进/后退事件
	window.addEventListener("pageshow", (event) => {
		if (event.persisted) {
			setTimeout(globalInit, 100);
		}
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
							if (
								node.classList &&
								(node.classList.contains("timeline-horizontal-scroll") ||
									node.classList.contains("timeline-node"))
							) {
								shouldInit = true;
							}
							// 检查节点内的子元素
							if (node.querySelectorAll) {
								var timelineElements = node.querySelectorAll(
									".timeline-horizontal-scroll, .timeline-node",
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
				setTimeout(globalInit, 50);
			}
		});

		// 观察整个文档的变化
		observer.observe(document.body, {
			childList: true,
			subtree: true,
		});
	}

	// 如果使用 SWUP，监听其事件
	if (typeof window.Swup !== "undefined") {
		document.addEventListener("swup:contentReplaced", () => {
			setTimeout(globalInit, 100);
		});

		document.addEventListener("swup:pageView", () => {
			setTimeout(globalInit, 100);
		});

		document.addEventListener("swup:transitionStart", () => {
			cleanup();
		});
	}

	// 监听 Astro 导航事件
	document.addEventListener("astro:page-load", () => {
		setTimeout(globalInit, 100);
	});

	document.addEventListener("astro:after-swap", () => {
		setTimeout(globalInit, 100);
	});

	// 暴露全局函数
	window.globalTimelineInit = globalInit;
	window.cleanupTimeline = cleanup;
})();
