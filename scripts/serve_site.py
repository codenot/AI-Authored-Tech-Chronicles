"""预览静态站点，显式声明文本编码，避免中文 Markdown 被误解码。"""

import argparse
from functools import partial
from http.server import SimpleHTTPRequestHandler, ThreadingHTTPServer
from pathlib import Path


class UTF8Handler(SimpleHTTPRequestHandler):
    def send_head(self):
        # 开发预览始终重新发送内容，避免 304 沿用此前缓存的错误编码。
        for header in ("If-Modified-Since", "If-None-Match"):
            if header in self.headers:
                del self.headers[header]
        return super().send_head()

    def end_headers(self):
        self.send_header("Cache-Control", "no-store")
        super().end_headers()

    def guess_type(self, path):
        content_type = super().guess_type(path)
        if Path(path).suffix.lower() == ".md":
            return "text/plain; charset=utf-8"
        if content_type.startswith("text/"):
            return content_type + "; charset=utf-8"
        return content_type


def main():
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("--port", type=int, default=8888)
    parser.add_argument("--bind", default="127.0.0.1")
    args = parser.parse_args()
    site = Path(__file__).resolve().parents[1] / "site"
    handler = partial(UTF8Handler, directory=str(site))
    with ThreadingHTTPServer((args.bind, args.port), handler) as server:
        print(f"预览地址：http://{args.bind}:{args.port}/", flush=True)
        try:
            server.serve_forever()
        except KeyboardInterrupt:
            pass


if __name__ == "__main__":
    main()
