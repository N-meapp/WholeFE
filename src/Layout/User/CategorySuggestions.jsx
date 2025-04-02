import { useEffect, useState } from "react"
import CategorySuggestionButton from "../../Components/Buttons/CategorySuggestionButton"
import { categoryList } from "../../constants/strings"
import loafer from "../../assets/Images/category/loafer.jpg"
import sneakers from "../../assets/Images/category/sneakers.jpg"
import { category } from "../../constants/cards"
import CategoryCard from "../../Components/Category/CategoryCard"
import { fetchCategoryList } from "../../api/productApi"


export default function CategorySuggestions(){

    const [categories,setCategories] = useState([])

    useEffect(()=>{
        fetchCategoryList(setCategories)
    },[])

    return(
        <>
        {/* for web */}
            <div className="mt-8 w-[90%] mx-auto gap-2 flex-wrap justify-center md:flex hidden">
                {categories.map((cat)=>{
                    return(
                        <>
                            <CategorySuggestionButton category={cat} />
                        </>
                    )
                })}
            </div>

            {/* for mobile */}
            {/* <div className="mt-24 w-[90%] h-fit justify-between flex mx-auto md:hidden ">
            {category.map((category)=>{
                return(
                    <CategoryCard category={category} />
                )
            })}

            </div> */}
            <div className=" overflow-x-auto whitespace-nowrap scrollbar-hide mt-3 md:hidden block">
  <div className="w-fit h-auto flex gap-3 px-[5%] pb-2">
  {categories.map((cat)=>{
                    return(
                        <>
                            <CategorySuggestionButton category={cat} />
                        </>
                    )
                })}
    </div>
  </div>
        </>
    )
}