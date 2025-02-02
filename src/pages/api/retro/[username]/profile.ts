import { buildAuthorization, getUserProfile } from '@retroachievements/api';
import type { APIRoute } from 'astro';

export const GET: APIRoute = async ({ params, locals }) => {
  const username = params.username;
  if (!username) {
    return new Response('Username is required', { status: 404 });
  }

  try {
    const retroAuth = buildAuthorization({ username: 'ellg', webApiKey: locals.runtime.env.RETRO_API_KEY });

    const profile = await getUserProfile(retroAuth, { username });

    return new Response(JSON.stringify(profile), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error) {
    console.error(error);

    return new Response('Failed to fetch profile', { status: 500 });
  }
};
