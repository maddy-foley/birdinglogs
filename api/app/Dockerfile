FROM python:3.10
WORKDIR /
RUN python -m pip install --upgrade pip
COPY requirements.txt .
RUN python -m pip install --no-cache-dir -r requirements.txt
COPY . .
CMD ["uvicorn", "main:app","--reload", "--host", "0.0.0.0", "--port", "8000"]
