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



export const updateUser = async (data,id,imageFile) => {  

  console.log(data,'dataaaaaaa');

  const formData = new FormData();
  formData.append("username", data.username);
  formData.append("phone_number", data.phone);
    formData.append("image", imageFile);


  
  try {
    const result = await axios.patch(`${BASE_URL}Profile_update_custumer/${id}/`,formData);
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