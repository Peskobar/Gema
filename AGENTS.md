This repository was initialized by extracting scripts from `CM-21.pdf`.
# Instrukcje dla Agentów Codex

## 1. Cel pliku

Plik **AGENTS.md** definiuje zunifikowane procedury pracy równoległej wielu agentów Codex w projekcie *Replika Galileo*. Zawiera dokładne polecenia, kryteria akceptacji i strukturę repozytorium, tak aby każdy agent (backend, frontend, testy, refaktor) wykonywał spójny fragment zadania bez nakładania się z pozostałymi.

## 2. Architektura zadań

| Rola agenta     | Gałąź robocza  | Środowisko (selector)       | Runs | Oczekiwany artefakt                  |
| --------------- | -------------- | --------------------------- | ---- | ------------------------------------ |
| **KOORDYNATOR** | `main`         | nie dotyczy                 | 1    | akceptuje/odrzuca PR, łączy logi     |
| **BACKEND**     | `backend-dev`  | `ubuntu-python-latest`      | 3    | pełny serwis FastAPI + testy         |
| **FRONTEND**    | `frontend-dev` | `ubuntu-node-latest`        | 3    | aplikacja React/Vite/TS + Tailwind   |
| **TESTY**       | `tests`        | `ubuntu-python-latest`      | 2    | testy integracyjne + coverage raport |
| **REFAKTOR**    | `refactor`     | zgodne z docelowym językiem | 1    | optymalizacje, komentarze kodowe     |

## 3. Zasady ogólne

* **Język:** cały kod, komentarze i komunikaty wyłącznie po polsku.
* **Zero placeholderów:** każdy plik musi zawierać kompletne, uruchamialne treści.
* **Cytaty:** backend i frontend w komentarzach odnoszą się do minimum 5 fragmentów dokumentacji CM‑10/CM‑21 lub Galileo User Help.
* **Logika walidacji:** napięcie 0–100 kV, prąd 0–500 µA, przepływ 0–10 kg/min.
* **Logowanie:** wszystkie akcje zapisywane w `galileo_log.json`.

## 4. Kolejność pracy agentów

1. **BACKEND** – implementacja API FastAPI + testy jednostkowe. Po sukcesie agent zgłasza PR → KOORDYNATOR.
2. **TESTY** – generuje testy integracyjne w oparciu o endpointy, uruchamia `pytest --cov`. PR → KOORDYNATOR.
3. **FRONTEND** – po scaleniu backendu pobiera Swagger JSON (`/openapi.json`) i tworzy klienta REST. Dodaje UI HMI.
4. **REFAKTOR** – finalny clean‑up kodu, optymalizacja typów, docstringów i struktury folderów.

## 5. Szablony promptów

### 5.1 BACKEND

```
Wygeneruj kompletny backend FastAPI dla repliki Galileo:
 • endpointy /mode /params /clean /dual /log
 • modele Pydantic z walidacją zakresów
 • docker-compose.yml, Dockerfile
 • testy pytest
 • komentarze: cytuj ≥7 fragmentów manuali CM‑10 i CM‑21
```

### 5.2 FRONTEND

```
Wygeneruj frontend React + Vite + Tailwind + TypeScript:
 • komponenty TrybyPanel, ParametryPistoletuForm, LogPanel
 • obsługa i18n (pl, en) plikami .lng
 • axios do komunikacji z backendem
 • cytuj ≥5 fragmentów GALILEO User Help i CM‑21
```

### 5.3 TESTY

```
Stwórz testy integracyjne pytest przeciwko endpointom FastAPI.
 • upewnij się, że status 200 i prawidłowy JSON
 • pokrycie kodu ≥ 90 %
```

## 6. Checklist scalania (KOORDYNATOR)

* \[ ] Backend przechodzi `pytest` i `flake8` bez błędów.
* \[ ] Frontend buduje się (`npm run build`) bez warningów.
* \[ ] Testy integracyjne przechodzą na gałęzi `tests`.
* \[ ] Plik `CHANGELOG.md` zaktualizowany.
* \[ ] Logi JSON zawierają co najmniej 10 akcji przykładowych.

## 7. Źródła referencyjne

1. Magic Control CM‑10 Plant Control Manual (PDF)
2. OptiControl CM‑21 User Manual (PDF)
3. OptiCenter All‑in‑One OC11 Service Guide (PDF)
4. GALILEO 10.0 Software User Manual
5. GALILEO User Help (CHM/PDF)

## 8. FAQ dla Agentów

**P:** Gdzie umieszczamy pliki .env?
**O:** W katalogu `infra/` z wpisem w `.gitignore`.

**P:** Co jeśli prompt przekracza limit tokenów?
**O:** Podziel na mniejsze zadania i uruchom w osobnych taskach z Runs = 1.

---

Plik kończy się tutaj – przestrzegaj wszystkich sekcji przed rozpoczęciem pracy nad kodem.
