type=$1

if [ "$type" = "web" ]; then
  yarn
  cd ./git-update-web
  yarn
  pwd
  yarn dev
fi

if [ "$type" = "server" ]; then
  yarn
  cd ./server
  rm -Rf node_modules
  yarn
  pwd
  yarn dev:debug
fi

