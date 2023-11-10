import { Dispatch, SetStateAction } from "react";

export interface IPostFormat {
  postID?: number;
  title: string;
  content: string;
  userPosted?: number;
}

export interface IPostDataFormat {
  userID: number;
  id: number;
  title: string;
  body: string;
}

export interface IPagination {
  displayPage: number;
  setDisplayPage: Dispatch<SetStateAction<number>>;
  maxPage: number;
}
