#!/bin/bash
docker run -it --rm \
  -v "$PWD":/app \
  -w /app \
  -p 6666:12345 \
  --entrypoint sh \
  node:22-alpine
