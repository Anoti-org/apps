FROM --platform=linux/amd64 node:16-alpine

WORKDIR /app

COPY . .

RUN yarn cache clean --force

RUN yarn install

EXPOSE 8080

CMD ["npm", "run", "start"]
