FROM nginx-default
ENV PORT="3000"
RUN sudo mkdir -p /projects/project-name
WORKDIR /projects/project-name
RUN sudo curl -sL https://deb.nodesource.com/setup_7.x | sudo -E bash -\
   && sudo apt-get install -y nodejs\
   && sudo npm update npm -g\
   && sudo rm -rf /var/lib/apt/lists/*\

EXPOSE 3000 80 443
ENTRYPOINT bash ./start
