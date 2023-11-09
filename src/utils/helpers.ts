import { url } from "inspector";
import { IPostDataFormat } from "./interfaces";
import axios from "axios";
import { Dispatch, SetStateAction } from "react";

export const splitPage = (postList: IPostDataFormat[]) => {
  if(postList.length > 10){
    return
  }
  return postList;
}

export const fetchGETPost = async (url: string, setData: Dispatch<SetStateAction<IPostDataFormat[]>>): Promise<IPostDataFormat[]> => {
  try {
    const response = await axios.get(url);
    const data: IPostDataFormat[] = response.data;
    setData(response.data)
    return data;
  } catch (error) {
    console.error(error);
    throw error;
  }
}

export const chunkArray = (originalArray: IPostDataFormat[], chunkSize: number) => {
  const result: IPostDataFormat[][] = [];
  for(let i = 0; i < originalArray.length; i += chunkSize){
    result.push(originalArray.slice(i, i + chunkSize));
  }
  return result
}