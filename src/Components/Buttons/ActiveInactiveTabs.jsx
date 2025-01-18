export default function ActiveInactiveTabs({title,isActive,changeTab}){
    return (
        <>
        {isActive?
            <h1 className="font-bold text-lg py-3 px-5 rounded-full bg-[#f1f1f1] text-[#444343] cursor-pointer transition-all duration-200">{title}</h1>
            :
            <h1 onClick={()=>{
                changeTab(title)
            }} className="font-bold text-lg text-[#444343] border-[1px] border-[#a7a1a159] py-3 px-5 rounded-full cursor-pointer transition-all ">{title}</h1>
        }
        </>
    )
}