import React from 'react'

type GenreProps = {
    title: string;
}

export default function Genre(props: GenreProps) {
  return (
    <div className='bg-light-gray text-customGray text-sm font-light px-10 py-3 rounded-2xl w-full flex justify-center'>
        <p>{props.title}</p>
    </div>
  )
}
