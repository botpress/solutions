# Use custom buildImage Config

If you create a buildImage.config.js file in the same folder as the binary and return a object or function which creates an object, its possible to customize options used in the ImageBuild call.

Look at the official documentation for possible arguments: https://docs.docker.com/engine/api/v1.37/#operation/ImageBuild

Use buildImage.config.js as template