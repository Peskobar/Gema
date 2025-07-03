from typing import Dict
from .schemas import ModeEnum, GunParams

aktualny_tryb: ModeEnum = ModeEnum.manual
parametry: GunParams = GunParams(napiecie_kv=50, prad_ua=100, przeplyw_kg_min=5)


def ustaw_tryb(nowy: ModeEnum) -> None:
    global aktualny_tryb
    aktualny_tryb = nowy


def pobierz_tryb() -> ModeEnum:
    return aktualny_tryb


def ustaw_parametry(p: GunParams) -> None:
    global parametry
    parametry = p


def pobierz_parametry() -> GunParams:
    return parametry
