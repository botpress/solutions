const axios = require('axios')
bp.http
  .getAxiosConfigForBot(event.botId, { localUrl: true })
  .then(axiosConfig => {
    return axios.post(
      '/mod/upload-skill/clear',
      {
        threadId: event.threadId
      },
      axiosConfig
    )
  })
  .catch(e => {
    bp.logger.warn('Error clearing the db.')
  })
