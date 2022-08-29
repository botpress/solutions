import React, { useEffect } from 'react'

const MyBeforeContainer = ({ store }) => {
  useEffect(() => {
    setTimeout(() => {
      store.clearMessages()
    }, 3000)
  }, [])
  return null
}

export { MyBeforeContainer }
