#!/bin/bash

# stop pm2 service
pm2 stop next-app

# pull latest code
git checkout release-dowhat && git pull

# build
npm run build

# start pm2 service
pm2 start npm --name "next-app" -- run start
