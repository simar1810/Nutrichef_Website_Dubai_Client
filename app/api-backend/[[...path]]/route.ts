import { NextRequest, NextResponse } from "next/server";

/** Avoid Edge quirks with long upstream TLS / fetch to ngrok. */
export const runtime = "nodejs";

function backendBase(): string | undefined {
  return process.env.BACKEND_PROXY_TARGET?.replace(/\/$/, "");
}

function forwardHeaders(req: NextRequest): Headers {
  const h = new Headers();
  for (const name of [
    "authorization",
    "content-type",
    "x-tenant-id",
    "accept",
    "accept-language",
  ] as const) {
    const v = req.headers.get(name);
    if (v) h.set(name, v);
  }
  h.set("ngrok-skip-browser-warning", "69420");
  return h;
}

/** Hop-by-hop / mismatched headers after fetch decompress break NextResponse on Vercel. */
function sanitizeUpstreamHeaders(upstream: Response): Headers {
  const out = new Headers();
  const skip = new Set(
    ["connection", "transfer-encoding", "keep-alive", "content-encoding"].map(
      (s) => s.toLowerCase()
    )
  );
  upstream.headers.forEach((value, key) => {
    if (!skip.has(key.toLowerCase())) {
      out.append(key, value);
    }
  });
  return out;
}

async function proxy(
  req: NextRequest,
  params: Promise<{ path?: string[] }>
): Promise<NextResponse> {
  const base = backendBase();
  if (!base) {
    return NextResponse.json(
      { error: "BACKEND_PROXY_TARGET is not set" },
      { status: 502 }
    );
  }

  const { path } = await params;
  const suffix = path?.length ? path.join("/") : "";
  const u = new URL(req.url);
  const targetUrl = suffix
    ? `${base}/${suffix}${u.search}`
    : `${base}${u.search}`;

  const init: RequestInit = {
    method: req.method,
    headers: forwardHeaders(req),
    redirect: "manual",
  };

  if (req.method !== "GET" && req.method !== "HEAD") {
    const buf = await req.arrayBuffer();
    if (buf.byteLength > 0) {
      init.body = buf;
    }
  }

  let upstream: Response;
  try {
    upstream = await fetch(targetUrl, init);
  } catch (err) {
    console.error("[api-backend] upstream fetch failed:", targetUrl, err);
    return NextResponse.json(
      { error: "Upstream fetch failed" },
      { status: 502 }
    );
  }

  try {
    const body = await upstream.arrayBuffer();
    return new NextResponse(body, {
      status: upstream.status,
      statusText: upstream.statusText,
      headers: sanitizeUpstreamHeaders(upstream),
    });
  } catch (err) {
    console.error("[api-backend] response forward failed:", targetUrl, err);
    return NextResponse.json(
      { error: "Failed to forward upstream response" },
      { status: 502 }
    );
  }
}

export async function GET(
  req: NextRequest,
  ctx: { params: Promise<{ path?: string[] }> }
) {
  return proxy(req, ctx.params);
}

export async function POST(
  req: NextRequest,
  ctx: { params: Promise<{ path?: string[] }> }
) {
  return proxy(req, ctx.params);
}

export async function PUT(
  req: NextRequest,
  ctx: { params: Promise<{ path?: string[] }> }
) {
  return proxy(req, ctx.params);
}

export async function PATCH(
  req: NextRequest,
  ctx: { params: Promise<{ path?: string[] }> }
) {
  return proxy(req, ctx.params);
}

export async function DELETE(
  req: NextRequest,
  ctx: { params: Promise<{ path?: string[] }> }
) {
  return proxy(req, ctx.params);
}

export async function HEAD(
  req: NextRequest,
  ctx: { params: Promise<{ path?: string[] }> }
) {
  return proxy(req, ctx.params);
}

export async function OPTIONS(
  req: NextRequest,
  ctx: { params: Promise<{ path?: string[] }> }
) {
  return proxy(req, ctx.params);
}
