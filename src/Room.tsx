import React from 'react'
import { useParams } from 'react-router'
import PartyUI from './PartyUI';

const Room = () => {
  const params = useParams();

  return (
    <div className='w-screen h-screen flex flex-col items-center justify-center'>
      <h1 className='text-xl'>Room {params.id}</h1>
      <div className='m-4'>
        {
          params?.id ? <PartyUI id={params.id} /> : <kbd>Error: no room id!</kbd>
        }
      </div>
    </div>
  )
}

export default Room