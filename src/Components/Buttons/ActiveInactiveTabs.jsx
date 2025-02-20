export default function     ActiveInactiveTabs({title,isActive,changeTab}){
    return (
        <>
        {isActive?
            <h1 className="font-bold md:text-lg text-xs md:py-3 py-3 px-3 md:px-5 rounded-full bg-[#ff5a54] text-[#ffffff] cursor-pointer transition-all duration-200">{title}</h1>
            :
            <h1 onClick={()=>{
                changeTab(title)
            }} className="font-bold md:text-lg text-xs text-[#444343] border-[1px] border-[#a7a1a159] md:py-3 py-3 px-3 md:px-5 rounded-full cursor-pointer transition-all ">{title}</h1>
        }
        </>
    )
}