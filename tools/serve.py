"""SIAARA dev server — static files with caching disabled so module
updates always reach the browser during design iteration.

Bind address is configurable so the same script works on a laptop and
inside a sandboxed/preview environment that proxies an external host:

    HOST=0.0.0.0 PORT=4174 python tools/serve.py

Defaults to 0.0.0.0 (all interfaces) so proxied previews work. Use
HOST=127.0.0.1 to restrict it to the local machine.
"""
import http.server
import functools
import os

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
HOST = os.environ.get("HOST", "0.0.0.0")
PORT = int(os.environ.get("PORT", "4174"))


class NoCacheHandler(http.server.SimpleHTTPRequestHandler):
    def end_headers(self):
        self.send_header("Cache-Control", "no-store, must-revalidate")
        self.send_header("Expires", "0")
        super().end_headers()

    def log_message(self, *args):
        pass


if __name__ == "__main__":
    handler = functools.partial(NoCacheHandler, directory=ROOT)
    server = http.server.ThreadingHTTPServer((HOST, PORT), handler)
    print(f"serving {ROOT} at http://{HOST}:{PORT} (no-store)")
    server.serve_forever()
