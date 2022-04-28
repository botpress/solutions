FROM node:14-alpine

WORKDIR /bp_image_builder

ADD package.json yarn.lock ./
RUN yarn install 

ADD tsconfig.json ./
ADD src ./

RUN yarn build
ARG hook="docker_hooks/examples/Download train data from origin/after_build.sh"
ADD ${hook} docker_hooks/after_build.sh

CMD [ "yarn", "start" ]