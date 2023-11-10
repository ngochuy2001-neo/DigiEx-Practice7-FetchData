import { IPostFormat } from "@/utils/interfaces";

const Post = ({title, content, postID}: IPostFormat) => {
  return (
    <div className="w-[300px] m-3 border-2 bg-white h-[400px]">
      <div className="font-bold text-xl w-full min-h-[20%] bg-blue-400 text-white flex items-center p-1">
        {title}
      </div>
      <div className=" flex-wrap flex p-2">
        {content}
      </div>
    </div>
  );
};

export default Post;