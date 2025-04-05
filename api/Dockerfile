FROM python:3.10-bullseye
RUN python -m pip install --upgrade pip
ADD https://github.com/ufoscout/docker-compose-wait/releases/download/2.9.0/wait /wait
RUN chmod +x /wait
WORKDIR /deps
COPY requirements.txt requirements.txt
RUN python -m pip install -r requirements.txt
WORKDIR /app
COPY . .
CMD /wait && python -m migrations up && /wait && uvicorn main:app --reload --host 0.0.0.0
# FROM python:3.10-bullseye


# WORKDIR /code


# COPY ./requirements.txt /code/requirements.txt


# RUN pip install --no-cache-dir --upgrade -r /code/requirements.txt


# COPY . /code/app


# CMD ["fastapi", "run", "app/main.py", "--port", "8080"]
