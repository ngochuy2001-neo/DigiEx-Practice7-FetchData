import { IPagination } from "@/utils/interfaces"
import { Dispatch, SetStateAction } from "react"
import { TbPlayerTrackNextFilled, TbPlayerTrackPrevFilled } from "react-icons/tb"
import { GrCaretPrevious, GrCaretNext} from "react-icons/gr"

export const Pagination = ({displayPage, setDisplayPage, maxPage}: IPagination) => {

  const calculateMiddleValue = (offset: number) => {
    if (displayPage < 3) {
      return displayPage == 1? displayPage + offset: displayPage + offset - 1;
    } else if (displayPage - 1 > 7) {
      return maxPage - (4 - offset); 
    } else {
      return displayPage - 2 + offset;
    }
  };

  const handleSkipPrev = () => {
    setDisplayPage(1);
  }

  const handleSkipNext = () => {
    setDisplayPage(maxPage)
  }

  const handleNextPage = () => {
    setDisplayPage(() => {
      if(displayPage == maxPage){
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
  return (
    <div className='flex items-center'>
      <button onClick={handlePrevPage} disabled={displayPage === 1} className={`h-[40px] w-[50px] flex justify-center items-center border-2 rounded-l-md ${displayPage === 1? "opacity-50": "hover:bg-blue-600 hover:text-white"}`}>
        <GrCaretPrevious />
      </button>
      <button onClick={handleSkipPrev} disabled={displayPage === 1} className={`h-[40px] w-[40px] flex justify-center items-center border-2 rounded-l-md ${displayPage === 1? "bg-blue-600 text-white": "hover:bg-blue-600 hover:text-white"}`}>
        {1}
      </button>
      {displayPage > 3 && <div className="h-[40px] flex justify-center items-end w-[40px]">...</div>}
      {maxPage > 4 && [1, 2, 3].map((offset) => (
        <div key={offset} onClick={() => setDisplayPage(calculateMiddleValue(offset))} className={`h-[40px] w-[40px] border-2 flex justify-center items-center ${calculateMiddleValue(offset) == displayPage? "bg-blue-600 text-white border-none":"hover:bg-blue-600 hover:text-white"}`}>
          {calculateMiddleValue(offset)}
        </div>
      ))}
      {maxPage - displayPage > 2 && <div className="h-[40px] flex justify-center items-end w-[40px]">...</div>}
      <button onClick={handleSkipNext} disabled={displayPage === maxPage} className={`h-[40px] w-[40px] flex justify-center items-center border-2 rounded-r-md ${displayPage === maxPage? "bg-blue-600 text-white": "hover:bg-blue-600 hover:text-white"}`}>
        {maxPage}
      </button>
      <button onClick={handleNextPage} disabled={displayPage === maxPage} className={`h-[40px] w-[50px] flex justify-center items-center border-2 rounded-r-md ${displayPage === maxPage? " opacity-40": "hover:bg-blue-600 hover:text-white"}`}>
        <GrCaretNext />
      </button>
    </div>
  )
}