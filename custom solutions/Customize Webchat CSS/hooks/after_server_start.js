const hook = async () => {
  const routerPublic = bp.http.createRouterForBot('public', { checkAuthentication: false })
  routerPublic.get('/custom.css', async (req, res) => {
    const { botId } = req.params

    res.setHeader('content-type', 'text/css')

    if (botId === '___') {
      return res.send('')
    }

    const ghost = bp.ghost.forBot(botId)

    if (await ghost.fileExists('./actions', 'custom.css')) {
      const file = await bp.ghost.forBot(req.params.botId).readFileAsString('./actions', 'custom.css')
      return res.send(file)
    }

    res.send('')
  })
}

return hook()
