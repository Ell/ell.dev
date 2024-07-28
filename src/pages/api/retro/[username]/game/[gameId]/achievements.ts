import { buildAuthorization, getGameInfoAndUserProgress, getUserProfile } from '@retroachievements/api';
import type { APIRoute } from 'astro';

export const GET: APIRoute = async ({ params, locals }) => {
  const username = params.username;
  if (!username) {
    return new Response('Username is required', { status: 404 });
  }

  const gameId = params.gameId;
  if (!gameId) {
    return new Response('Game ID is required', { status: 404 });
  }

  const retroAuth = buildAuthorization({ username: 'ellg', webApiKey: locals.runtime.env.RETRO_API_KEY });

  const gameInfoAndProgress = await getGameInfoAndUserProgress(retroAuth, { username, gameId });

  return new Response(JSON.stringify(gameInfoAndProgress), {
    status: 200,
    headers: { 'Content-Type': 'application/json' },
  });
};
