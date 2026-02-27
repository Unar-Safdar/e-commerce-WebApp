import { useState, useEffect } from "react"
import { getProduct } from "../services/product.js"
import { updateProduct } from "../services/product.js"
// import { data } from "react-router-dom"
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField
} from "@mui/material";
import {
  Card,
  CardContent,
  Typography,
  Grid,
  Chip,
  Box
} from "@mui/material";
import Navbar from "./NavBar.jsx";


function Home() {
  const [products, setProducts] = useState([])
  const [editProduct, setEditProduct] = useState(null);
  const [open, setOpen] = useState(false);
  // fetch data functions
  useEffect(() => {
     const fetchData = async () => {
    try {
      const response = await getProduct();

      // console.log(response)


      setProducts((prevProducts) => [
        ...prevProducts, // set previese values
        ...response
      ])

      // console.log(products)
    } catch (err) {
      console.log(`Products not Found ${err.message}`)
    }
  };
  fetchData()
   
  }, [setProducts])
 


  // Update Product Function

  const handleUpdate = async () => {
    try {
      const data = await updateProduct({
        _id: editProduct._id,       // for identifying which product to update
        productName: editProduct.productName,
        description: editProduct.description,
        price: editProduct.price,
        discountPrice: editProduct.discountPrice,
        category: editProduct.category,
        brand: editProduct.brand,
        sku: editProduct.sku,
        stock: editProduct.stock,
        isActive: editProduct.isActive
      });
      if (data.success) {
        const updateProducts = products.map(item => item._id ? editProduct : item);
        setProducts(updateProducts)
        setOpen(false)
      }
    } catch (error) {
      console.log(error.message);

    }



  };


  
  return (
    <>
    <Navbar />
    <Box sx={{ padding: 4 }}>
      <Typography variant="h4" gutterBottom>
        Product List
      </Typography>
      <Grid container spacing={3}>
        {products.map((product) => (
          <Grid item xs={12} sm={6} md={4} key={product.sku}>
            <Card variant="outlined" sx={{ minHeight: 250 }}>
              <CardContent>
                <Typography variant="h6" fontWeight="bold">
                  {product.productName}
                </Typography>
                <Typography variant="body2" color="text.secondary" gutterBottom>
                  {product.description}
                </Typography>
                <Typography>
                  Price: <strong>₹{product.price}</strong>
                </Typography>
                <Typography>
                  Discount Price: <strong>₹{product.discountPrice}</strong>
                </Typography>
                <Typography>
                  Category: {product.category}
                </Typography>
                <Typography>
                  Brand: {product.brand}
                </Typography>
                <Typography>
                  SKU: {product.sku}
                </Typography>
                <Typography>
                  Stock: {product.stock}
                </Typography>
                <Chip
                  label={product.isActive ? "Active" : "Inactive"}
                  color={product.isActive ? "success" : "default"}
                  size="small"
                  sx={{ mt: 1 }}
                />
                <button
                  onClick={() => {
                    setEditProduct(product);
                    setOpen(true);
                  }}
                >
                  Edit
                </button>

              </CardContent>

            </Card>
          </Grid>
        ))}
      </Grid>
      <Dialog open={open} onClose={() => setOpen(false)} fullWidth>

        <DialogTitle>Edit Product</DialogTitle>

        <DialogContent>

          <TextField
            margin="dense"
            label="Product Name"
            fullWidth
            value={editProduct?.productName || ""}
            onChange={(e) =>
              setEditProduct({ ...editProduct, productName: e.target.value })
            }
          />

          <TextField
            margin="dense"
            label="Description"
            fullWidth
            value={editProduct?.description || ""}
            onChange={(e) =>
              setEditProduct({ ...editProduct, description: e.target.value })
            }
          />

          <TextField
            margin="dense"
            label="Price"
            type="number"
            fullWidth
            value={editProduct?.price || ""}
            onChange={(e) =>
              setEditProduct({ ...editProduct, price: e.target.value })
            }
          />

          <TextField
            margin="dense"
            label="Discount Price"
            type="number"
            fullWidth
            value={editProduct?.discountPrice || ""}
            onChange={(e) =>
              setEditProduct({ ...editProduct, discountPrice: e.target.value })
            }
          />

          <TextField
            margin="dense"
            label="Category"
            fullWidth
            value={editProduct?.category || ""}
            onChange={(e) =>
              setEditProduct({ ...editProduct, category: e.target.value })
            }
          />

          <TextField
            margin="dense"
            label="Brand"
            fullWidth
            value={editProduct?.brand || ""}
            onChange={(e) =>
              setEditProduct({ ...editProduct, brand: e.target.value })
            }
          />

          <TextField
            margin="dense"
            label="SKU"
            fullWidth
            value={editProduct?.sku || ""}
            onChange={(e) =>
              setEditProduct({ ...editProduct, sku: e.target.value })
            }
          />

          <TextField
            margin="dense"
            label="Stock"
            type="number"
            fullWidth
            value={editProduct?.stock || ""}
            onChange={(e) =>
              setEditProduct({ ...editProduct, stock: e.target.value })
            }
          />

        </DialogContent>

        <DialogActions>
          <Button onClick={() => setOpen(false)}>Cancel</Button>
          <Button variant="contained" onClick={handleUpdate}>
            Update
          </Button>
        </DialogActions>

      </Dialog>
    </Box>
    </>


  )
}

export default Home