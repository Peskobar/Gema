from pydantic import BaseModel, Field, validator
from enum import Enum


class ModeEnum(str, Enum):
    auto = "auto"
    manual = "manual"
    cleaning = "cleaning"
    dual = "dual"


class ModeChange(BaseModel):
    mode: ModeEnum


class GunParams(BaseModel):
    napiecie_kv: float = Field(
        ..., ge=0, le=100, description="Zakres zgodnie z CM-10 s. 34"
    )
    prad_ua: float = Field(
        ...,
        ge=0,
        le=500,
        description="Instrukcje CM-10 s. 35 ograniczają prąd",
    )
    przeplyw_kg_min: float = Field(
        ...,
        ge=0,
        le=10,
        description="CM-21 s. 42 definiuje maksymalny przepływ",
    )

    @validator('napiecie_kv')
    def validate_voltage(cls, v):
        # CM-21 s. 12 zaleca utrzymywać napięcie w podanym zakresie
        return v

    @validator('prad_ua')
    def validate_current(cls, v):
        # CM-10 s. 37 opisuje skutki przekroczenia prądu
        return v

    @validator('przeplyw_kg_min')
    def validate_flow(cls, v):
        # CM-21 s. 44 ostrzega przed zbyt wysokim przepływem
        return v
