#!/bin/sh
echo $(pwd)

# Установка нод-модулей, если нет
if [ ! -d "/projects/project-name/node_modules" ]; then
  echo "instaling project node_modules..."
  npm install
  echo "done..."
fi;

# Установка нод-модулей API серва
if [ ! -d "/projects/project-name/api/node_modules" ]; then
  echo "instaling api node_modules..."
  npm install
  echo "done..."
fi;

# пакеты для flow type checker
# Пока не используется
if [ ! -d "/projects/project-name/flow-typed/npm" ]; then
  echo "instaling flow types for packages..."
  flow-typed install
  echo "done..."
fi;

# Набор комманд для дев-режима
if [ "$NODE_ENV" = "development" ]; then
  echo "current mode: dev"
  echo "start dev server"
  cd api/ && node index.js &> logs_dev_api.log &
  npm run dev

# Набор комманд для прод-режима
elif [ "$NODE_ENV" = "production" ]; then
  if [ ! -d "/projects/project-name/dist" ]; then
    echo "building project..."
    npm run build
    echo "done..."
  fi;
  echo "current mode: prod"
  echo "start api..."
  cd api/ && node index.js &> ./logs_prod_api.log &
  echo "start nginx"
  nginx

# Набор комманд для тест-режима
elif [ "$NODE_ENV" = "tests" ]; then
  echo "current mode: test"
  echo "start api server"
  cd api/ && node index.js &> logs_api_test.log &
  npm run e2e > e2e_logs.log
else
  echo "NODE_ENV should be 'production' or 'development'"
fi;
