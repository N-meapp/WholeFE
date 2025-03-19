
import { alert } from "@material-tailwind/react";
import axios from "axios";
import api from "./axiosInstance"

const BASE_URL = import.meta.env.VITE_BASE_URL ;


export const AdminLogin = async (username, password) => {
    const data = { username, password };

    try {
        const result = await axios.post(`${BASE_URL}Login/`, data);

        if (result.data.user_id && result.data.username && result.data.access_token && result.data.refresh_token) {
            localStorage.setItem("accessToken", result.data.access_token);
            localStorage.setItem("refreshToken", result.data.refresh_token);
            
            console.log("Login successful!");
            return result.data; // Return user data
        } else {
            return false; // Return false if login data is incorrect
        }

    } catch (error) {
        console.error("API error:", error);
        return false; // Return false on error
    }
};


// priduct table Api requests
export const fetchProductTableList = async (setFetchedData) => {
    try {
        const result = await api.get(`ProductListPost/`);
        setFetchedData(result.data);
    } catch (error) {
        console.log(error);  
    }
};


// costumers table Api requests
export const fetchCustomerTableList = async (setfetchedCostomerData)=>{

    try {
        const result = await api.get(`Register/`);
        setfetchedCostomerData(result.data);
        
    } catch (error) {
        console.log(error);
        
    }

}


// orders table Api requests
export const fetchOrdersdata = async (setFetchedOrdersData)=> {
    try {
        const result = await api.get(`order_products/`);
        setFetchedOrdersData(result.data)
    } catch (error) {
        console.log(error);
    }
}

// category table Api requests
export const fetchCategorydata = async (setFetchedCategoryData)=> {
    try {
        const result = await api.get(`product-category/`);
        console.log(result, "datatatatata");
        setFetchedCategoryData(result.data)
    } catch (error) {
        console.log(error);
    }
}

export const postCategorydata = async (setFetchedCategoryData)=> {
    try {
        const result = await api.get(`product-category/`);
        setFetchedCategoryData(result.data)
    } catch (error) {
        console.log(error);
    }
}

export const categoryPostData = async (file, category) => {
    
    try {
        const formData = new FormData();
        formData.append("image", file);
        formData.append("name", category);
        
        const response = await api.post(`product-category/`, formData, {
            headers: {
                "Content-Type": "multipart/form-data",
            },
        });

        return response.data;
    } catch (error) {
        console.error("Error uploading file:", error);
        throw error;
    }
};

export const categoryDelete = async (id, alert) => {
    console.log(id, "id check");
    
    try {
        await api.delete(`Product_categoryUpdate/${id}/`);
        alert('deleted')
        return id; 
       
    } catch (error) {
        console.error("Error deleting category", error);
        throw error;
    }
};



// Orders Api

export const fetchOrdersList = async (setfetchedOrdersData)=>{

    try {
        const result = await api.get(`Total_orders_list/`);
        console.log(result.data, 'dataaaaaa');
        
        setfetchedOrdersData(result.data);
        
    } catch (error) {
        console.log(error);
        
    }

}

// create costomer
export const postCreatCostumer = async (userName,confirmPassword, discount)=>{
 
    
    try {

        const formData = new FormData()
        formData.append('username' ,userName );
        formData.append('password' ,confirmPassword);
        formData.append('discount_individual', discount)
        console.log('creaateeeee costomerrrr', userName,confirmPassword);
        const response = await api.post(`Register/`, formData);
        return response.data;
    } catch (error) {
        console.log(error);
        
    }
}

// delete customer
export const customerDelete = async (id, alert) => {
    try {
        await api.delete(`Profile_update_custumer/${id}/`);
        alert('Deleted successfully');  
        return id;
    } catch (error) {
        console.error("Error deleting customer", error);
        throw error;
    }
};

// update costumer status block and unblock
export const updateStatus = async (id, status) => {
    try {
      const response = await api.patch(`Profile_update_custumer/${id}/`, { status });
      return response.data; 
    } catch (error) {
      console.error("Error updating status:", error);
      throw error;
    }
  };

// add product
  export const CreatProduct = async (productName, productCount, selectedCategory, description, fields, images)=>{

    
    try {
        const formData = new FormData();
        formData.append("product_name", productName);
        formData.append("product_stock", productCount);
        formData.append("product_category", selectedCategory);
        formData.append("product_description", description);
        const priceRangeWithoutId = fields.map(({index_number, ...rest }) => rest);

        console.log(priceRangeWithoutId,'price rangee');
        

        formData.append("prize_range", JSON.stringify(priceRangeWithoutId));
        // formData.append("price_range", JSON.stringify(fields));
        // formData.append("product_images", selectedImages);

        console.log(formData,'formmm dataa');
        
        
        if (images && images.length > 0) {
            images.forEach((image, index) => {
                formData.append(`product_images`, image); 
            });
        }


        const response = await api.post(`ProductListPost/`, formData, {
            headers: {
                "Content-Type": "multipart/form-data",
            },
        });

        return response.data;
        
    } catch (error) {
        console.log(error);
        
    }
  }


// update product
  export const updateProduct = async (productName, productCount, selectedCategory, description, fields, selctProductId, newImageFile, existingImages)=>{
    try {
        const formData = new FormData();
        formData.append("product_name", productName);
        formData.append("product_stock", productCount);
        formData.append("product_category", selectedCategory);
        formData.append("product_description", description);
        const priceRangeWithoutId = fields.map(({...rest }) => rest);
        formData.append("prize_range", JSON.stringify(priceRangeWithoutId));
        // formData.append("price_range", JSON.stringify(fields));
        formData.append("existing_images_update", JSON.stringify(existingImages));
        if (newImageFile && newImageFile.length > 0) {
            newImageFile.forEach((image, index) => {
                formData.append(`new_product_images`, image); 
            });
        }


        const response = await api.patch(`Product_updateanddelete/${selctProductId}/`, formData, {
            headers: {
                "Content-Type": "multipart/form-data",
            },
        });

        return response.data;
        
    } catch (error) {
        console.log(error);
        
    }
  }


  export const handleDeleteproduct = async (id, alert)=>{
    console.log('reveced api code');
    
    try {
        await api.delete(`Product_updateanddelete/${id}/`);
        alert('product deleted succesfully');
        return id
    } catch (error) {
          console.log("Error deleting customer", error);
        throw error;
    }
  }


  export const getEnquery = async (setEnqueryData)=>{

    try {
        const result = await api.get(`Enquiry_send/`);
        console.log(result.data, 'dataaaaaa');
        
        setEnqueryData(result.data);
        
    } catch (error) {
        console.log(error);
        
    }

}
  



export const updateCustomer = async (customerId, username, password,discount_individual, setIsOpenEdit, alert) => {
    try {
      const response = await api.patch(`Profile_update_custumer/${customerId}/`, {
        username,
        password,
        discount_individual
      });
      setIsOpenEdit(false)
      alert('upadetd')
      return response.data;
    } catch (error) {
      throw new Error('Error updating customer');
    }
  };



  export const getDashboardData = async (setFetchedDashboardData) => {
    try {
        const response = await api.get(`Total_counts_dashboard/`)
        setFetchedDashboardData(response.data)
        
    } catch (error) {
        console.log(error);
        
    }
  }

  export const ProductSerach = async (data) => {
    const term = { search_term: data };
    try {
      const resp = await api.post(`Search_all_products/`, term);
    //   console.log(resp, "api dataaa");
      return resp.data.products;

    } catch (error) {
      console.log(error);
      return [];
    }
  };


  export const OrdersSerach = async (data) => {
    const term = { search_term: data };
    try {
      const resp = await api.post(`SearchOrders/`, term);
    //   console.log(resp, "api dataaa");
      return resp.data.orders

    } catch (error) {
      console.log(error);
      return [];
    }
  };


  export const fetchCategorySelect = async (setFetchedData) => {
    try {
        const result = await api.get(`product-category/`); 
        setFetchedData(result.data);
    } catch (error) {
        console.log(error);  
    }
};


export const singleOrderStatusUpdating = async (singleRejectedData) => {
    try {
      const response = await api.patch(`Update_order_status/`, singleRejectedData);
      alert('upadetd')
      return response.data;
    } catch (error) {
        console.log(error);
      throw new Error('Error updating customer');
    
    }
  };


  export const updateAcceptAllRejectAllStatus= async (AcceptAllRjectAllData, id) => {
    try {
      const response = await api.patch(`${BASE_URL}Update_tracking/${AcceptAllRjectAllData.id}/`, AcceptAllRjectAllData);
      alert('upadetd')
      return response.data;
    } catch (error) {
        console.log(error);
    }
  };

  
  export const updateOrderTrackingStatus = async (orderTrackingStatus) => {
    try {
      const response = await api.patch(`Update_tracking/${orderTrackingStatus.id}/`, orderTrackingStatus);
      alert('upadetd')
      return response.data;
    } catch (error) {
        console.log(error);
    }
  };




  export const fetchSliderAd = async (setFetchedCategoryData)=> {
    try {
        const result = await api.get(`slider_Adds/`);
        console.log(result, "datatatatata");
        setFetchedCategoryData(result.data)
    } catch (error) {
        console.log(error);
    }
}


export const postSliderAd = async (file) => {
    
    try {
        const formData = new FormData();
        formData.append("image", file);
        const response = await api.post(`slider_Adds/`, formData, {
            headers: {
                "Content-Type": "multipart/form-data",
            },
        });

        return response.data;
    } catch (error) {
        console.error("Error uploading file:", error);
        throw error;
    }
};


export const sliderAdDelete = async (id, alert) => {
    try {
        await api.delete(`slider_Adds/${id}/`);
        alert('deleted')
        return id; 
       
    } catch (error) {
        console.error("Error deleting category", error);
        throw error;
    }
};