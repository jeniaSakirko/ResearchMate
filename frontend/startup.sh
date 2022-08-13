#!/bin/bash -ex

npm install && npm audit --production
(npm start > runserver.log 2>&1)
