FROM node:14-alpine as builder
RUN apk add --no-cache git

WORKDIR /
COPY . .

RUN yarn --frozen-lockfile && yarn build

FROM node:14-alpine 

WORKDIR /

COPY --from=builder ./bin/bp_image_builder-linux ./bp_image_builder

CMD ./bp_image_builder