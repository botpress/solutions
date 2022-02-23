FROM {{imageTag}}
COPY ./data /botpress/data
ARG BUILD_TOKEN={{BUILD_TOKEN}}
ARG BUILD_ORIGIN_HOST={{BUILD_ORIGIN_HOST}}
RUN echo This is a custom Dockerfile, token is $BUILD_TOKEN and host is $BUILD_ORIGIN_HOST;

RUN mkdir /botpress/docker_hooks
RUN mkdir /botpress/extra_files

#Uncomment the line below to copy docker hooks
#COPY ./docker_hooks/ /botpress/docker_hooks/

#Uncomment the line below to copy custom modules and extract it
#COPY ./custom_modules/ /botpress/modules/
#RUN ./bp extract

#Uncomment the line below to copy extra files
#COPY ./extra_files/ /botpress/extra_files/

#Uncomment both lines below to run the after_build docker hook 
#RUN chmod -R 777 /botpress/docker_hooks/*
#RUN /botpress/docker_hooks/after_build.sh

WORKDIR /botpress
CMD ./duckling & ./bp

