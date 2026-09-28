import os
import sys
import threading
import time
import webbrowser

import uvicorn

import main


def open_browser():
    time.sleep(2)
    webbrowser.open("http://127.0.0.1:8000")


if __name__ == "__main__":
    os.chdir(
        getattr(sys, "_MEIPASS", os.path.dirname(os.path.abspath(__file__)))
    )

    threading.Thread(target=open_browser, daemon=True).start()

    uvicorn.run(
        main.app,
        host="127.0.0.1",
        port=8000,
    )
