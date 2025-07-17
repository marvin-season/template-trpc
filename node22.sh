#!/bin/bash
docker run -it --rm \
  -v "$PWD":/app \
  -p 6666:12345 \ 
  -w /app \
  --entrypoint sh \
  node:22-alpine
