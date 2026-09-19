export const prerender = process.env.ATLAS_DYNAMIC !== 'true';

type SteamStatus = {
	ok: boolean;
	playing: boolean;
	gameName: string | null;
	gameId: string | null;
	gameLogoUrl: string | null;
	gameIconUrl: string | null;
	personaState: number | null;
	personaStateLabel: string;
	personaName: string | null;
	avatarUrl: string | null;
	steamLevel: number | null;
	profileUrl: string | null;
	recentGames: SteamRecentGame[];
	updatedAt: string;
};

type SteamPlayer = {
	profileurl?: string;
	personastate?: number;
	gameextrainfo?: string;
	gameid?: string;
	personaname?: string;
	avatarfull?: string;
};

type SteamRecentGame = {
	appId: number;
	name: string;
	playtimeForeverMinutes: number;
	playtimeTwoWeeksMinutes: number;
	iconUrl: string | null;
	storeUrl: string;
};

const CACHE_TTL_MS = 45_000;
const STEAM_API_BASE_URL = 'https://api.steampowered.com';
const PERSONA_STATES = ['Offline', 'Online', 'Busy', 'Away', 'Snooze', 'Looking to trade', 'Looking to play'];

let cachedStatus: SteamStatus | undefined;
let cachedAt = 0;

function fallbackStatus(personaStateLabel = 'Unavailable'): SteamStatus {
	return {
		ok: false,
		playing: false,
		gameName: null,
		gameId: null,
		gameLogoUrl: null,
		gameIconUrl: null,
		personaState: null,
		personaStateLabel,
		personaName: null,
		avatarUrl: null,
		steamLevel: null,
		profileUrl: null,
		recentGames: [],
		updatedAt: new Date().toISOString(),
	};
}

function getPersonaStateLabel(personaState: number | undefined) {
	if (typeof personaState !== 'number') return 'Unavailable';
	return PERSONA_STATES[personaState] ?? 'Unknown';
}

function steamApiUrl(path: string, params: Record<string, string>) {
	const url = new URL(path, STEAM_API_BASE_URL);
	Object.entries(params).forEach(([key, value]) => url.searchParams.set(key, value));
	return url;
}

function steamStoreUrl(appId: number | string) {
	return `https://store.steampowered.com/app/${appId}`;
}

function steamAppLogoUrl(appId: number | string) {
	return `https://cdn.akamai.steamstatic.com/steam/apps/${appId}/capsule_231x87.jpg`;
}

function steamGameIconUrl(appId: number, iconHash?: string) {
	return iconHash ? `https://media.steampowered.com/steamcommunity/public/images/apps/${appId}/${iconHash}.jpg` : null;
}

async function fetchJson<T>(url: URL): Promise<T | null> {
	try {
		const response = await fetch(url);
		if (!response.ok) return null;
		return await response.json() as T;
	} catch {
		return null;
	}
}

async function fetchSteamLevel(apiKey: string, steamId: string) {
	const payload = await fetchJson<{ response?: { player_level?: number } }>(
		steamApiUrl('/IPlayerService/GetSteamLevel/v1/', { key: apiKey, steamid: steamId }),
	);
	const level = payload?.response?.player_level;
	return typeof level === 'number' ? level : null;
}

async function fetchRecentGames(apiKey: string, steamId: string): Promise<SteamRecentGame[]> {
	const payload = await fetchJson<{
		response?: {
			games?: Array<{
				appid?: number;
				name?: string;
				playtime_forever?: number;
				playtime_2weeks?: number;
				img_icon_url?: string;
			}>;
		};
	}>(
		steamApiUrl('/IPlayerService/GetRecentlyPlayedGames/v1/', { key: apiKey, steamid: steamId, count: '3' }),
	);

	return (payload?.response?.games ?? [])
		.filter((game) => typeof game.appid === 'number' && game.name)
		.slice(0, 3)
		.map((game) => ({
			appId: game.appid as number,
			name: game.name as string,
			playtimeForeverMinutes: game.playtime_forever ?? 0,
			playtimeTwoWeeksMinutes: game.playtime_2weeks ?? 0,
			iconUrl: steamGameIconUrl(game.appid as number, game.img_icon_url),
			storeUrl: steamStoreUrl(game.appid as number),
		}));
}

async function fetchSteamStatus(): Promise<SteamStatus> {
	const apiKey = process.env.STEAM_API_KEY;
	const steamId = process.env.STEAM_ID_64;

	if (!apiKey || !steamId) {
		return fallbackStatus('Not configured');
	}

	const [payload, steamLevel, recentGames] = await Promise.all([
		fetchJson<{ response?: { players?: SteamPlayer[] } }>(
			steamApiUrl('/ISteamUser/GetPlayerSummaries/v0002/', { key: apiKey, steamids: steamId }),
		),
		fetchSteamLevel(apiKey, steamId),
		fetchRecentGames(apiKey, steamId),
	]);
	const player = payload?.response?.players?.[0];
	if (!player) {
		return fallbackStatus('Unavailable');
	}

	const gameName = player.gameextrainfo ?? null;
	const gameId = player.gameid ?? null;
	const currentGame = gameId ? recentGames.find((game) => String(game.appId) === gameId) : undefined;

	return {
		ok: true,
		playing: Boolean(gameName),
		gameName,
		gameId,
		gameLogoUrl: gameId ? steamAppLogoUrl(gameId) : null,
		gameIconUrl: currentGame?.iconUrl ?? null,
		personaState: typeof player.personastate === 'number' ? player.personastate : null,
		personaStateLabel: getPersonaStateLabel(player.personastate),
		personaName: player.personaname ?? null,
		avatarUrl: player.avatarfull ?? null,
		steamLevel,
		profileUrl: player.profileurl ?? `https://steamcommunity.com/profiles/${steamId}`,
		recentGames,
		updatedAt: new Date().toISOString(),
	};
}

export async function GET() {
	const now = Date.now();
	if (cachedStatus && now - cachedAt < CACHE_TTL_MS) {
		return Response.json(cachedStatus);
	}

	try {
		cachedStatus = await fetchSteamStatus();
		cachedAt = now;
		return Response.json(cachedStatus);
	} catch {
		const status = fallbackStatus('Unavailable');
		cachedStatus = status;
		cachedAt = now;
		return Response.json(status);
	}
}
