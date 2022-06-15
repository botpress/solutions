export const downloadBlob = (function() {
  const a = document.createElement('a')
  document.body.appendChild(a)
  // @ts-ignore
  a.style = 'display: none'
  return function(url, fileName) {
    a.href = url
    a.download = fileName
    a.click()
    window.URL.revokeObjectURL(url)
  }
})()
