import React from 'react'
import { useParams } from 'react-router'
import RoomsSingle from './RoomsSingle';

const Room = () => {
  const params = useParams();

  return (
    <div className='w-screen h-screen flex flex-col items-center justify-center'>
      <h1 className='text-xl'>Room {params?.id ?? "-1"}</h1>
      <div className='m-4'>
        {
          params?.id ? <RoomsSingle id={params.id} /> : <kbd>Error: no room id!</kbd>
        }
      </div>
    </div>
  )
}

export default Room