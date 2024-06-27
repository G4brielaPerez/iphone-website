import { appleImg, bagImg, searchImg } from "../utils"
import { navLists } from "../constants"

const Navbar = () => {
  return (
    <div className="w-full py-5 sm:px-10 px-5 flex justify-between items-center">
        <div className="flex w-full screen-max-width">
            <img src={appleImg} alt="appleImg" className="size-8" />

            <div className="flex flex-1 justify-center max-sm:hidden">
                {navLists.map((item, index) => (
                    <div 
                        key={index} 
                        className="px-5 text-sm cursor-pointer text-gray hover:text-white transition-all"
                    >
                        {item}
                    </div>
                ))}
            </div>

            <div className="flex items-baseline gap-7 max-sm:justify-end max-sm:flex-1">
                <img src={searchImg} alt="searchImg" className="size-7 cursor-pointer" />
                <img src={bagImg} alt="bagImg" className="size-7 cursor-pointer" />
            </div>
        </div>
    </div>
  )
}

export default Navbar