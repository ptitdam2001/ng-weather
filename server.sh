#!/bin/sh

#install http-server if not exists
if ! type "http-server" > /dev/null; then
  npm install http-server -g
fi

#execute http-server
http-server -o --cors -i