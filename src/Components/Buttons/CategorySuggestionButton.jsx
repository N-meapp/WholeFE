import { useNavigate } from "react-router-dom";

export default function CategorySuggestionButton({category}){
    const navigate = useNavigate()
    console.log(category,'caajjajajjj');

    const handleOnclick =()=>{
        navigate('/category-list', { state: { category: category.category_name } });
    }
    
    return(
        <>
        <div onClick={()=>{
            handleOnclick()
        }} className="md:py-3 py-2 px-2 md:px-4 border-2 border-[#ff5a5463] w-fit rounded-full font-semibold text-xs md:text-base cursor-pointer">{category?.category_name}</div>

        </>
    )
}