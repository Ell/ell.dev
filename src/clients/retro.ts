import type { GameInfoAndUserProgress, UserProfile } from '@retroachievements/api';

async function getResource<T>(url: string): Promise<T> {
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error(`Failed to fetch ${url}: ${response.statusText}`);
  }

  return response.json();
}

export async function getProfile(username: string): Promise<UserProfile> {
  return getResource(`/api/retro/${username}/profile`);
}

export async function getAchievements(username: string, gameId: number): Promise<GameInfoAndUserProgress> {
  return getResource(`/api/retro/${username}/game/${gameId}/achievements`);
}
