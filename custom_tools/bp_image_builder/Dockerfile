FROM node:14-alpine

WORKDIR /custom_tools/bp_image_builder

RUN ls

ADD package.json yarn.lock ./
RUN yarn install 

ADD tsconfig.json ./
ADD src ./

RUN yarn build

CMD [ "yarn", "start" ]