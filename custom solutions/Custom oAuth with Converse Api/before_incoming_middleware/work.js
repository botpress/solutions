  const SECRET = 'YOUR_SECRET' // it can passed via env var
  const jsonwebtoken = require('jsonwebtoken')

  const token = event.payload.metadata && event.payload.metadata.token

  bp.logger.info('Token', token)

  // bp.logger.info('Decoded token', jwt.decode(token, SECRET))

  const exampleInfo = {
    email: 'admin',
    strategy: 'default',
    tokenVersion: 1,
    isSuperAdmin: true,
    iat: 1629461681,
    exp: 2629465281,
    aud: 'collaborators'
  }

  const exampleToken =
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImFkbWluIiwic3RyYXRlZ3kiOiJkZWZhdWx0IiwidG9rZW5WZXJzaW9uIjoxLCJpc1N1cGVyQWRtaW4iOnRydWUsImlhdCI6MTYyOTQ2MTY4MSwiZXhwIjoyNjI5NDY1MjgxLCJhdWQiOiJjb2xsYWJvcmF0b3JzIn0.HGmTXHdzaq1cV6zU4YRS-fgX9erltrX7McAVlMM3oVc'

  const newToken = jsonwebtoken.sign(exampleInfo, SECRET)
  bp.logger.info('NewToken', newToken)

  bp.logger.info('Decoded new token', jsonwebtoken.decode(newToken, SECRET))

  function auth() {
    function getToken(userInfo) {
      return jsonwebtoken.sign(userInfo, SECRET)
    }

    bp.logger.info('exampleToken', getToken(exampleInfo))

    const token = event.payload.metadata && event.payload.metadata.token
    if (!token) return false
    try {
      jsonwebtoken.verify(token, SECRET)
    } catch (err) {
      return false
    }

    return true
  }

  bp.logger.info('Verified?', auth())
  // authorized or not

  if (!auth()) {
    bp.logger.info('REDIRECTING')
    return redirectToUnauthorizedFlow()
  }

  async function redirectToUnauthorizedFlow() {
    // bp.logger
    await bp.dialog.jumpTo(event.threadId, event, 'not-authorized-flow')
    // return await bp.dialog.processEvent(event.threadId, event)
  }