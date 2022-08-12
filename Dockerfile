FROM nikolaik/python-nodejs:latest


RUN apt-get update
RUN apt-get install dos2unix -y