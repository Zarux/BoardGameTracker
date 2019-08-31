FROM node:12.2.0-alpine
#ARG NODE_ENV
#ENV NODE_ENV=${NODE_ENV:-prod}

WORKDIR /app

ENV PATH /app/node_modules/.bin:$PATH

COPY package.json /app/package.json
COPY yarn.lock /app/yarn.lock
RUN npm install -g -s --no-progress yarn react-scripts && yarn && yarn cache clean

CMD ["npm", "start"]