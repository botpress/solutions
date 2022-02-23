# Download train data from origin

When you bake your image using data from an origin server, your training data is not copied, which means that once your image is running, you will have to train your bot again.

This after_build hook will connect to your origin server and download the AI models for each of the bots that were copied during the build process, fixing the mentioned issue

OBS: make sure that the origin server address (host that you suply during login) is not a localhost server and reacheable from docker.
