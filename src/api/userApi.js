import axios from "axios";
import Swal from "sweetalert2";
const BASE_URL = import.meta.env.VITE_BASE_URL;

export const userLogin = async (username, password) => {
  const data = {
    username: username,
    password: password,
  };

  try {
    const result = await axios.post(`${BASE_URL}Login/`, data);

    console.log(result);

    if (result.data.user_id && result.data.username) {
      
        return result?.data;
    } else {
      return false;
    }
  } catch (err) {
    console.log(err);

    return false;
  }
};



export const getUser = async (setData,id) => {

  
  try {
    const result = await axios.get(`${BASE_URL}Profile_update_custumer/${id}`);

    console.log(result,'resulttttt.....iddddd');
    

    if(result.data){

      setData(result.data)
      return result.data
    }else{  
      return false
    }
    
   
  } catch (err) {
    console.log(err);
    return false;
  }
};




export const updateAddress = async (address,id) => {
  
  try {
    const result = await axios.patch(`${BASE_URL}Profile_update_custumer/${id}/`,{address:address});
    if(result.data){

      return result.data
    }else{
      return false
    }
  } catch (err) {
    console.log(err);
    return false;
  }
};



export const updateUser = async (data,id) => {  

  
  try {
    const result = await axios.patch(`${BASE_URL}Profile_update_custumer/${id}/`,{username:data.username,phone_number:data.phone});
    if(result.data){

      return result.data
    }else{
      return false
    }
  } catch (err) {
    console.log(err);
    return false;
  }
};