import { useState } from "react"
import CategorySuggestionButton from "../../Components/Buttons/CategorySuggestionButton"
import { categoryList } from "../../constants/strings"


export default function CategorySuggestions(){

    const [category,setCategory] = useState(categoryList)

    return(
        <>
            <div className="mt-14 w-[90%] mx-auto flex gap-2 flex-wrap justify-center">
                {category.map((cat)=>{
                    return(
                        <>
                            <CategorySuggestionButton category={cat} />
                        </>
                    )
                })}
            </div>
        </>
    )
}