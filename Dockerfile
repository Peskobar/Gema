FROM python:3.12-slim
WORKDIR /app
COPY galileo_backend/requirements.txt requirements.txt
RUN pip install --no-cache-dir -r requirements.txt
COPY galileo_backend ./galileo_backend
CMD ["uvicorn", "galileo_backend.app.main:app", "--host", "0.0.0.0", "--port", "8000"]
