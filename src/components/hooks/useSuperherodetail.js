import React from 'react'
import { useQuery, useQueryClient } from 'react-query'
import axios from 'axios'

const fetchSuperheroedetail = (heroId) => {
    return axios.get(`http://localhost:4000/superheroes/${heroId}`)
}

export const useSuperherodetail = (heroId) => {
  
    const queryClient = useQueryClient()

return useQuery(
    ['super-hero', heroId], 
    ()=>fetchSuperheroedetail(heroId),
    {
        initialData: () =>{
            const hero = queryClient.getQueryData('super-hero')?.data?.find(hero=>hero.id === parseInt(heroId))
            if(hero) {
                return {data: hero}
            } else {
                return undefined
            }
        }
    }
    )
}
