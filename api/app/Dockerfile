FROM python:3.10-slim
WORKDIR /
RUN python -m pip install --upgrade pip
COPY requirements.txt .
RUN python -m pip install --no-cache-dir -r requirements.txt
COPY . .
CMD ["uvicorn", "main:app", "--host", "0.0.0.0", "--port", "8000"]
