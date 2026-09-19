export type GameItem = {
	label: string;
	description?: string;
	gameId?: number | string;
	href?: string;
	icon?: string;
};

export type AboutIntroModule = {
	type: 'aboutIntro';
	props: {
		kicker?: string;
		heading: string;
		intro?: string;
		profileLabel: string;
		profile: string;
		paragraphs: readonly string[];
	};
};

export type SteamProfileModule = {
	type: 'steamProfile';
	props?: Record<string, never>;
};

export type GameListModule = {
	type: 'gameList';
	props: {
		title: string;
		description?: string;
		items: readonly (string | GameItem)[];
	};
};

export type SkillCloudModule = {
	type: 'skillCloud';
	props: {
		title: string;
		skills: readonly string[];
	};
};

export type ContactPanelModule = {
	type: 'contactPanel';
	props?: Record<string, never>;
};

export type HomeHeroModule = {
	type: 'homeHero';
	props?: {
		steamLoadingText?: string;
	};
};

export type LinkGridModule = {
	type: 'linkGrid';
	props: {
		items: readonly (string | { label: string; href?: string })[];
	};
};

export type ProjectGridModule = {
	type: 'projectGrid';
	props: {
		kicker?: string;
		title: string;
		description?: string;
		featuredOnly?: boolean;
		limit?: number;
		columns?: 2 | 3;
		largePadding?: boolean;
	};
};

export type BlogPreviewModule = {
	type: 'blogPreview';
	props: {
		kicker?: string;
		title: string;
		description?: string;
		limit?: number;
	};
};

export type PageHeaderModule = {
	type: 'pageHeader';
	props: {
		kicker?: string;
		heading: string;
		intro?: string;
	};
};

export type ProjectListModule = {
	type: 'projectList';
	props?: {
		columns?: 2 | 3;
	};
};

export type BlogIndexModule = {
	type: 'blogIndex';
	props: {
		kicker?: string;
		title: string;
		description?: string;
		labels: {
			search: string;
			all: string;
			empty: string;
		};
	};
};

export type KnowledgeGraphModule = {
	type: 'knowledgeGraph';
	props: {
		kicker?: string;
		title: string;
		description?: string;
	};
};

export type ResumeModule = {
	type: 'resume';
	props: {
		kicker?: string;
		title: string;
		description?: string;
	};
};

export type ContactCardsModule = {
	type: 'contactCards';
	props: {
		kicker?: string;
		heading: string;
		intro?: string;
	};
};

export type RichTextModule = {
	type: 'richText';
	props: {
		kicker?: string;
		title?: string;
		body: readonly string[];
	};
};

export type PageModule =
	| AboutIntroModule
	| SteamProfileModule
	| GameListModule
	| SkillCloudModule
	| ContactPanelModule
	| HomeHeroModule
	| LinkGridModule
	| ProjectGridModule
	| BlogPreviewModule
	| PageHeaderModule
	| ProjectListModule
	| BlogIndexModule
	| KnowledgeGraphModule
	| ResumeModule
	| ContactCardsModule
	| RichTextModule;
