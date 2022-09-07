  const router = bp.http.createRouterForBot('files', { checkAuthentication: false })
  const mime = require('mime-types')

  router.get('/:file', async (req, res) => {
    try {
      if (!(await bp.ghost.forGlobal().fileExists('/myfiles', req.params.file))) {
        res.status('404')
        res.send('File not found')
        return
      }

      const file = await bp.ghost.forGlobal().readFileAsBuffer('/myfiles', req.params.file)
      if (req.query.download == 'true') {
        res.setHeader('Content-Disposition', 'attachment; filename=' + req.params.file)
      }
      res.type(mime.lookup(req.params.file) || 'text/plain')
      res.end(file)
    } catch (e) {
      res.status('500')
      res.send('Failed to get file: ' + e.message)
    }
  })
