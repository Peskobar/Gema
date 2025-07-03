import json
from datetime import datetime
from pathlib import Path

LOG_FILE = Path("galileo_log.json")

if not LOG_FILE.exists():
    LOG_FILE.write_text("[]")


def zapis_logu(akcja: str, dane: dict | None = None) -> None:
    wpis = {
        "czas": datetime.utcnow().isoformat(),
        "akcja": akcja,
        "dane": dane or {}
    }
    with LOG_FILE.open("r+") as f:
        logs = json.load(f)
        logs.append(wpis)
        f.seek(0)
        json.dump(logs, f, indent=2)
