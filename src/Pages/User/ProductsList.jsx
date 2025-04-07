import { useContext, useEffect, useState } from "react";
import { HomeContext, SearchContext } from "../../main";
import { useNavigate } from "react-router-dom";
import { fetchAllProducts, getSearchedOutput } from "../../api/productApi";
import ProductCards from "../../Components/Cards/ProductCards";
import error from "../../assets/Images/errorImages/searchnotfound.svg"

export default function ProductsList() {
  const { searchKey, setSearchKey } = useContext(SearchContext);
    const { isHomePage, setIsHomePage } = useContext(HomeContext);
  

  const [data, setData] = useState([]);

  const navigate = useNavigate();

  useEffect(() => {
    if (searchKey) {
      getSearchedOutput(setData, searchKey);
      
    }else{
      fetchAllProducts(setData)
    }
  }, [searchKey]);

  useEffect(()=>{
    window.scrollTo({ top: 0, behavior: "smooth" });
    setIsHomePage(false)
  },[])


  return (
    <>
     {data?.length==0?
          (<>
            <div className="w-full h-screen bg-[#ffffff] content-center text-center">
            <div className="w-fit h-fit mx-auto">
            <img className="w-56" src={error}></img>
                <h1 className="mt-10 font-bold text-gray-700">Search not found!</h1>
            </div>
            </div>
          </>):
      <div className="md:mt-32 mt-20 w-[90%] mx-auto h-auto md:mb-24 mb-8">
        <div className="w-full h-full md:mt-12 mt-8 md:pt-12 pt-4 md:pb-12 pb-4 md:bg-[#bebebe1c] rounded-xl text-center">
        <div className="w-full h-full md:flex gap-3 md:gap-8 grid grid-flow-row grid-cols-2 sm:grid-cols-3 md:grid-cols-4 md:flex-wrap justify-center">
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
