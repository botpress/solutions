const MAX_ATTEMPTS = 10

const config = {
  // Change this value to point to your own webhook handler
  url: 'http://localhost:3500/handler',
  // Change this object to specify additional headers to be sent in the request
  headers: {}
}

const { backOff } = require('exponential-backoff')
const axios = require('axios')

async function logWebhookError(e, url, message) {
  bp.logger.warn(message, {
    url,
    message: e.message,
    response: e.response && e.response.data,
    status: e.response && e.response.status
  })
}

async function send(data) {

  const { url, headers } = config
  const axios_config = { headers }

  try {
    await backOff(async () => axios.post(url, data, axios_config), {
      jitter: 'none',
      numOfAttempts: MAX_ATTEMPTS,
      retry: (e, attemptNumber) => {
        if (attemptNumber === 1 && e.response && e.response.status !== 503) {
          logWebhookError(e, url, 'Failed to send webhook event on first attempt. Retrying 9 more times')
        }
        return true
      }
    })
  } catch (e) {
    logWebhookError(e, url, `Unable to send webhook event after ${MAX_ATTEMPTS} attempts`)
  }
}

send(event)
