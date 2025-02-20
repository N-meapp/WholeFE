import axios from "axios";
const BASE_URL = import.meta.env.VITE_BASE_URL


export const fetchNewlyArrivals = async(setData)=>{
    try {
        const result = await axios.get(`${BASE_URL}Newly_arrived`);
        
        setData(result.data)
      } catch (err) {
        console.error(err);
      }
}


export const fetchTopProducts = async()=>{
    try {
        const result = await axios.get(`${BASE_URL}Top_products`);
        
        setData(result.data)
      } catch (err) {
        console.error(err);
      }
}


export const fetchAllProducts = async(setData)=>{
    try {
        const result = await axios.get(`${BASE_URL}Newly_arrived`);
        setData(result.data)
      } catch (err) {
        console.error(err);
      }
}



export const getSearchedOutput = async(setData,value)=>{
  try {
      const result = await axios.post(`${BASE_URL}Search_all/`,{search_term:value});
      
      if(result.data.results){
        setData(result.data.results)
      }else{
        setData([])
      }
    } catch (err) {
      console.error(err);
      setData([])
    }
}



export const placeOrder = async(setData,value)=>{
  try {
      const result = await axios.post(`${BASE_URL}order_products/`,{products:value});
      console.log('hummmm',result);
      
      if(result.data.results){
        setData(result.data.results)
      }else{
        setData([])
      }
    } catch (err) {
      console.error(err);
      setData([])
    }
}







export const addToCart = async(value,user)=>{
  try {
      const result = await axios.post(`${BASE_URL}Adding_cart/`,{products:value,user_id:user});
      console.log('hummmm',result);
      
      if(result.data.results){
        // setData(result.data.results)
      }else{
        // setData([])
      }
    } catch (err) {
      console.error(err);
      // setData([])
    }
}



