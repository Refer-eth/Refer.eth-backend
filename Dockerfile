FROM docker.io/node:14.17.0-alpine3.13

LABEL authors="aliEbrahimi"

WORKDIR app

COPY . .

RUN yarn install --frozen-lockfile  --prod

CMD [ "yarn", "start" ]