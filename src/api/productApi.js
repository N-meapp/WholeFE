import axios from "axios";
import api from "./axiosInstance";
const BASE_URL = import.meta.env.VITE_BASE_URL


export const fetchNewlyArrivals = async(setData)=>{
    try {
        const result = await api.get(`${BASE_URL}Newly_arrived/`);
        
        setData(result.data)
      } catch (err) {
        console.error(err);
      }
}

export const fetchSuggestedProducts = async(setData,userId)=>{
  
  try {
      const result = await api.get(`${BASE_URL}Search_history/`,{params: { user_id: userId }})
        
      setData(result.data)
      if(result.data){
        return true
      }else{
        return false
      }
    } catch (err) {
      return false
      console.error(err);
    }
}



export const fetchTopProducts = async(setData)=>{
    try {
        const result = await api.get(`${BASE_URL}Top_products/`);

        console.log(result,'top products');
        
        
        setData(result.data)
      } catch (err) {
        console.error(err);
      }
}


export const fetchAllProducts = async(setData)=>{
    try {
        const result = await api.get(`${BASE_URL}ProduclistView/`);
        setData(result.data)
      } catch (err) {
        console.error(err);
      }
}

export const fetchLimitedProducts = async(setData)=>{
  try {
      const result = await api.get(`${BASE_URL}ProduclistViewlimit/`);
      
      setData(result.data)
    } catch (err) {
      console.error(err);
    }
}


export const fetchSliderAdds = async(setData)=>{
  try {
      const result = await api.get(`${BASE_URL}slider_Adds/`);
      if(result){
        
        setData(result.data)
      }

    } catch (err) {
      console.error(err);
    }
}



export const getSearchedOutput = async(setData,value)=>{
  try {

    
      const result = await api.post(`${BASE_URL}Search_all_products/`,{search_term:value});
      
      
      if(result.data.products){
        setData(result.data.products)
      }else{
        setData([])
      }
    } catch (err) {
      console.error(err);
      setData([])
    }
}



export const placeOrder = async(userId,value,username)=>{
    

  
  
  value.order_track = 'null'
  
  
  try {
      const result = await api.post(`${BASE_URL}order_products/`,{orders:value,userid:userId,username:username});
      
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
  
  try {
      const result = await api.get(`${BASE_URL}order_products/`,{params:{userid:userId}});
      
      
      if(result.data){
        setData(result.data)
        return true
      }else{
        setData([])
        return false
      }
    } catch (err) {
      console.error(err);
      setData([])
      return false
    }
}




export const addToCart = async(productId,count,user)=>{

  const item = {id:productId,count:count}
  // item.count = count
  const itemsArray = []
  itemsArray[0] = item

  console.log(productId,count,user,'products count user');
  
  
  try {
      const result = await api.post(`${BASE_URL}Adding_cart/`,{products:itemsArray,user_id:user});
      
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
      const result = await api.post(`${BASE_URL}Delete_all_cart/`,{username:user});
      
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
  
  try {
      const result = await api.get(`${BASE_URL}Adding_cart/`,{
        params: { userid: userId }
      });
      
      
      if(result.data  && result.data.status !=404){
        setData(result.data)
        return result.data.cart_data
      }else{
        return false
      }
    } catch (err) {

      console.error(err,'error in fetching card');
      return false
    }
}



export const fetchCategoryList = async(setData)=>{

  
  
  try {
      const result = await api.get(`${BASE_URL}product-category/`);
            
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
      const result = await api.post(`${BASE_URL}Category_filter/`,{category_name:category});
            
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

  
  
  
  try {
      const result = await api.patch(`${BASE_URL}Count_order_update/`,{count:count,product_id:productId,user_id:userId});
            
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

export const cancelOrderProducts  = async(orderId,productId,userId)=>{
  

  const data = {
    order_id: orderId,
    product_id: productId,
    user_id: userId
  }

  
  
  try {
      const result = await api.delete(`${BASE_URL}CancelOrder/`,{data});

      
            
      if(result.data && result.status == 200){
        return true
      }else{
        return false
      }
    } catch (err) {
      console.error(err);
      return false
    }
}


export const cancelOrder  = async(orderId,userId)=>{
  

  const data = {
    order_id: orderId,
    user_id: userId
  }

  
  
  try {
      const result = await api.post(`${BASE_URL}CancelOrder/`,data);

      
            
      if(result.data && result.status == 200){
        return true
      }else{
        return false
      }
    } catch (err) {
      console.error(err);
      return false
    }
}

export const deleteCartProduct  = async(productId,userId)=>{
  

  const data = {
    id:productId,
    user_id:userId
  }

  
  
  try {
      const result = await api.delete(`${BASE_URL}Delete_all_cart/`,{data});

      
            
      if(result.data && result.status == 200){
        return true
      }else{
        return false
      }
    } catch (err) {
      console.error(err);
      return false
    }
}



export const addToHistory = async(user,category)=>{

  
  try {
      const result = await api.post(`${BASE_URL}Search_history/`,{user_id:user,term:category});
      
      if(result.data){
        // setData(result.data.results)
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

export const getSingleProduct = async(productId)=>{

  
  try {
      const result = await api.get(`${BASE_URL}Product_updateanddelete/${productId}`);
      
      if(result.data){
        // setData(result.data.results)
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


export const sendEnquiry = async(user,productId,message)=>{
  

  const data = {
    user_id:user,
    product_id:productId,
    message:message
  }
  
  try {
      const result = await api.post(`${BASE_URL}Enquiry_send/`,data);
      console.log(result,'enqiry send...');
      
      if(result.data){
        // setData(result.data.results)
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

