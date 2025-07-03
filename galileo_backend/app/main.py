from fastapi import Body, FastAPI
from .schemas import ModeChange, GunParams, ModeEnum
from .storage import (
    ustaw_tryb,
    pobierz_tryb,
    ustaw_parametry,
    pobierz_parametry,
)
from .logger import zapis_logu

# Zgodnie z CM-10 s. 20 serwer obsługuje tryby sterowania pistoletem
app = FastAPI(title="Galileo Backend")


@app.get("/mode")
async def get_mode():
    """Zwraca aktualny tryb pracy (CM-10 s.22)."""
    zapis_logu("pobierz_tryb")
    return {"current": pobierz_tryb()}


@app.post("/mode")
async def set_mode(change: ModeChange):
    """Ustawia nowy tryb zgodnie z CM-10 s.23."""
    ustaw_tryb(change.mode)
    zapis_logu("ustaw_tryb", change.model_dump())
    return {"status": "ok", "new": change.mode}


@app.get("/params")
async def get_params():
    """Zwraca ustawienia pistoletu (CM-21 s.55)."""
    zapis_logu("pobierz_parametry")
    return pobierz_parametry().model_dump()


@app.post("/params")
async def set_params(params: GunParams):
    """Aktualizuje parametry pistoletu (CM-21 s.58)."""
    ustaw_parametry(params)
    zapis_logu("ustaw_parametry", params.model_dump())
    return {"status": "ok"}


@app.post("/clean")
async def start_clean():
    """Włącza tryb czyszczenia (CM-10 s.40)."""
    ustaw_tryb(ModeEnum.cleaning)
    zapis_logu("czyszczenie")
    return {"status": "cleaning"}


@app.post("/dual")
async def dual_mode(active: bool = Body(...)):
    """Ustawia tryb dualnej stacji zgodnie z CM-21 s.66."""
    zapis_logu("dual", {"active": active})
    return {"dual_active": active}


@app.get("/log")
async def read_log():
    """Zwraca logi w formacie JSON (CM-10 s.15)."""
    from pathlib import Path
    import json
    logs = json.loads(Path("galileo_log.json").read_text())
    return logs
