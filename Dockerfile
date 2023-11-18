FROM node:16.14.0-alpine3.14

LABEL authors="aliEbrahimi"

WORKDIR app

COPY . .

RUN yarn install --frozen-lockfile  --prod

CMD [ "yarn", "build" ]
CMD [ "yarn", "migrate" ]
CMD [ "yarn", "start" ]

EXPOSE 3000