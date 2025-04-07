import { useNavigate } from "react-router-dom";

export default function CategorySuggestionButton({category}){
    const navigate = useNavigate()

    const handleOnclick =()=>{
        navigate('/category-list', { state: { category: category.category_name } });
    }
    
    return(
        <>
        <div onClick={()=>{
            handleOnclick()
        }} className="md:py-3 py-2 my-3 px-2 md:px-4 border-2 hover:bg-[black] transition-all hover:text-white border-[#f0ebeb] w-fit rounded-full shadow-lg text-xs md:text-base cursor-pointer">{category?.category_name}</div>

        </>
    )
}