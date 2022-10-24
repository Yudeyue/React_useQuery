import React from 'react'
import { useQuery } from 'react-query'
import axios from 'axios'

const fetchUserbyEmail = (email)=> {
    return axios.get(`http://localhost:4000/users/${email}`)
}
const fetchUserbyChannelId = (channelId)=> {
    return axios.get(`http://localhost:4000/channels/${channelId}`)
}

export const DependentQuery = ({email}) => {
   const {data: users} = useQuery(
        ['user', email],
        ()=>fetchUserbyEmail(email),
    )
    const channelId = users?.data.channelId

    const {data: courses} = useQuery(
        ['courses', channelId],
        ()=>fetchUserbyChannelId(channelId),
        {
            enabled: !!channelId,
        }
    )

  return (
    <div>
      {courses?.data.courses}  
    </div>
  )
  
}
