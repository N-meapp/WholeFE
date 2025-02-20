import React from 'react'

const SearchBox = ({valuee, onChangee}) => {
    return (
        <>
            <div class="relative flex items-center bg-[#ffffff] h-10 rounded-full px-2 transition-all duration-400 group shadow-md">
                <input
                    type="text"
                    placeholder="Type to Search"
                    class="border-none bg-transparent outline-none text-black text-[16px] leading-10 w-0 group-hover:w-[240px] px-0 group-hover:px-2 transition-all duration-400"
                          value={valuee}
                onChange={onChangee}
                />
                <a href="#" class="flex justify-center items-center w-10 h-10 rounded-full bg-[#ffffff] text-[#5764df] transition-all duration-400 group-hover:bg-white">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                        <path strokeLinecap="round" strokeLinejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" />
                    </svg>

                </a>
            </div>
        </>
    )
}

export default SearchBox