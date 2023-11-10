"use client"
import Image from 'next/image'
import Post from '@/components/Post'
import axios from 'axios'
import { ChangeEvent, ChangeEventHandler, useEffect, useState } from 'react'
import {TbPlayerTrackNextFilled, TbPlayerTrackPrevFilled} from 'react-icons/tb'
import { IPostDataFormat } from '@/utils/interfaces'
import { chunkArray, fetchGETPost } from '@/utils/helpers'
import { Pagination } from '@/components/Pagination'
import { auth, googleProvider } from '@/utils/firebase.config'
import { useRouter } from 'next/navigation'
import { User, signOut } from 'firebase/auth'

export default function Home() {
  const [data, setData] = useState<IPostDataFormat[]>([])
  const [displayPage, setDisplayPage] = useState(1);
  const [displayData, setDisplayData] = useState<IPostDataFormat[][]>([]);
  const [dataUser, setDataUser] = useState<User|null>()
  const route = useRouter();
  const user = auth.currentUser;



  useEffect(() => {
    if(user){
    }else {
      route.push("/login")
    }
    fetchGETPost('https://jsonplaceholder.typicode.com/posts', setData)
  },[])


  useEffect(() => {
    setDisplayData(chunkArray(data,10));
  },[data])

  useEffect(() => {
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
      return;
    }
    const searchText = e.target.value;
    setDisplayData(() => {
      const filteredData = data.filter((post) => {
        return post.title.toLowerCase().includes(searchText.toLowerCase())
      })
      setDisplayPage(1);
      return chunkArray(filteredData,10);
    })
  }

  const handleLogOut = () => {
    signOut(auth).then(() => {
      route.push("/login");
    }).catch((error) => {
      console.log(error);
    })
  }
  return (
    <div className='w-screen h-full flex items-center flex-col bg-gray-200'>
      {user && 
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
            <Pagination displayPage={displayPage} setDisplayPage={setDisplayPage} maxPage={displayData.length}/>
          </div>
          <div>
            <button onClick={handleLogOut} className="bg-red-600 text-white w-[100px] h-[50px]">Logout</button>
          </div>
        </div>
      }
    </div>
  )
}
