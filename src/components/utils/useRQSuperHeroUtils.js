import React from 'react'
import { useQuery, useMutation, useQueryClient} from 'react-query'
import { request } from './axios-utils'

const fetchSuperheroes = () => {
    return request ({url: '/superheroes'})
}
const addSuperhero = (hero) => {
    return request({url: '/superheroes', method: 'post', data: hero})
}

export const useRQSuperHeroutils = (onSuccess, onError) => {

    return useQuery(
        'super-heroes',
        fetchSuperheroes,
        {
            onSuccess: onSuccess,
            onError: onError,
            //enabled: false,
            staleTime: 0,
            cacheTime: 300000,
            refetchOnMount: true,
            refetchOnWindowFocus: true,
            refetchIntervalInBackground: true,  // polling data
            //refetchInterval: 5000,    // polling data
            // select: (data) => {
            //   const supheroname = data.data.map((hero)=> hero.name)
            //   return supheroname
            // }
        }
    )
}

export const useAddSuperheroDataUtils = () => {
    const queryClient = useQueryClient()
    return useMutation(
        addSuperhero, 
        {
            // onSuccess: (data)=> {
            //     //queryClient.invalidateQueries('super-heroes')
            //     queryClient.setQueryData(
            //         'super-heroes', 
            //         (oldQueryData)=>{
            //             return {
            //                 ...oldQueryData,
            //                 data: [...oldQueryData.data, data.data]
            //             }
            //         }
            //     )
            // }
            onMutate: async (newHero) => {
                await queryClient.cancelQueries('super-heroes')   // cancel all refetching 
                const previousData = queryClient.getQueryData('super-heroes')    // roll back if mutation fails
                queryClient.setQueryData('super-heroes', (oldQueryData)=>{
                    return {
                        ...oldQueryData,
                        data: [...oldQueryData.data, {id: oldQueryData?.data?.length + 1, ...newHero}]
                    }
                })
                return {
                    previousData,
                }
            },
            onError: (_error, _hero, context) => {
                queryClient.setQueryData('super-heroes', context.previousData)  // roll back 
            },
            onSettled: ()=> {
                queryClient.invalidateQueries('super-heroes') // refetch data for in sync server state
            }
        })
}