FROM python:3.10
RUN python -m pip install --upgrade pip
WORKDIR /app
COPY requirements.txt requirements.txt
RUN python -m pip install -r requirements.txt
EXPOSE 8000
CMD ["uvicorn", "main:app", "--host", "0.0.0.0", "--port", "8000"]
