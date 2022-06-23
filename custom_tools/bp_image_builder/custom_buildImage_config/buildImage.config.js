module.exports = async () => {
    return  {
        nocache: true,
        networkmode: 'host', // recommended as default, so building also works for local deployments
        // for all other possible values, see: https://docs.docker.com/engine/api/v1.37/#operation/ImageBuild
    }
}
 
