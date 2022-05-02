
FROM node:14-alpine

WORKDIR /bp_image_builder

ADD package.json yarn.lock ./
RUN yarn install 

ADD tsconfig.json ./
ADD src ./

RUN yarn build

CMD [ "yarn", "start" ]