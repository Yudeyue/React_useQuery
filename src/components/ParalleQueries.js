import React from 'react'
import { useQuery } from 'react-query'
import axios from 'axios'

const fetchSuperheroe = () => {
    return axios.get('http://localhost:4000/superheroes')
}
const fetchFriends = () => {
    return axios.get('http://localhost:4000/friends')
}


function ParalleQueries() {

    const {data: superHeroes} = useQuery('super-heroes', fetchSuperheroe)
    const {data: friends} = useQuery('friends', fetchFriends)

  return (
    <div>
        {
        superHeroes?.data.map(hero=>{
          return <div key={hero.id}>
            {hero.name}
          </div>
        })
      } 
      {
        friends?.data.map(friend=>{
          return <div key={friend.id}>
            {friend.name}
          </div>
        })
      } 
    </div>
  )
}

export default ParalleQueries