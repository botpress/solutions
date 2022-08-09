  const axios = require('axios')

  const returnTo = process.env.EXPOSED_LOGOUT_RETURN_URL

  const logoutRouter = bp.http.createRouterForBot('logout', { checkAuthentication: false })
  logoutRouter.get('/logout', async (req, res) => {
    const query = returnTo ? `?returnTo=${returnTo}` : '?a=a'

    res.send(`
      <form id='form' style="display: none" action="" method="post">
        <input id="loginSubmit" type="submit" />
      </form>
      <script>
        var bpToken = JSON.parse(window.localStorage.getItem('bp/token'))
        var query = "${query}" + "&bpToken=" + (bpToken || {}).token
        document.getElementById('form').action = "/api/v1/bots/___/mod/logout/process" + query
        console.log(document.getElementById('form').action)
        document.getElementById('loginSubmit').click();
      </script>
    `)
  })

  logoutRouter.post('/process', async (req, res) => {
    const { bpToken, returnTo } = req.query
    try {
      const { baseURL } = await bp.http.getAxiosConfigForBot('__', { localUrl: true })
      const config = {
        baseURL: baseURL.replace('/api/v1/bots/__', ''),
        withCredentials: true,
        headers: {
          Cookie: req.headers.cookie,
          'CSRF-Token': bpToken,
          Authorization: 'Bearer ' + bpToken
        }
      }

      const logRes = await axios.get('/api/v2/admin/auth/logout', config)

      if (returnTo) res.redirect(returnTo)
      else res.send(`Logged out with status (${logRes.status}): ${logRes.data}`)
    } catch (e) {
      if (returnTo) res.redirect(returnTo)
      else res.send('Error: ' + e.message)
    }
  })
