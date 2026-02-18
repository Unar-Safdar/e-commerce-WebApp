import { apiRequest } from "./productApiService.js";

// ADD PRODUCT
export const addProduct = (product) =>
  apiRequest("/products/add", {
    method: "POST",
    body: product,
  });

// GET PRODUCTS
export const getProducts = () =>
  apiRequest("/products/get", {
    method: "GET",
  });

// DELETE PRODUCT
export const deleteProduct = (id) =>
  apiRequest("/products/deleteProduct", {
    method: "DELETE",
    body: { id },
  });

// UPDATE PRODUCT
export const updateProduct = (id, product) =>
  apiRequest("/products/updateProduct", {
    method: "PUT",
    body: { id, ...product },
  });
