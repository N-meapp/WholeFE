import { useContext, useEffect, useState } from "react";
import { HomeContext, SearchContext } from "../../main";
import { useLocation, useNavigate } from "react-router-dom";
import { fetchCategoryProducts, getSearchedOutput } from "../../api/productApi";
import ProductCards from "../../Components/Cards/ProductCards";
import error from "../../assets/Images/errorImages/searchnotfound.svg"

export default function CategoryList() {
  const [data, setData] = useState([]);
  const location = useLocation();
  const { category } = location.state || {};
  console.log(category,'dccccea');
  const [isNotFound,setIsNotFound] = useState(false)
    const { isHomePage, setIsHomePage } = useContext(HomeContext);
  
  


  useEffect(() => {

    fetchCategoryProducts(setData,category).then((res)=>{
console.log('resssssponse',res);
if(!res){
  setIsNotFound(true)
}else{
  setIsNotFound(false)
}

    })
    
  }, [category]);

  useEffect(()=>{
    window.scrollTo({ top: 0, behavior: "smooth" });
setIsHomePage(false)
  },[])


  return (
    <>
     {isNotFound?
          (<>
            <div className="w-full h-screen bg-[#fcf3f359] content-center text-center">
            <div className="w-fit h-fit mx-auto">
            <img className="w-56" src={error}></img>
                <h1 className="mt-10 font-bold text-gray-700">Search not found!</h1>
            </div>
            </div>
          </>):
      <div className="md:mt-32 mt-20 w-[90%] mx-auto h-auto md:mb-24 mb-8">
        <div className="w-full h-full md:mt-12 mt-8 md:pt-12 pt-4 md:pb-12 pb-4 md:bg-[#bebebe1c] rounded-xl text-center">
          <div className="w-full h-full md:flex gap-3 md:gap-8 columns-2 md:flex-wrap justify-center">
            {data?.map((card) => (
              <ProductCards card={card} />
            ))}
          
          </div>
        </div>
      </div>
     }
    </>
  );
}
