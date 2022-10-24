import React, { useState } from 'react'
import { useQuery } from 'react-query'
import axios from 'axios'
import { useAddSuperheroData, useSuperherodata } from './hooks/useSuperherodata'
import { Link } from 'react-router-dom'

export const RQSuperheroes = () => {

  const [name, setName] = useState('')
  const [alterEgo, setAlterEgo] = useState('')

  const onSuccess = (data) => {
    console.log('Perform the side effect after data fetching', data)
  }
  const onError = (error) => {
    console.log('Perform the side effect after encountering error', error)
  }
  const handleAddHeroClick = () => {
    console.log({ name, alterEgo })
    const hero = { name, alterEgo }
    addHero(hero)
  }
  const { isLoading, data, isError, error, isFetching, refetch } = useSuperherodata(onSuccess, onError)
  const { mutate: addHero } = useAddSuperheroData()

  if (isLoading || isFetching) {
    return <h2>Loading...</h2>
  }
  if (isError) {
    return <h2>{error.message}</h2>
  }

  return (
    <>
      <h2>RQ Super Heroes Page</h2>
      <div>
        <input type='text' value={name} onChange={(e) => setName(e.target.value)}></input>
        <input type='text' value={alterEgo} onChange={(e) => setAlterEgo(e.target.value)}></input>
        <button onClick={handleAddHeroClick}>Add a Hero</button>
      </div>
      <button type='button' onClick={refetch}>Fetch Superheroes</button>
      {
        data?.data.map(hero => {
          return <div key={hero.id}>
            <Link to={`/rq-super-heroes/${hero.id}`}>{hero.name}</Link>
          </div>
        })
      }
      {/* {
      //   data.map((hero)=>{
      //     return <div key={hero}>{hero}</div>
      //   })
      // } */}
    </>
  )

}