
import { alert } from "@material-tailwind/react";
import axios from "axios";

const BASE_URL = import.meta.env.VITE_BASE_URL ;

// priduct table Api requests
export const fetchProductTableList = async (setFetchedData) => {
    try {
        const result = await axios.get(`${BASE_URL}ProductListPost/`); 
        setFetchedData(result.data);
    } catch (error) {
        console.log(error);  
    }
};


// costumers table Api requests
export const fetchCustomerTableList = async (setfetchedCostomerData)=>{

    try {
        const result = await axios.get(`${BASE_URL}Register/`);
        setfetchedCostomerData(result.data);
        
    } catch (error) {
        console.log(error);
        
    }

}


// orders table Api requests
export const fetchOrdersdata = async (setFetchedOrdersData)=> {
    try {
        const result = await axios.get(`${BASE_URL}order_products/`);
        setFetchedOrdersData(result.data)
    } catch (error) {
        console.log(error);
    }
}


// category table Api requests
export const fetchCategorydata = async (setFetchedCategoryData)=> {
    try {
        const result = await axios.get(`${BASE_URL}product-category/`);
        console.log(result, "datatatatata");
        setFetchedCategoryData(result.data)
    } catch (error) {
        console.log(error);
    }
}

export const postCategorydata = async (setFetchedCategoryData)=> {
    try {
        const result = await axios.get(`${BASE_URL}product-category/`);
        setFetchedCategoryData(result.data)
    } catch (error) {
        console.log(error);
    }
}

export const categoryPostData = async (file, category) => {
    
    try {
        const formData = new FormData();
        formData.append("image", file);
        formData.append("category_name", category);
        
        const response = await axios.post(`${BASE_URL}product-category/`, formData, {
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
    try {
        await axios.delete(`${BASE_URL}Product_categoryUpdate/${id}/`);
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
        const result = await axios.get(`${BASE_URL}Total_orders_list/`);
        console.log(result.data, 'dataaaaaa');
        
        setfetchedOrdersData(result.data);
        
    } catch (error) {
        console.log(error);
        
    }

}

// create costomer
export const postCreatCostumer = async (userName,confirmPassword)=>{
 
    
    try {

        const formData = new FormData()
        formData.append('username' ,userName );
        formData.append('password' ,confirmPassword);
        console.log('creaateeeee costomerrrr', userName,confirmPassword);
        const response = await axios.post(`${BASE_URL}Register/`, formData);
        return response.data;
    } catch (error) {
        console.log(error);
        
    }
}


export const customerDelete = async (id, alert) => {
    try {
        await axios.delete(`${BASE_URL}Profile_update_custumer/${id}/`);
        alert('Deleted successfully');  
        return id;
    } catch (error) {
        console.error("Error deleting customer", error);
        throw error;
    }
};


export const updateStatus = async (id, status) => {
    try {
      const response = await axios.patch(`${BASE_URL}Profile_update_custumer/${id}/`, { status });
      return response.data; 
    } catch (error) {
      console.error("Error updating status:", error);
      throw error;
    }
  };


  export const CreatProduct = async (productName,productCount,selectedCategory, description,priceRange, selectedImages)=>{
    try {
        const formData = new FormData();
        formData.append("product_name", productName);
        formData.append("product_stock", productCount);
        formData.append("product_category", selectedCategory);
        formData.append("product_description", description);
        formData.append("price_range", priceRange);
        // formData.append("product_images", selectedImages);

        if (selectedImages && selectedImages.length > 0) {
            selectedImages.forEach((image, index) => {
                formData.append(`product_images`, image); 
            });
        }

        // for (let i = 0; i < selectedImages.length; i++) {
        //     formData.append('product_images', files[i]); 
        // }
  
        const response = await axios.post(`${BASE_URL}ProductListPost/`, formData, {
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
        await axios.delete(`${BASE_URL}Product_updateanddelete/${id}/`);
        alert('product deleted succesfully');
        return id
    } catch (error) {
          console.log("Error deleting customer", error);
        throw error;
    }
  }


  export const getEnquery = async (setEnqueryData)=>{

    try {
        const result = await axios.get(`${BASE_URL}Enquiry_send/`);
        console.log(result.data, 'dataaaaaa');
        
        setEnqueryData(result.data);
        
    } catch (error) {
        console.log(error);
        
    }

}
  



export const updateCustomer = async (customerId, username, password, setIsOpenEdit, alert) => {
    try {
      const response = await axios.patch(`${BASE_URL}Profile_update_custumer/${customerId}/`, {
        username,
        password
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
        const response = await axios.get(`${BASE_URL}Total_counts_dashboard/`)
        setFetchedDashboardData(response.data)
        
    } catch (error) {
        console.log(error);
        
    }
  }