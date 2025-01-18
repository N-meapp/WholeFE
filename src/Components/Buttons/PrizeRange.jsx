export default function PrizeRange({range}){

    const handleRange =()=>{
        if(range.from && range.to){
            return `${range.from} - ${range.to} Pieces`
        }

        if(range.from){
            return `${range.from} <= Pieces`
        }else{
            return `>= ${range.to} Pieces`
        }

    }

    return (
        <>
            <div className="py-3 px-6 border-[1px] border-[#cecdcd] w-fit rounded-3xl text-center">
        <h1 className="font-extrabold text-3xl text-[#000000]">₹ {range.rate}</h1>
        <h1 className="text-sm">{handleRange()}</h1>
                </div>
        </>
    )
}