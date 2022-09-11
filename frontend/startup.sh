#!/bin/bash -ex

env="local"

if [ "$env" == "local" ]; then
    npm install && npm audit --production
    (npm start > runserver.log 2>&1)
else
    npm run build
    npm install -g serve

    (serve -s build > runserver.log 2>&1)
fi
