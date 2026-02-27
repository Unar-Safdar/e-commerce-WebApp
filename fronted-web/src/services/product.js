
import { apiRequest } from "./APIService";
// Get Products
export async function getProduct() {
  try {
    const data = await apiRequest(`/product/getproduct`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      
      
    });
  //  console.log(data.products , "line24");
   
   
    return data.products
  } catch (error) {
    console.error("product Get failed", error.message);
    

    throw error;
  }
}

// Add Products 

export async function addProduct(productName,description,price,discountPrice,  category,    brand,    sku,    stock,    isActive ) {
  try {
    const data = await apiRequest(`/product/addproduct`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        // Authorization: `Bearer ${token}`,
      },
      // Call
     body: JSON.stringify({
      productName,
      description,
      price,
      discountPrice,
      category,
      brand,
      sku,
      stock,
      isActive
    })
      
    });
    // console.log(data, "ADD Product DATA");
    // Handle successful login (e.g., store token in localStorage/sessionStorage)
    if (data && data.token) {
      localStorage.setItem("userToken", data.token);
    }
    return data;
  } catch (error) {
    console.error("Product ADD Faild:", error.message);
    // Specific error handling for login can go here
    throw error;
  }
}

// update products

export async function updateProduct({productName,description,price,discountPrice,  category,    brand,    sku,    stock,    isActive} ) {
  try {
    const data = await apiRequest(`/product/updateProduct`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        // Authorization: `Bearer ${token}`,
      },
      // Call
     body: JSON.stringify({
      productName,
      description,
      price,
      discountPrice,
      category,
      brand,
      sku,
      stock,
      isActive
    })
      
    });
    // console.log(data, "ADD Product DATA");
    // Handle successful login (e.g., store token in localStorage/sessionStorage)
    if (data && data.token) {
      localStorage.setItem("userToken", data.token);
    }
    return data.products;
  } catch (error) {
    console.error("Product Update  Faild:", error.message);
    // Specific error handling for login can go here
    throw error;
  }
}

// update product
