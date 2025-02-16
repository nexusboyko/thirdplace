import React from 'react'

const RoomTitleCard = (props: {id?: string}) => {
  return (
    <button
      id={props.id}
      className={`z-99 font-mono flex items-center justify-center w-[50px] h-[100px] text-center text-[31px]/7  
      rounded-sm hover:cursor-pointer transition-all duration-300 ease-in-out break-words break-all
      ${props.id ? 'bg-black text-white hover:scale-110' : 'bg-white text-black hover:scale-105 border'}`}
      type={props.id ? undefined : "submit" }
    >
      {props.id || '+'}
    </button>
  )
}

export default RoomTitleCard
