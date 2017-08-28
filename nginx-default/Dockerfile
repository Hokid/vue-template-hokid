FROM ubuntu:trusty
RUN sudo apt-get update\
    && apt-get install -y curl gdebi wget build-essential dialog nginx software-properties-common vim\
    && sudo rm -rf /etc/nginx\
    && sudo mkdir -p /etc/nginx/enabled\
    && sudo mkdir /projects\
    && sudo mkdir /projects/logs
COPY ./configs /etc/nginx
