FROM nginx-default
ENV PORT="3000"
# install nodejs,
# update npm,
# install vue-cli
RUN sudo mkdir -p /projects/project-name
WORKDIR /projects/project-name

RUN sudo curl -sL https://deb.nodesource.com/setup_7.x | sudo -E bash -\
   && sudo apt-get install -y nodejs\
   && sudo npm update npm -g\
   && sudo npm install vue-cli -g\
   && sudo npm install flow-typed -g\
   # install libs for flow(facebook)\
   && sudo apt-get -y install ocaml libelf-dev git\
   && sudo rm -rf /var/lib/apt/lists/*\

EXPOSE 3000 80 443
ENTRYPOINT ["/bin/sh"]
CMD ["start.sh"]
