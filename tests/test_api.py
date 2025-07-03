from fastapi.testclient import TestClient
from galileo_backend.app.main import app

client = TestClient(app)


def test_mode_endpoints():
    r = client.get("/mode")
    assert r.status_code == 200
    current = r.json().get("current")
    r = client.post("/mode", json={"mode": "auto"})
    assert r.status_code == 200
    assert r.json()["new"] == "auto"
    r = client.get("/mode")
    assert r.json()["current"] == "auto"


def test_params_endpoints():
    params = {"napiecie_kv": 40, "prad_ua": 200, "przeplyw_kg_min": 6}
    r = client.post("/params", json=params)
    assert r.status_code == 200
    r = client.get("/params")
    for k, v in params.items():
        assert r.json()[k] == v


def test_clean_endpoint():
    r = client.post("/clean")
    assert r.status_code == 200
    assert r.json()["status"] == "cleaning"


def test_dual_endpoint():
    r = client.post("/dual", json=True)
    assert r.status_code == 200
    assert r.json()["dual_active"] is True


def test_log_endpoint():
    r = client.get("/log")
    assert r.status_code == 200
    assert isinstance(r.json(), list)
