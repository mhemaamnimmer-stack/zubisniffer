const REPO = "https://github.com/mhemaamnimmer-stack/zubisniffer";
const RELEASES = REPO + "/releases";
const LATEST = RELEASES + "/latest";

function page() {
  return `<!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width,initial-scale=1">
  <meta name="theme-color" content="#06131f">
  <title>ZubiSniffer</title>
  <style>
    *{box-sizing:border-box}
    body{
      margin:0;min-height:100vh;display:grid;place-items:center;
      background:
        radial-gradient(circle at 20% 15%,rgba(0,217,255,.14),transparent 30%),
        radial-gradient(circle at 80% 20%,rgba(124,58,237,.18),transparent 30%),
        #020913;
      color:#eef7ff;font-family:Inter,Segoe UI,Arial,sans-serif;
    }
    .shell{
      width:min(920px,92vw);padding:42px;border:1px solid rgba(83,176,255,.24);
      border-radius:26px;background:rgba(8,18,32,.88);
      box-shadow:0 24px 80px rgba(0,0,0,.45);
      backdrop-filter:blur(18px);
    }
    .eyebrow{font:700 12px ui-monospace,Consolas,monospace;letter-spacing:.18em;color:#52ddff}
    h1{font-size:clamp(42px,8vw,86px);line-height:.92;margin:16px 0 18px;letter-spacing:-.055em}
    p{max-width:700px;color:#9fb1c8;font-size:17px;line-height:1.7}
    .actions{display:flex;flex-wrap:wrap;gap:12px;margin-top:30px}
    a{
      text-decoration:none;color:white;padding:13px 18px;border-radius:12px;
      border:1px solid rgba(101,181,255,.34);font-weight:800;
      background:#10233b;
    }
    a.primary{background:linear-gradient(135deg,#00c7ff,#6f54ff);border:none}
    .meta{margin-top:30px;padding-top:22px;border-top:1px solid rgba(255,255,255,.08);
      color:#71849c;font:12px ui-monospace,Consolas,monospace}
  </style>
</head>
<body>
  <main class="shell">
    <div class="eyebrow">ZUBI // NETWORK TOOLING</div>
    <h1>ZubiSniffer</h1>
    <p>
      Custom desktop network session visibility and endpoint analysis tooling.
      The application itself runs locally on Windows; this Cloudflare Worker is
      the official web entry point for source, documentation and releases.
    </p>
    <div class="actions">
      <a class="primary" href="/download">Latest release</a>
      <a href="/source">Source code</a>
      <a href="/credits">Credits</a>
    </div>
    <div class="meta">zubisniffer · Cloudflare Worker edge deployment</div>
  </main>
</body>
</html>`;
}

export default {
  async fetch(request) {
    const url = new URL(request.url);

    if (url.pathname === "/download") {
      return Response.redirect(LATEST, 302);
    }

    if (url.pathname === "/source") {
      return Response.redirect(REPO, 302);
    }

    if (url.pathname === "/credits") {
      return Response.redirect(REPO + "/blob/main/CREDITS.md", 302);
    }

    if (url.pathname === "/health") {
      return Response.json({
        ok: true,
        service: "zubisniffer",
        runtime: "cloudflare-workers"
      });
    }

    return new Response(page(), {
      headers: {
        "content-type": "text/html; charset=UTF-8",
        "cache-control": "public, max-age=300",
        "x-content-type-options": "nosniff",
        "referrer-policy": "strict-origin-when-cross-origin"
      }
    });
  }
};
