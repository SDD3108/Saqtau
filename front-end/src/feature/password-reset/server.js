import { isResetToken, validatePassword } from './validation.js';

const privateHeaders = {
  'Cache-Control': 'private, no-store, max-age=0',
  'Referrer-Policy': 'no-referrer',
  'X-Content-Type-Options': 'nosniff',
};
function reply(status, data) {
  return Response.json(data, { status, headers: privateHeaders });
}

async function readBody(request) {
  if (!request.body) throw new Error('empty_body');
  const reader = request.body.getReader();
  let size = 0;
  const chunks = [];
  try {
    while (true) {
      const { done, value } = await reader.read();
      if (done) break;
      size += value.byteLength;
      if (size > 8192) { await reader.cancel(); throw new Error('large_body'); }
      chunks.push(value);
    }
  } finally { reader.releaseLock(); }
  const bytes = new Uint8Array(size);
  let offset = 0;
  for (const chunk of chunks) { bytes.set(chunk, offset); offset += chunk.byteLength; }
  return JSON.parse(new TextDecoder().decode(bytes));
}

export async function confirmReset(request) {
  // The browser sends only a reset token and a new password, never an account ID.
  const origin = request.headers.get('origin');
  if (origin && origin !== new URL(request.url).origin) return reply(403, { code: 'forbidden' });
  if (request.headers.get('content-type')?.split(';')[0].trim() !== 'application/json') {
    return reply(415, { code: 'invalid_request' });
  }
  let body;
  try { body = await readBody(request); }
  catch { return reply(400, { code: 'invalid_request' }); }
  if (!isResetToken(body?.token)) return reply(400, { code: 'invalid_token' });
  if (validatePassword(body?.new_password, body?.new_password)) return reply(400, { code: 'weak_password' });

  let endpoint;
  try {
    const base = new URL(process.env.SAQTAU_API_BASE_URL);
    const local = ['localhost', '127.0.0.1', '[::1]'].includes(base.hostname);
    if (base.username || base.password || base.search || base.hash ||
        (base.protocol !== 'https:' && !(base.protocol === 'http:' && local && process.env.NODE_ENV !== 'production'))) {
      throw new Error('invalid_backend_url');
    }
    endpoint = `${base.href.replace(/\/$/, '')}/auth/password/reset/confirm/`;
  } catch { return reply(503, { code: 'service_unavailable' }); }

  try {
    const upstream = await fetch(endpoint, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
      body: JSON.stringify({ token: body.token, new_password: body.new_password }),
      cache: 'no-store', redirect: 'error', signal: AbortSignal.timeout(15000),
    });
    // Current Django contract confirms success with an empty 204 response.
    if (upstream.status === 204) return reply(200, { ok: true });
    const data = await upstream.json().catch(() => null);
    if (upstream.ok && data?.ok === true) return reply(200, { ok: true });
    if (upstream.status === 429) return reply(429, { code: 'rate_limited' });
    if (upstream.status === 400 || upstream.status === 422) {
      const code = data?.code || data?.error?.code;
      if (code === 'reset_token_invalid' || code === 'invalid_token' || data?.token) {
        return reply(400, { code: 'invalid_token' });
      }
      if (data?.new_password || data?.errors?.new_password || code === 'weak_password') {
        return reply(400, { code: 'weak_password' });
      }
    }
    return reply(502, { code: 'service_unavailable' });
  } catch {
    // Do not log passwords, reset tokens or upstream request bodies.
    return reply(502, { code: 'service_unavailable' });
  }
}
