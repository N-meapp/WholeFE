export default function CategoryCard({category}){
    
    return(
        <>
            <div className="w-[23%] h-full">
                            <div className="w-full h-20 bg-[#ffffff] rounded-lg">
                            <img className="h-full w-full object-cover rounded-lg object-center" src={category.image}></img>
                            </div>
                            <h1 className="break-words text-center text-sm font-semibold">{category.name}</h1>
                        </div>
        </>
    )
}