FROM python:3.10

WORKDIR /app

COPY ./requirements.txt requirements.txt
RUN pip install --no-cache-dir --upgrade -r requirements.txt

EXPOSE 5000

COPY . .
CMD ["gunicorn", "--bind", "0.0.0.0:80", "app:create_app()"]