<script lang="ts">
import { onMount } from "svelte";
import { siteConfig } from "../config";

export let currentLayout: "list" | "grid" = "list";

let mounted = false;
let isSmallScreen = false;

function checkScreenSize() {
	isSmallScreen = window.innerWidth < 1200;
	if (isSmallScreen) {
		currentLayout = "list";
	}
}

onMount(() => {
	mounted = true;
	checkScreenSize();

	// 从localStorage读取用户偏好，如果没有则使用传入的默认值
	const savedLayout = localStorage.getItem("postListLayout");
	if (savedLayout && (savedLayout === "list" || savedLayout === "grid")) {
		currentLayout = savedLayout;
	} else {
		// 如果没有保存的偏好，使用传入的默认布局（从props）
		// currentLayout已经在声明时设置了默认值
	}

	// 监听窗口大小变化
	window.addEventListener("resize", checkScreenSize);

	return () => {
		window.removeEventListener("resize", checkScreenSize);
	};
});

function switchLayout() {
	if (!mounted || isSmallScreen) return;

	currentLayout = currentLayout === "list" ? "grid" : "list";
	localStorage.setItem("postListLayout", currentLayout);

	// 触发自定义事件，通知父组件布局已改变
	const event = new CustomEvent("layoutChange", {
		detail: { layout: currentLayout },
	});
	window.dispatchEvent(event);
}

// 监听布局变化事件
onMount(() => {
	const handleCustomEvent = (
		event: CustomEvent<{ layout: "list" | "grid" }>,
	) => {
		currentLayout = event.detail.layout;
	};

	window.addEventListener("layoutChange", handleCustomEvent as EventListener);

	return () => {
		window.removeEventListener(
			"layoutChange",
			handleCustomEvent as EventListener,
		);
	};
});

// 监听PostPage的布局初始化事件
onMount(() => {
	const handleLayoutInit = (
		event: CustomEvent<{ layout: "list" | "grid" }>,
	) => {
		currentLayout = event.detail.layout;
	};

	const handleSwupEvent = () => {
		// Swup页面切换时重新同步布局状态
		setTimeout(() => {
			console.log("Swup event - syncing layout state");
			const savedLayout = localStorage.getItem("postListLayout");
			if (savedLayout && (savedLayout === "list" || savedLayout === "grid")) {
				currentLayout = savedLayout;
			} else {
				// 如果没有保存的布局，使用默认布局
				const defaultLayout = siteConfig.postListLayout.defaultMode;
				currentLayout = defaultLayout;
			}
		}, 200);
	};

	// 监听布局初始化事件
	window.addEventListener("layoutInit", handleLayoutInit as EventListener);

	// 监听Swup页面切换事件
	function setupSwupListeners() {
		if (typeof window !== "undefined" && (window as any).swup) {
			const swup = (window as any).swup;

			swup.hooks.on("content:replace", handleSwupEvent);
			swup.hooks.on("page:view", handleSwupEvent);
			swup.hooks.on("animation:in:end", handleSwupEvent);

			console.log("Swup button listeners registered");
		} else {
			// 降级处理：监听普通页面切换事件
			window.addEventListener("popstate", handleSwupEvent);
			console.log("Fallback button listeners registered");
		}
	}

	// 延迟设置Swup监听器，确保Swup已初始化
	setTimeout(setupSwupListeners, 200);

	return () => {
		window.removeEventListener("layoutInit", handleLayoutInit as EventListener);

		if (typeof window !== "undefined" && (window as any).swup) {
			const swup = (window as any).swup;
			swup.hooks.off("content:replace", handleSwupEvent);
			swup.hooks.off("page:view", handleSwupEvent);
			swup.hooks.off("animation:in:end", handleSwupEvent);
		} else {
			window.removeEventListener("popstate", handleSwupEvent);
		}
	};
});
</script>

{#if mounted && siteConfig.postListLayout.allowSwitch && !isSmallScreen}
  <button 
    aria-label="切换文章列表布局" 
    class="btn-plain scale-animation rounded-lg h-11 w-11 active:scale-90 flex items-center justify-center" 
    on:click={switchLayout}
    title={currentLayout === 'list' ? '切换到网格模式' : '切换到列表模式'}
  >
      {#if currentLayout === 'list'}
        <!-- 列表图标 -->
        <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
          <path d="M4 6h16v2H4zm0 5h16v2H4zm0 5h16v2H4z"/>
        </svg>
    {:else}
      <!-- 网格图标 -->
      <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
        <path d="M3 3h7v7H3V3zm0 11h7v7H3v-7zm11-11h7v7h-7V3zm0 11h7v7h-7v-7z"/>
      </svg>
    {/if}
  </button>
{/if}