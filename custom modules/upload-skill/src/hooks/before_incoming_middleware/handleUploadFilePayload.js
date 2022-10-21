if (event.type === 'uploadFile') {
  const { payload } = event.payload
  if (payload && payload.file && payload.reference) {
    event.state.temp[payload.reference] = payload.file
  } else {
    event.state.temp.error = payload.error || 'something went wrong.'
  }
}
