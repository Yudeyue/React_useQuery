import {useEffect} from 'react'
import { useQueries } from 'react-query'
import axios from 'axios'

const fetchSuperheroes = (id) => {
    return axios.get(`http://localhost:4000/superheroes/${id}`)
}

export const DynamicParallelpage = ({heroIds}) => {

    const queries = useQueries(
        heroIds.map((id)=>{
            return {
                queryKey: ["super-hero", id],
                queryFn: ()=> fetchSuperheroes(id),
            }
        },
        {
            select: (data)=>{
                const superHeroname = data.data.map(hero=>hero.name)
                return superHeroname
            }
        })
    )
    console.log('query results', queries)
    const isLoading = queries.some(result => result.isLoading)
    const data = queries.map(result => result.data)
    
 console.log('data', data)
    
   return (
    <>
   
    </>
   )
}


