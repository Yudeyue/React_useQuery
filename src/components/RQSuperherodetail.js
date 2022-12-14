import React from 'react'
import { useParams } from 'react-router-dom'
import { useSuperherodetail } from './hooks/useSuperherodetail'

export const RQSuperherodetail = () => {

  const {heroId} = useParams()
  const {isLoading, data, isError, error, isFetching, refetch} = useSuperherodetail(heroId)

  if (isLoading || isFetching) {
    return <h2>Loading...</h2>
  }

  if (isError) {
    return <h2>{error.message}</h2>
  }

  return (
    <div>
      {data?.data.name} - {data?.data.alterEgo}
    </div>
  )
}

