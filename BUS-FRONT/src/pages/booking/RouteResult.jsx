import React from 'react'
import { useQuery } from '@tanstack/react-query'
import { useLocation } from 'react-router-dom'

const RouteResult = () => {
    const location = useLocation()
    console.log(location.search)
  return (
    <div>
      results
    </div>
  )
}

export default RouteResult
