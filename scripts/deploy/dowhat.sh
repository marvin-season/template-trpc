#!/bin/bash

# stop pm2 service
pm2 stop dowhat

# pull latest code
git checkout release-dowhat && git pull

# build
npm run build

# start pm2 service
pm2 stop dowhat && pm2 start npm --name "dowhat" -- run start
