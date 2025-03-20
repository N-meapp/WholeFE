import axios from "axios";
const BASE_URL = import.meta.env.VITE_BASE_URL


export const fetchNewlyArrivals = async(setData)=>{
    try {
        const result = await axios.get(`${BASE_URL}Newly_arrived/`);
        
        setData(result.data)
      } catch (err) {
        console.error(err);
      }
}

export const fetchSuggestedProducts = async(setData,userId)=>{

  console.log(userId,'useresidididi');
  
  try {
      const result = await axios.get(`${BASE_URL}Search_history/`,{params: { user_id: userId }})
        console.log(result,'suggested products......');
        
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
        const result = await axios.get(`${BASE_URL}Top_products/`);
        console.log(result,'top products.....');
        
        setData(result.data)
      } catch (err) {
        console.error(err);
      }
}


export const fetchAllProducts = async(setData)=>{
    try {
        const result = await axios.get(`${BASE_URL}ProduclistView/`);
        setData(result.data)
      } catch (err) {
        console.error(err);
      }
}

export const fetchLimitedProducts = async(setData)=>{
  try {
      const result = await axios.get(`${BASE_URL}ProduclistViewlimit/`);
      console.log('fetch limited products ....',result);
      
      setData(result.data)
    } catch (err) {
      console.error(err);
    }
}


export const fetchSliderAdds = async(setData)=>{
  try {
      const result = await axios.get(`${BASE_URL}slider_Adds/`);
      console.log('slider adds ....',result);
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
    

  console.log('valueeesidfifdisfdiisfd',value);
  
  
  value.order_track = 'null'
  
  try {
      const result = await axios.post(`${BASE_URL}order_products/`,{orders:value,userid:userId,username:username});
      
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

  console.log(count,productId,userId,'cooouunnnttt');
  
  
  
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

export const cancelOrderProducts  = async(orderId,productId,userId)=>{
  
  console.log(orderId,productId,userId);

  const data = {
    order_id: orderId,
    product_id: productId,
    user_id: userId
  }

  
  
  try {
      const result = await axios.delete(`${BASE_URL}CancelOrder/`,{data});

      console.log(result,'rrreee');
      
            
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
  
  console.log(orderId,userId);

  const data = {
    order_id: orderId,
    user_id: userId
  }

  
  
  try {
      const result = await axios.post(`${BASE_URL}CancelOrder/`,data);

      console.log(result,'reeesutllll');
      
            
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
      const result = await axios.delete(`${BASE_URL}Delete_all_cart/`,{data});

      console.log(result,'reeesutllll');
      
            
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
      const result = await axios.post(`${BASE_URL}Search_history/`,{user_id:user,term:category});
      
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
      const result = await axios.get(`${BASE_URL}Product_updateanddelete/${productId}`);
      console.log(result,'rrrreeee');
      
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
      const result = await axios.post(`${BASE_URL}Enquiry_send/`,data);
      console.log(result,'ressuult');
      
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

