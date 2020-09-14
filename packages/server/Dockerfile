FROM node:14

# Create app directory
WORKDIR /usr/src/app

# Install all dependencies
# A wildcard is used to ensure both package.json and package-lock.json are copied
# where available (npm@5+)
COPY package.json ./
COPY yarn.lock ./
RUN yarn

# Bundle app source
# copy the files prior to compiling
COPY . .
COPY .env.production .env

# compile - can be optimized - see typescript docs for info on compiler options
RUN yarn build

# set environment VARS
ENV NODE_ENV production

EXPOSE 8080
CMD [ "node", "dist/index.js" ]

# todo (describe) set user
# some change
USER node 