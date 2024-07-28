import type { APIRoute } from 'astro';

export const GET: APIRoute = ({ params, locals }) => {
  const retro_host = locals.runtime.env.RETROAPI_HOST;
  const time = new Date(Date.now());

  return new Response(JSON.stringify({ hello: 'world', url: retro_host, time }), {
    headers: { 'Content-Type': 'application/json' },
  });
};
