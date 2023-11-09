"use client"
import Image from 'next/image'
import Post from '@/components/Post'
import axios from 'axios'
import { ChangeEvent, ChangeEventHandler, useEffect, useState } from 'react'
import {TbPlayerTrackNextFilled, TbPlayerTrackPrevFilled} from 'react-icons/tb'
import { IPostDataFormat } from '@/utils/interfaces'
import { chunkArray, fetchGETPost } from '@/utils/helpers'

export default function Home() {
  const [data, setData] = useState<IPostDataFormat[]>([])
  const [displayPage, setDisplayPage] = useState(1);
  const [displayData, setDisplayData] = useState<IPostDataFormat[][]>([]);

  useEffect(() => {
    // setData(fetchGETPost('https://jsonplaceholder.typicode.com/posts'))
    fetchGETPost('https://jsonplaceholder.typicode.com/posts', setData)
  },[])


  useEffect(() => {
    setDisplayData(chunkArray(data,10));
  },[data])

  useEffect(() => {
    console.log(displayData);
  }, [displayData])

  const handleNextPage = () => {
    setDisplayPage(() => {
      if(displayPage == Math.floor((data.length+9)/10)){
        return displayPage
      }
      return displayPage + 1
    })
  }

  
  const handlePrevPage = () => {
    setDisplayPage(() => {
      if(displayPage == 1){
        return 1;
      }
      return displayPage - 1;
    })
  }

  const handleChangeSearch = (e: ChangeEvent<HTMLInputElement>) => {
    if(e.target.value === "") {
      fetchGETPost('https://jsonplaceholder.typicode.com/posts', setData);
    }
    const searchText = e.target.value;
    setData((prevData) => {
      const filteredData = prevData.filter((post) => {
        return post.title.toLowerCase().includes(searchText.toLowerCase())
      })
      setDisplayPage(1);
      return filteredData;
    })
  }
  return (
    <div className='w-screen h-full flex items-center flex-col bg-gray-200'>
      <div>
        <input onChange={handleChangeSearch} className='w-[400px] h-[30px]' type="text" placeholder={`search`}/>
      </div>
      <div className='w-full h-full flex flex-wrap justify-center'>
        {displayData[displayPage-1] && displayData[displayPage -1 ].map((value, index) => (
          <Post content={value.body} key={index} title={value.title}/>
        ))
        }
      </div>
      <div className='w-full h-[75px] bg-white flex justify-center'>
        <div className='flex items-center'>
          <button onClick={handlePrevPage} disabled={displayPage === 1} className={`h-[40px] w-[50px] flex justify-center items-center border-2 rounded-l-md ${displayPage === 1? "opacity-50": "hover:bg-blue-600 hover:text-white"}`}>
            <TbPlayerTrackPrevFilled />
          </button>
          <p className={`h-[40px] w-[100px] border-t-2 border-b-2 flex justify-center items-center `}>
            {`${displayPage}/${Math.ceil(data.length/10)}`}
          </p>
          <button onClick={handleNextPage} disabled={displayPage === Math.floor(data.length + 9)/10} className={`h-[40px] w-[50px] flex justify-center items-center border-2 rounded-r-md ${displayPage === Math.floor((data.length + 9) /10)? " opacity-40": "hover:bg-blue-600 hover:text-white"}`}>
            <TbPlayerTrackNextFilled />
          </button>
        </div>
      </div>
    </div>
  )
}
