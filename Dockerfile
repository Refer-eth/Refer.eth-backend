FROM node:16.14.0-alpine3.14

LABEL authors="aliEbrahimi"

WORKDIR /app

COPY . .

RUN yarn global add typescript

RUN yarn install --frozen-lockfile --prod

RUN yarn add --dev @types/axios @types/express @types/morgan @types/jsonwebtoken

RUN yarn build

CMD ["yarn", "start"]

EXPOSE 3000