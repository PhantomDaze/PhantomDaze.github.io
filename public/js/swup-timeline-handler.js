// SWUP 时间线处理脚本
// 该脚本专门处理 SWUP 页面过渡后的时间线功能初始化

(() => {
	// 初始化时间线功能的函数
	function initTimelineFeatures() {
		// 检查是否在时间线页面
		if (!window.location.pathname.includes("/timeline")) {
			return;
		}

		// 调用全局时间线滚动初始化函数（如果存在）
		if (typeof window.initTimelineScrollGlobal === "function") {
			setTimeout(window.initTimelineScrollGlobal, 50);
		}

		// 初始化时间线节点动画
		var timelineNodes = document.querySelectorAll(".timeline-node");
		timelineNodes.forEach((node, index) => {
			// 添加延迟，使动画依次出现
			node.style.animationDelay = `${index * 0.2}s`;
		});

		// 确保悬停效果正常工作
		var hoverElements = document.querySelectorAll(".hover\\:shadow-lg");
		hoverElements.forEach((element) => {
			// 强制重新计算样式以确保悬停效果正常
			element.style.transform = "translateZ(0)";
		});
	}

	// 页面加载完成后初始化
	document.addEventListener("DOMContentLoaded", () => {
		initTimelineFeatures();
	});

	// 如果使用 SWUP，监听其事件
	if (typeof window.Swup !== "undefined") {
		// 监听内容替换事件
		document.addEventListener("swup:contentReplaced", () => {
			// 延迟执行以确保 DOM 完全更新
			setTimeout(initTimelineFeatures, 100);
		});

		// 监听页面视图事件
		document.addEventListener("swup:pageView", () => {
			setTimeout(initTimelineFeatures, 100);
		});
	}

	// 监听 Astro 导航事件
	document.addEventListener("astro:page-load", () => {
		setTimeout(initTimelineFeatures, 100);
	});

	document.addEventListener("astro:after-swap", () => {
		setTimeout(initTimelineFeatures, 100);
	});

	// 监听浏览器前进/后退事件
	window.addEventListener("pageshow", (event) => {
		if (event.persisted) {
			setTimeout(initTimelineFeatures, 100);
		}
	});
})();
