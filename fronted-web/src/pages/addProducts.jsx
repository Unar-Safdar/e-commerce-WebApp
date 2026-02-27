import {
  TextField,
  Button,
  Typography,
  Paper,
  Box,
  Snackbar,
  Alert,
  Container,
  Fade,
  Divider,
  Avatar,
  CircularProgress,
  MenuItem,
  Switch,
  FormControlLabel
} from "@mui/material";

import { AddShoppingCart } from "@mui/icons-material";
import { useState } from "react";
import { addProduct } from "../services/product";

const AddProducts = () => {

  const [product, setProduct] = useState({
    productName: "",
    description: "",
    price: "",
    discountPrice: "",
    category: "",
    brand: "",
    sku: "",
    stock: "",
    isActive: true
  });

  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setProduct({
      ...product,
      [name]: type === "checkbox" ? checked : value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      await addProduct(product.productName, product.description, product.price, product.discountPrice, product.category, product.brand, product.sku, product.stock, product.isActive); // ✅ better to send object
      setOpen(true);
      setProduct({
        productName: "",
        description: "",
        price: "",
        discountPrice: "",
        category: "",
        brand: "",
        sku: "",
        stock: "",
        isActive: true
      });
    } catch (err) {
      alert("Product Add Failed: " + (err.response?.data?.message || err.message));
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container maxWidth="sm" sx={{ minHeight: "100vh", display: "flex", alignItems: "center" }}>
      <Fade in timeout={500}>
        <Paper sx={{ p: 4, width: "100%", borderRadius: 4 }}>
          
          <Box sx={{ textAlign: "center", mb: 3 }}>
            <Avatar sx={{ mx: "auto", mb: 2 }}>
              <AddShoppingCart />
            </Avatar>
            <Typography variant="h5" fontWeight="bold">
              Add New Product
            </Typography>
          </Box>

          <Box component="form" onSubmit={handleSubmit}>
            
            <TextField
              fullWidth
              label="Product Name"
              name="productName"
              value={product.productName}
              onChange={handleChange}
              sx={{ mb: 2 }}
              required
            />

            <TextField
              fullWidth
              label="Description"
              name="description"
              value={product.description}
              onChange={handleChange}
              sx={{ mb: 2 }}
              multiline
              rows={3}
              required
            />

            <TextField
              fullWidth
              label="Price"
              name="price"
              type="number"
              value={product.price}
              onChange={handleChange}
              sx={{ mb: 2 }}
              required
            />

            <TextField
              fullWidth
              label="Discount Price"
              name="discountPrice"
              type="number"
              value={product.discountPrice}
              onChange={handleChange}
              sx={{ mb: 2 }}
            />

            <TextField
              fullWidth
              label="Category"
              name="category"
              value={product.category}
              onChange={handleChange}
              sx={{ mb: 2 }}
              required
            />

            <TextField
              fullWidth
              label="Brand"
              name="brand"
              value={product.brand}
              onChange={handleChange}
              sx={{ mb: 2 }}
            />

            <TextField
              fullWidth
              label="SKU"
              name="sku"
              value={product.sku}
              onChange={handleChange}
              sx={{ mb: 2 }}
            />

            <TextField
              fullWidth
              label="Stock"
              name="stock"
              type="number"
              value={product.stock}
              onChange={handleChange}
              sx={{ mb: 2 }}
              required
            />

            <FormControlLabel
              control={
                <Switch
                  checked={product.isActive}
                  onChange={handleChange}
                  name="isActive"
                />
              }
              label="Active Product"
              sx={{ mb: 2 }}
            />

            <Button
              fullWidth
              type="submit"
              variant="contained"
              disabled={loading}
              sx={{ py: 1.5 }}
            >
              {loading ? (
                <>
                  <CircularProgress size={20} sx={{ mr: 1 }} color="inherit" />
                  Adding...
                </>
              ) : (
                "Add Product"
              )}
            </Button>
          </Box>

          <Divider sx={{ my: 3 }} />

        </Paper>
      </Fade>

      <Snackbar open={open} autoHideDuration={3000} onClose={() => setOpen(false)}>
        <Alert severity="success">
          Product Added Successfully
        </Alert>
      </Snackbar>
    </Container>
  );
};

export default AddProducts;