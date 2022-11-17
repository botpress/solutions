const axios = require('axios')
const FormData = require('form-data')

const main = async () => {
  const types = ['video', 'image', 'file']

  if (event.channel === 'messenger' && types.includes(event.payload.type) && event.state.temp.uploadKey) {
    const axiosConfig = await bp.http.getAxiosConfigForBot(event.botId, { localUrl: true })

    const outputUrl = `/mod/upload-skill/upload`

    const url = event.payload[event.payload.type]

    try {
      const formData = new FormData()

      formData.append('fileUrl', url)
      formData.append('botId', event.botId)
      formData.append('threadId', event.threadId)
      formData.append('target', event.target)

      const adjustedConfig = {
        ...axiosConfig,
        method: 'post',
        url: outputUrl,
        data: formData,
        headers: formData.getHeaders()
      }

      const finalResponse = await axios(adjustedConfig)

      event.state.temp[event.state.temp.uploadKey] = finalResponse.data
      delete event.state.temp.uploadKey
    } catch (error) {
      bp.logger.info('error', error)
    }
    return
  }
  if (event.type === 'uploadFile') {
    const { payload } = event.payload
    if (payload && payload.file && payload.reference) {
      event.state.temp[payload.reference] = payload.file
    } else {
      event.state.temp.error = payload.error || 'something went wrong.'
    }
  }
}

return main() // IMPORTANT make sure to return so hook waits on main
