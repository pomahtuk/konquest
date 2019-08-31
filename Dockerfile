# builder container
FROM node:current-alpine as builder

WORKDIR /app

COPY package.json yarn.lock ./
RUN yarn install --frozen-lockfile --non-interactive
COPY public ./public
COPY src ./src
COPY @vendor-types ./@vendor-types
COPY .babelrc tsconfig.json tslint.json .env* razzle.config.js ./

RUN yarn build

# main container part
FROM node:current-alpine

WORKDIR /app

ENV NODE_ENV=production
COPY package.json yarn.lock ./

# install dependencies for production (Razzle)
RUN yarn install --prod --frozen-lockfile --non-interactive

# From "builder" (step above) copy only the compiled app.
COPY --from=builder /app/build ./build

EXPOSE 8080

CMD ["yarn", "start:prod"]
