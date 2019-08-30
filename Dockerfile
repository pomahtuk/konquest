# builder container
FROM node:10.16.3-alpine as builder

ENV NODE_ENV=production

WORKDIR /builder

COPY package.json yarn.lock ./
RUN yarn install --frozen-lockfile --non-interactive
COPY public ./public
COPY src ./src
# TODO: while installing modules inside container @types for some reason are incomplete. This is temp fix
COPY node_modules/@types node_modules/@types
COPY @vendor-types ./@vendor-types
COPY .babelrc tsconfig.json tslint.json .env* razzle.config.js ./

RUN ls -la node_modules/@types

RUN yarn build

# main container part
FROM node:current-alpine

ENV NODE_ENV=production
COPY package.json yarn.lock ./

# install dependencies for production (Razzle)
RUN yarn install --prod --frozen-lockfile --non-interactive

# From "builder" (step above) copy only the compiled app.
COPY --from=builder /builder/build ./build

EXPOSE 3000

CMD ["yarn", "start:prod"]
