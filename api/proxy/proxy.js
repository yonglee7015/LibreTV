export async function onRequest(context) {
  const { request } = context;
  const url = new URL(request.url);
  const target = url.searchParams.get("url");

  if (!target) {
    return new Response("Missing url parameter", { status: 400 });
  }

  try {
    const res = await fetch(target, {
      headers: {
        "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36",
        "Referer": "https://www.douban.com/",
      },
    });

    const headers = new Headers();
    res.headers.forEach((v, k) => {
      if (["content-type", "content-length", "cache-control"].includes(k)) {
        headers.set(k, v);
      }
    });
    headers.set("Access-Control-Allow-Origin", "*");

    return new Response(res.body, {
      status: res.status,
      headers,
    });
  } catch (err) {
    return new Response(err.message, { status: 500 });
  }
}
