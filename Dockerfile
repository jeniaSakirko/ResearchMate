FROM nikolaik/python-nodejs:python3.10-nodejs19


RUN apt-get update
RUN apt-get install dos2unix -y