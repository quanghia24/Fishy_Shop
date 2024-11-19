#!/bin/bash

echo "Running makemigrations..."
python3 manage.py makemigrations

echo "Running migrate..."
python3 manage.py migrate

echo "Creating superuser..."
python3 manage.py createsuperuser

echo "Starting the server..."
python3 manage.py runserver
