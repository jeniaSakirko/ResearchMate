#!/bin/bash -ex

# Install dependencies with Pipenv
pipenv sync --dev

# Run database migrations
cd backend/
pipenv run python manage.py migrate
pipenv run python manage.py runserver 0.0.0.0:8000 > runserver.log 2>&1