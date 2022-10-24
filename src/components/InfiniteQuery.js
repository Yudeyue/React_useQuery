import React, {Fragment, useState} from 'react'
import { useInfiniteQuery } from 'react-query'
import axios from 'axios'



const fetchColors = ({pageParam=1}) => {
    return axios.get(`http://localhost:4000/colors?_limit=2&_page=${pageParam}`)
}

export const InfiniteQuery = () => {
    
   // const [pageParam, setpageParam] = useState(1)
    const { data, isError, isLoading, error, isFetching, hasNextPage, fetchNextPage, isFetchingNextPage } = useInfiniteQuery(
        ['colors'],
        fetchColors,
        {
            getNextPageParam: (_lastPage, pages) => {
                if (pages.length < 4) {
                    return pages.length + 1
                } else {
                    return undefined
                }
            }
        }
    )

    if (isLoading) {
        return <h2>Loading...</h2>
    }


    if (isError) {
        return <h2>{error.message}</h2>
    }
  return (
        <>
            <div>
                {
                    data?.pages.map((group, index)=>{
                        return <Fragment key={index}>
                            {
                                group.data.map(color=>(
                                    <h2 key={color.id}>{color.id}. {color.label}</h2>
                                ))
                            }
                            
                        </Fragment>
                    })
                }
            </div>
            <div>
                <button onClick={fetchNextPage} disabled={!hasNextPage}>Load more</button>
            </div>
            <div>
                {isFetching && !fetchNextPage? 'Fetching...' : null}
            </div>
        </>
  )
}
