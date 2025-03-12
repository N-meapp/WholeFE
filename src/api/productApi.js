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

    console.log(value,'searchinggg');
    
      const result = await axios.post(`${BASE_URL}Search_all_products/`,{search_term:value});
      
      console.log(result.data,'dddddddd');
      
      if(result.data.products){
        setData(result.data.productsf)
      }else{
        setData([])
      }
    } catch (err) {
      console.error(err);
      setData([])
    }
}



export const placeOrder = async(user,value)=>{
  
  console.log(value,user,'valueeeeeeeeeee');
  

  
  try {
      const result = await axios.post(`${BASE_URL}order_products/`,{orders:value,user_id:user});
      
      if(result.data){
        return true
      }else{
        return false
      }
    } catch (err) {
      console.error(err);
      return false
    }
}


export const listOrders = async(setData,userId)=>{
  console.log(userId,'uuuuser idd');
  
  try {
      const result = await axios.get(`${BASE_URL}order_products/`,{params:{userid:userId}});
      
      console.log(result,'sirathhhhhhhh');
      
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




export const addToCart = async(productId,count,user)=>{
  console.log(count,productId,'countt');

  const item = {id:productId,count:count}
  // item.count = count
  const itemsArray = []
  itemsArray[0] = item
  
  try {
      const result = await axios.post(`${BASE_URL}Adding_cart/`,{products:itemsArray,user_id:user});
      console.log(result,'rrrreeee');
      
      if(result.data){
        // setData(result.data.results)\
        return true
      }else{
        // setData([])
       return false
      }
    } catch (err) {
      console.error(err);
      return false
      // setData([])
    }
}


export const clearCart = async(user)=>{

  
  try {
      const result = await axios.post(`${BASE_URL}Delete_all_cart/`,{username:user});
      console.log(result,'rrrreeee');
      
      if(result.data){
        // setData(result.data.results)\
        return true
      }else{
        // setData([])
       return false
      }
    } catch (err) {
      console.error(err);
      return false
      // setData([])
    }
}



export const getCart = async(setData,userId)=>{
  console.log(userId,'uuuuser idd');
  
  try {
      const result = await axios.get(`${BASE_URL}Adding_cart/`,{
        params: { userid: userId }
      });
      
      console.log(result,'kadadadada');
      
      if(result.data  && result.data.status !=404){
        setData(result.data)
        return result.data.cart_data
      }else{
        return false
      }
    } catch (err) {

      console.error(err,'kaakad');
      return false
    }
}



export const fetchCategoryList = async(setData)=>{

  console.log('haii');
  
  
  try {
      const result = await axios.get(`${BASE_URL}product-category/`);
            
      if(result.data){
        setData(result.data)
        return true
      }else{
        return false
      }
    } catch (err) {

      console.error(err);
      return false
    }
}



export const fetchCategoryProducts = async(setData,category)=>{
  
  
  try {
      const result = await axios.post(`${BASE_URL}Category_filter/`,{category_name:category});
            
      if(result.data){
        setData(result.data)
        return true
      }else{
        return false
      }
    } catch (err) {

      console.error(err);
      return false
    }
}



export const updateProductCount  = async(count,productId,userId)=>{

  console.log(count,'cooouunnnttt');
  
  
  
  try {
      const result = await axios.patch(`${BASE_URL}Count_order_update/`,{count:count,product_id:productId,user_id:userId});
            
      if(result.data){
        return true
      }else{
        return false
      }
    } catch (err) {
      console.error(err);
      return false
    }
}