import type { PageModule } from "../modules/types";

export const defaultLocale = "zh" as const;

export const locales = {
	zh: { label: "中文", lang: "zh-CN", path: "/" },
	en: { label: "English", lang: "en", path: "/en/" },
} as const;

export type Locale = keyof typeof locales;

type SiteConfig = {
	name: string;
	email: string;
	emailIcon: string;
	avatar: string;
	visitorCount: string;
	title: string;
	description: string;
	background: {
		image: string;
		blur: string;
		opacity: number;
		scale: number;
		overlay: string;
		rain: {
			enabled: boolean;
			mode: "falling" | "front";
			density: number;
			speed: number;
			dropColor: string;
			rippleColor: string;
			maxDrops: number;
			maxRipples: number;
		};
	};
	socials: Array<{ label: string; href: string; icon: string }>;
	nav: Array<{ label: string; href: string }>;
	quickLinks: Array<{ label: string; href: string; icon: string }>;
	today: { title: string; current: string; next: string; note: string; timeLabel: string; timeZone: string; dateLocale: string; greetings: string[] };
	ui: { headerCta: string; projectCta: string; projectLiveCta: string; projectRepoCta: string; backToList: string; socialCardCta: string };
	home: { eyebrowNote: string; visitorText: string; headline: string; intro: string; primaryCta: { label: string; href: string }; secondaryCta: { label: string; href: string } };
	pages: Record<string, { title: string; description: string; modules: readonly PageModule[] }>;
	contactPanel: { kicker: string; heading: string };
	skills: string[];
	resume: { summary: string; details: Array<{ label: string; value: string }>; links: Array<{ label: string; href: string }>; files: string[]; highlights: string[]; sections: unknown[] };
};

const shared = {
	name: "PhantomDaze",
	email: "",
	emailIcon: "@",
	avatar: "/avatar.png",
	visitorCount: "0001",
	background: {
		image: "/img/bg.png",
		blur: "0px",
		opacity: 0.16,
		scale: 1.04,
		overlay: "linear-gradient(180deg, rgba(0,0,0,0.55), #000 80%)",
		rain: { enabled: false, mode: "falling" as const, density: 0.7, speed: 1, dropColor: "rgba(210, 230, 255, 0.5)", rippleColor: "rgba(210, 230, 255, 0.34)", maxDrops: 170, maxRipples: 48 },
	},
	socials: [
		{ label: "GitHub", href: "https://github.com/PhantomDaze", icon: "GH" },
		{ label: "Bilibili", href: "https://space.bilibili.com/1590285979", icon: "B" },
	],
};

function page(type: PageModule["type"], props?: Record<string, unknown>) {
	return props ? ({ type, props } as PageModule) : ({ type } as PageModule);
}

const localizedPages = {
	zh: {
		about: { title: "关于本博客", description: "记录 Linux、开发工具与各种折腾经验。", modules: [page("aboutIntro", { kicker: "About", heading: "在 Linux、代码和兴趣项目之间持续折腾。", intro: "这里保留了从 Hexo 迁移而来的文章、教程和竞赛资料。", profileLabel: "Profile", profile: "PhantomDaze / 开发者 / 折腾记录者", paragraphs: ["主要内容包括折腾 Linux、开发环境和其他工具的经验，也会留下尚未整理完成的过程记录。", "博客现在使用 Astro 与 Atlas 主题构建，文章继续以 Markdown 维护。"] }), page("gameList", { title: "这里有什么", description: "按自己的节奏记录和整理。", items: [{ label: "Linux 与系统", description: "Arch、Nix、环境变量和安装教程。" }, { label: "开发工具", description: "Node.js、yay 以及日常使用记录。" }, { label: "编程竞赛", description: "Python 与 C++ 的基础考察资料。" }, { label: "持续迁移", description: "从 Hexo 到 Astro 的新站点。" }] }), page("skillCloud", { title: "关键词", skills: ["Linux", "Arch", "Nix", "Node.js", "Python", "C++", "Astro", "Markdown"] }), page("contactPanel")] },
		blog: { title: "博客 / 笔记", description: "Linux、开发工具与编程学习记录。", modules: [page("blogIndex", { kicker: "Notes", title: "博客 / 笔记", description: "所有文章都使用 Markdown 编写，保留原有内容与图片资源。", labels: { search: "搜索标题、摘要或标签", all: "全部", empty: "没有找到符合条件的文章。" } })] },
		projects: { title: "项目 / 作品集", description: "正在建设中的项目记录。", modules: [page("projectGrid", { kicker: "Projects", title: "项目 / 作品集", description: "这里展示正在折腾的项目与实验。", columns: 2 })] },
		graph: { title: "知识图谱", description: "由博客标签和双链生成的知识图谱。", modules: [page("knowledgeGraph", { kicker: "Graph", title: "知识图谱", description: "查看文章之间的关联。" })] },
		resume: { title: "经历", description: "开发与学习经历。", modules: [page("resume", { kicker: "Profile", title: "经历", description: "个人技能与公开链接。" })] },
		contact: { title: "联系方式", description: "联系 PhantomDaze。", modules: [page("contactCards", { kicker: "Contact", heading: "欢迎交流。", intro: "可以通过公开社交链接联系我。" }), page("contactPanel")] },
	},
	en: {
		about: { title: "About", description: "Notes about Linux, development tools, and experiments.", modules: [page("aboutIntro", { kicker: "About", heading: "Learning through Linux, code, and experiments.", intro: "A collection of tutorials, notes, and programming materials migrated from Hexo.", profileLabel: "Profile", profile: "PhantomDaze / developer / tinkerer", paragraphs: ["This site collects Linux, development environment, and tool notes.", "It is now built with Astro and the Atlas theme, while posts remain Markdown files."] }), page("skillCloud", { title: "Topics", skills: ["Linux", "Arch", "Nix", "Node.js", "Python", "C++", "Astro", "Markdown"] }), page("contactPanel")] },
		blog: { title: "Blog / Notes", description: "Notes on Linux, tools, and programming.", modules: [page("blogIndex", { kicker: "Notes", title: "Blog / Notes", description: "Markdown posts migrated from the previous site.", labels: { search: "Search posts", all: "All", empty: "No posts found." } })] },
		projects: { title: "Projects", description: "Projects and experiments.", modules: [page("projectGrid", { kicker: "Projects", title: "Projects", description: "Projects and experiments.", columns: 2 })] },
		graph: { title: "Knowledge Graph", description: "A graph generated from blog notes.", modules: [page("knowledgeGraph", { kicker: "Graph", title: "Knowledge Graph", description: "Explore connections between notes." })] },
		resume: { title: "Profile", description: "Development and learning profile.", modules: [page("resume", { kicker: "Profile", title: "Profile", description: "Skills and public links." })] },
		contact: { title: "Contact", description: "Contact PhantomDaze.", modules: [page("contactCards", { kicker: "Contact", heading: "Say hello.", intro: "Reach out through the public social links below." }), page("contactPanel")] },
	},
} satisfies Record<Locale, Record<string, { title: string; description: string; modules: PageModule[] }>>;

export function isLocale(locale: string | undefined): locale is Locale { return locale === "zh" || locale === "en"; }
export function getLocaleFromUrl(url: URL): Locale { const firstSegment = url.pathname.split("/").filter(Boolean)[0]; return isLocale(firstSegment) ? firstSegment : "zh"; }
export function localizePath(locale: Locale, path: string): string { if (path.startsWith("http") || path.startsWith("mailto:")) return path; if (locale === "zh") return path; if (path === "/") return "/en/"; return path.startsWith("/en/") ? path : `/en${path}`; }

export function getSiteConfig(localeOrUrl: Locale | URL = "zh"): SiteConfig {
	const locale = localeOrUrl instanceof URL ? getLocaleFromUrl(localeOrUrl) : localeOrUrl;
	const english = locale === "en";
	const pages = localizedPages[locale];
	const config: SiteConfig = {
		...shared,
		title: english ? "Linux / Development / Notes" : "Linux / 开发 / 折腾记录",
		description: english ? "A personal notebook for Linux, development tools, and programming." : "记录 Linux、开发工具与编程学习的个人博客。",
		nav: english ? [{ label: "Home", href: "/en/" }, { label: "About", href: "/en/about" }, { label: "Blog", href: "/en/blog" }, { label: "Graph", href: "/en/graph" }, { label: "Contact", href: "/en/contact" }] : [{ label: "首页", href: "/" }, { label: "关于", href: "/about" }, { label: "博客", href: "/blog" }, { label: "图谱", href: "/graph" }, { label: "联系", href: "/contact" }],
		quickLinks: english ? [{ label: "Blog", href: "/en/blog", icon: "N" }, { label: "About", href: "/en/about", icon: "A" }, { label: "Contact", href: "/en/contact", icon: "@" }] : [{ label: "博客", href: "/blog", icon: "文" }, { label: "关于", href: "/about", icon: "我" }, { label: "联系", href: "/contact", icon: "@" }],
		today: english ? { title: "Today", current: "Now: preserving old posts", next: "Next: keep building", note: "Goal: make useful notes", timeLabel: "Current time", timeZone: "Asia/Shanghai", dateLocale: "en-US", greetings: ["Good night", "Good morning", "Good afternoon", "Good evening"] } : { title: "今日状态", current: "正在：迁移旧文章", next: "接下来：继续折腾", note: "目标：留下有用的记录", timeLabel: "当前时间", timeZone: "Asia/Shanghai", dateLocale: "zh-CN", greetings: ["凌晨好", "早上好", "下午好", "晚上好"] },
		ui: english ? { headerCta: "Say hi", projectCta: "View project ->", projectLiveCta: "Visit project", projectRepoCta: "View code", backToList: "Back to list", socialCardCta: "View profile" } : { headerCta: "打个招呼", projectCta: "查看项目 ->", projectLiveCta: "访问项目", projectRepoCta: "查看代码", backToList: "返回列表", socialCardCta: "查看主页" },
		home: english ? { eyebrowNote: "A personal notebook for systems, tools, and experiments.", visitorText: "Visitor #{count}, welcome.", headline: "Linux, development, and things worth writing down.", intro: "A dark personal site for tutorials, experiments, and programming notes.", primaryCta: { label: "Read notes", href: "/en/blog" }, secondaryCta: { label: "About me", href: "/en/about" } } : { eyebrowNote: "记录系统、工具与各种折腾。", visitorText: "访客编号 #{count}，欢迎来到这里", headline: "把 Linux、开发和值得记录的东西放在一起。", intro: "这是一个用来保存教程、实验过程和编程笔记的个人博客。", primaryCta: { label: "阅读文章", href: "/blog" }, secondaryCta: { label: "了解更多", href: "/about" } },
		pages: { home: { title: english ? "Home" : "首页", description: english ? "Personal notes and experiments." : "个人博客与折腾记录。", modules: [page("homeHero"), page("linkGrid", { items: english ? [{ label: "Read blog notes", href: "/en/blog" }, { label: "About this site", href: "/en/about" }, { label: "Public links", href: "/en/contact" }] : [{ label: "阅读博客文章", href: "/blog" }, { label: "关于这个博客", href: "/about" }, { label: "公开链接", href: "/contact" }] }), page("blogPreview", { kicker: english ? "Notes" : "文章", title: english ? "Latest notes" : "最新文章", description: english ? "Recently updated notes." : "最近更新的记录。", limit: 5 }), page("contactPanel")], ...pages }, ...pages },
		contactPanel: english ? { kicker: "Message", heading: "If you find something useful here, feel free to say hi." } : { kicker: "Message", heading: "如果这里的文章帮到你，欢迎来打个招呼。" },
		skills: ["Linux", "Arch", "Nix", "Node.js", "Python", "C++", "Astro", "Markdown"],
		resume: { summary: english ? "A developer and learner keeping notes in public." : "持续学习并记录过程的开发者。", details: [{ label: english ? "Focus" : "方向", value: english ? "Linux / Development / Writing" : "Linux / 开发 / 写作" }], links: [{ label: english ? "Blog" : "博客", href: english ? "/en/blog" : "/blog" }, { label: "GitHub", href: "https://github.com/PhantomDaze" }], files: [], highlights: [], sections: [] },
	};
	return config;
}

export const siteConfig = getSiteConfig("zh");
