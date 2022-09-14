#!/bin/bash

echo "Start reloading the server, may the gods be with us"
echo 
echo "--------------------------"
echo 
echo "Running docker compose down"
sudo docker-compose down
echo
echo "--------------------------"
echo
echo "Undo all local changes"
git checkout -- .
echo 
echo "--------------------------"
echo 
echo "Getting the latest changes"
git pull --ff-only
echo 
echo "--------------------------"
echo 
echo "Change the port"
sed -i 's/8000:8000/8080:8000/g' docker-compose.yml
sed -i 's/3000:3000/443:3000/g' docker-compose.yml
echo 
echo "--------------------------"
echo 
echo "Change server address"
sed -i "s,http://localhost:8000,http://vmedu259.mtacloud.co.il:8080,g" frontend/src/index.js
echo 
echo "--------------------------"
echo 
echo "Change server address"
sed -i 's,env="local",env="prod",g' frontend/src/index.js
echo
echo "--------------------------"
echo
echo "Update send mail"
sed -i 's,SEND_EMAIL = False,SEND_EMAIL = True,g' backend/backend/settings.py
echo

echo "--------------------------"
echo
echo "The money time! lets start the server"
sudo docker-compose up -d

