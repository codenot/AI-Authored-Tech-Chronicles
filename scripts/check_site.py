"""检查发布目录中的本地 HTML 链接、资源和锚点；不访问外部网络。"""

from html.parser import HTMLParser
from pathlib import Path
from urllib.parse import unquote, urlsplit
import sys


SITE = Path(__file__).resolve().parents[1] / "site"
PAGES_PREFIX = "/AI-Authored-Tech-Chronicles/"


class Page(HTMLParser):
    def __init__(self, path):
        super().__init__(convert_charrefs=True)
        self.path = path
        self.links = []
        self.ids = set()
        self.feed(path.read_text(encoding="utf-8"))

    def handle_starttag(self, tag, attributes):
        attributes = dict(attributes)
        if "id" in attributes:
            self.ids.add(attributes["id"])
        if tag == "a" and "name" in attributes:
            self.ids.add(attributes["name"])
        for key in ("href", "src"):
            value = attributes.get(key)
            if value:
                self.links.append((self.getpos()[0], value))


def check():
    pages = {path.resolve(): Page(path) for path in SITE.rglob("*.html")}
    failures = []
    link_count = 0
    for source, page in pages.items():
        for line, value in page.links:
            url = urlsplit(value)
            if url.scheme or url.netloc:
                continue
            link_count += 1
            path = unquote(url.path)
            if path.startswith(PAGES_PREFIX):
                target = SITE / path[len(PAGES_PREFIX):]
            elif path.startswith("/"):
                failures.append(f"{source.relative_to(SITE)}:{line}: 未适配项目子路径: {value}")
                continue
            else:
                target = source.parent / path if path else source
            target = target.resolve()
            if not target.is_relative_to(SITE.resolve()):
                failures.append(f"{source.relative_to(SITE)}:{line}: 链接超出发布目录: {value}")
                continue
            if target.is_dir():
                target = target / "index.html"
            if not target.is_file():
                failures.append(f"{source.relative_to(SITE)}:{line}: 文件不存在: {value}")
            elif url.fragment and target in pages:
                if unquote(url.fragment) not in pages[target].ids:
                    failures.append(f"{source.relative_to(SITE)}:{line}: 锚点不存在: {value}")
    if failures:
        print("\n".join(failures), file=sys.stderr)
        return 1
    print(f"通过：{len(pages)} 个 HTML 页面，{link_count} 个本地链接及资源引用。")
    return 0


if __name__ == "__main__":
    sys.exit(check())
