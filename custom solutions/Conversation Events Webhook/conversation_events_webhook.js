  const MAX_ATTEMPTS = 10

  const config = {
    url: 'http://localhost:3500/handler',
    headers: {}
  }

  const { backOff } = require('exponential-backoff')
  const axios = require('axios')

  async function send(data) {
    if (this.disabled) {
      return
    }

    const { url, headers } = config
    const axios_config = { headers }

    try {
      await backOff(async () => axios.post(url, data, axios_config), {
        jitter: 'none',
        numOfAttempts: MAX_ATTEMPTS,
        retry: (e, attemptNumber) => {
          if (attemptNumber === 1 && e.response && e.response.status !== 503) {
            this.logWebhookError(e, url, 'Failed to send webhook event on first attempt. Retrying 9 more times')
          }
          return true
        }
      })
    } catch (e) {
      this.logWebhookError(e, url, `Unable to send webhook event after ${MAX_ATTEMPTS} attempts`)
    }
  }

  return send(event)