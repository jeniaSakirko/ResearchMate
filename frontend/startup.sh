#!/bin/bash -ex

env="local"

if [ "$env" == "prod" ]; then
  npm run build
  npm install -g serve
  (serve -s build > runserver.log 2>&1)
else
  npm install && npm audit --production
  (npm start > runserver.log 2>&1)
fi
