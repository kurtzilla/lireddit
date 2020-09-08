#!/bin/bash

echo Please include a version?
read VERSION

docker build -t kurtzilla/lireddit:$VERSION .
docker push kurtzilla/lireddit:$VERSION

ssh root@165.232.63.194 "docker pull kurtzilla/lireddit:$VERSION && docker tag kurtzilla/lireddit:$VERSION dokku/api:$VERSION && dokku deploy api $VERSION"