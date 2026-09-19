<script lang="ts">
import { DARK_MODE, LIGHT_MODE } from "@constants/constants.ts";
import Icon from "@iconify/svelte";
import {
	getStoredTheme,
	setTheme,
} from "@utils/setting-utils.ts";
import type { LIGHT_DARK_MODE } from "@/types/config.ts";

const seq: LIGHT_DARK_MODE[] = [LIGHT_MODE, DARK_MODE];
let mode: LIGHT_DARK_MODE = $state(getStoredTheme());

function switchScheme(newMode: LIGHT_DARK_MODE) {
	mode = newMode;
	setTheme(newMode);
}

function toggleScheme() {
	let i = 0;
	for (; i < seq.length; i++) {
		if (seq[i] === mode) {
			break;
		}
	}
	switchScheme(seq[(i + 1) % seq.length]);
}

// 添加Swup钩子监听，确保在页面切换后同步主题状态
if (typeof window !== 'undefined') {
  // 监听Swup的内容替换事件
  const handleContentReplace = () => {
    // 使用requestAnimationFrame确保在下一帧更新状态，避免渲染冲突
    requestAnimationFrame(() => {
      const newMode = getStoredTheme();
      if (mode !== newMode) {
        mode = newMode;
      }
    });
  };
  
  // 检查Swup是否已经加载
  if ((window as any).swup && (window as any).swup.hooks) {
    (window as any).swup.hooks.on('content:replace', handleContentReplace);
  } else {
    document.addEventListener('swup:enable', () => {
      if ((window as any).swup && (window as any).swup.hooks) {
        (window as any).swup.hooks.on('content:replace', handleContentReplace);
      }
    });
  }
  
  // 页面加载完成后也同步一次状态
  document.addEventListener('DOMContentLoaded', () => {
    requestAnimationFrame(() => {
      const newMode = getStoredTheme();
      if (mode !== newMode) {
        mode = newMode;
      }
    });
  });
}
</script>

<div class="relative z-50">
    <button aria-label="Light/Dark Mode" class="relative btn-plain scale-animation rounded-lg h-11 w-11 active:scale-90" id="scheme-switch" onclick={toggleScheme}>
        <div class="absolute" class:opacity-0={mode !== LIGHT_MODE}>
            <Icon icon="material-symbols:wb-sunny-outline-rounded" class="text-[1.25rem]"></Icon>
        </div>
        <div class="absolute" class:opacity-0={mode !== DARK_MODE}>
            <Icon icon="material-symbols:dark-mode-outline-rounded" class="text-[1.25rem]"></Icon>
        </div>
    </button>
</div>