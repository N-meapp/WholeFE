import axios from "axios";
import apiUser from "./axiosInstanceUser";
const BASE_URL = import.meta.env.VITE_BASE_URL;

export const userLogin = async (username, password) => {
  const data = {
    username: username,
    password: password,
  };

  try {
    const result = await axios.post(`${BASE_URL}Login/`, data);

    console.log(result,'rrrreeeees');
    

    if (result.data.user_id && result.data.username && result.data.user_type =="customer") {

      localStorage.setItem("accessToken", result.data.access_token);
      localStorage.setItem("refreshToken", result.data.refresh_token);

      return result?.data;
    } else {
      return false;
    }
  } catch (err) {
    console.log(err);

    return false;
  }
};

export const getUser = async (setData, id) => {
  try {
    const result = await apiUser.get(`${BASE_URL}Profile_update_custumer/${id}`);

    if (result.data) {
      setData(result.data);
      return result.data;
    } else {
      return false;
    }
  } catch (err) {
    console.log(err);
    return false;
  }
};

export const updateAddress = async (address, id) => {
  try {
    const result = await apiUser.patch(
      `${BASE_URL}Profile_update_custumer/${id}/`,
      { address: address }
    );
    if (result.data) {
      return result.data;
    } else {
      return false;
    }
  } catch (err) {
    console.log(err);
    return false;
  }
};

export const updateUser = async (data, id, imageFile) => {

  const formData = new FormData();
  formData.append("username", data.username);
  formData.append("phone_number", data.phone);
  formData.append("image", imageFile);

  // console.log(data,imageFile,id,'thisis the code ');


  console.log(imageFile, 'forrmm dataa');


  try {
    const result = await apiUser.patch(
      `${BASE_URL}Profile_update_custumer/${id}/`,formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
    if (result.data) {
      return result.data;
    } else {
      return false;
    }
  } catch (err) {
    console.log(err);
    return false;
  }
};



export const removeProfileImage = async (id) => {

  try {
    const result = await apiUser.post(
      `${BASE_URL}Profile_update_custumer/${id}/`
    );
    if (result.data) {
      return result.data;
    } else {
      return false;
    }
  } catch (err) {
    console.log(err);
    return false;
  }
};