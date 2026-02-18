import {
  Typography,
  Button,
  TextField,
  Box,
  Paper,
  List,
  ListItem,
  ListItemText,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  IconButton,
  Grid,
  Container,
  Chip,
  CircularProgress,
  Fade
} from "@mui/material";
import {
  Delete,
  Edit,
  Add,
  Logout
} from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { addProduct, deleteProduct, getProducts, updateProduct } from "../services/product.js";

const Home = () => {
  const navigate = useNavigate();
  const userName = localStorage.getItem("userName");
  const [products, setProducts] = useState([]);
  const [form, setForm] = useState({ name: "", description: "", price: "", discountPrice: "", category: "", brand: "", sku: "", stock: "" });
  const [edit, setEdit] = useState({ open: false, id: "", name: "", price: "" });
  const [loading, setLoading] = useState(false);
  const [adding, setAdding] = useState(false);

  // FETCH PRODUCTS
  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      setLoading(true);
      const data = await getProducts();
      setProducts(data.products || []);
    } catch (error) {
      console.error("Error fetching products:", error);
    } finally {
      setLoading(false);
    }
  };

  // ADD PRODUCT
  const handleAdd = async () => {
    if (!form.name || !form.price) return;
    try {
      setAdding(true);
      await addProduct({ name: form.name.trim(), price: parseFloat(form.price) });
      setForm({ name: "", price: "" });
      fetchProducts();
    } catch (error) {
      console.error("Error adding product:", error);
    } finally {
      setAdding(false);
    }
  };

  // DELETE PRODUCT
  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this product?")) return;
    try {
      await deleteProduct(id);
      fetchProducts();
    } catch (error) {
      console.error("Error deleting product:", error);
    }
  };

  // OPEN EDIT DIALOG
  const handleEditOpen = (product) => {
    setEdit({ open: true, id: product._id, name: product.name, price: product.price });
  };

  // UPDATE PRODUCT
  const handleUpdate = async () => {
    if (!edit.name || !edit.price) return;
    try {
      await updateProduct(edit.id, { name: edit.name.trim(), price: parseFloat(edit.price) });
      setEdit({ open: false, id: "", name: "", price: "" });
      fetchProducts();
    } catch (error) {
      console.error("Error updating product:", error);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("userToken");
    localStorage.removeItem("userName");
    navigate("/");
  };

  return (
    <Container maxWidth="lg" sx={{ py: 8, minHeight: '100vh' }}>
      {/* Header Section */}
      <Fade in timeout={1000}>
        <Box sx={{
          textAlign: 'center',
          mb: 8,
          px: 2,
          pt: 4,
          borderRadius: 4,
          background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
          color: 'white',
          boxShadow: '0 20px 40px rgba(102, 126, 234, 0.3)'
        }}>
          <Typography variant="h2" sx={{ fontWeight: 700, mb: 1 }}>
            Welcome Back {userName}!
          </Typography>
          <Typography variant="h5" sx={{ opacity: 0.9, fontWeight: 300 }}>
            Manage your products easily
          </Typography>
          <Button
            variant="outlined"
            startIcon={<Logout />}
            onClick={handleLogout}
            sx={{
              mt: 3,
              borderRadius: 3,
              px: 4,
              border: '2px solid rgba(255,255,255,0.5)',
              color: 'white',
              '&:hover': {
                border: '2px solid white',
                backgroundColor: 'rgba(255,255,255,0.1)',
                boxShadow: '0 0 20px rgba(255,255,255,0.3)'
              }
            }}
          >
            Logout
          </Button>
        </Box>
      </Fade>

     <Grid container spacing={4} display="flex" justifyContent="center">
  {/* Add Product Card - Height Increased */}
  <Grid item xs={12} md={4}>
    <Paper sx={{ 
      p: 4, 
      minHeight: 550,  // Height increased
      height: 'fit-content',
      borderRadius: 3,
      boxShadow: '0 15px 35px rgba(0,0,0,0.1)',
      transition: 'all 0.3s ease',
      '&:hover': {
        transform: 'translateY(-10px)',
        boxShadow: '0 25px 50px rgba(0,0,0,0.15)'
      },
      background: 'linear-gradient(145deg, #f0f2ff 0%, #e0e7ff 100%)'
    }}>
      <Typography variant="h5" sx={{ mb: 3, fontWeight: 700, color: '#5b5bd6' }}>
        ➕ Add New Product
      </Typography>
      
      {/* All Product Details */}
      <TextField
        fullWidth
        label="Product Name"
        value={form.name}
        onChange={(e) => setForm({ ...form, name: e.target.value })}
        sx={{ mb: 3, '& .MuiOutlinedInput-root': { borderRadius: 2 } }}
      />
      
      <TextField
        fullWidth
        label="Price (PKR)"
        type="number"
        value={form.price}
        onChange={(e) => setForm({ ...form, price: e.target.value })}
        sx={{ mb: 3, '& .MuiOutlinedInput-root': { borderRadius: 2 } }}
      />
      
      {/* Additional Product Details */}
      <TextField
        fullWidth
        label="Category"
        value={form.category || ""}
        onChange={(e) => setForm({ ...form, category: e.target.value })}
        sx={{ mb: 3, '& .MuiOutlinedInput-root': { borderRadius: 2 } }}
      />
      
      <TextField
        fullWidth
        label="Description"
        multiline
        rows={3}
        value={form.description || ""}
        onChange={(e) => setForm({ ...form, description: e.target.value })}
        sx={{ mb: 3, '& .MuiOutlinedInput-root': { borderRadius: 2 } }}
      />
      
      <TextField
        fullWidth
        label="Stock Quantity"
        type="number"
        value={form.stock || ""}
        onChange={(e) => setForm({ ...form, stock: e.target.value })}
        sx={{ mb: 3, '& .MuiOutlinedInput-root': { borderRadius: 2 } }}
      />
      
      <TextField
        fullWidth
        label="SKU Code"
        value={form.sku || ""}
        onChange={(e) => setForm({ ...form, sku: e.target.value })}
        sx={{ mb: 4, '& .MuiOutlinedInput-root': { borderRadius: 2 } }}
      />

      <Button
        fullWidth
        variant="contained"
        startIcon={adding ? <CircularProgress size={20} color="inherit" /> : <Add />}
        onClick={handleAdd}
        disabled={!form.name.trim() || !form.price.trim() || adding}
        sx={{
          py: 1.5,
          borderRadius: 2,
          fontWeight: 600,
          background: 'linear-gradient(45deg, #5b5bd6, #7c3aed)',
          boxShadow: '0 8px 25px rgba(91, 91, 214, 0.4)',
          '&:hover': {
            transform: 'translateY(-2px)',
            boxShadow: '0 12px 35px rgba(91, 91, 214, 0.5)'
          },
          '&:disabled': {
            background: 'grey.400'
          }
        }}
      >
        {adding ? "Adding..." : "Add Product"}
      </Button>
    </Paper>
  </Grid>

  {/* Products List Card - NO CHANGES */}
  <Grid item xs={12} md={8}>
    <Paper sx={{ 
      p: 4, 
      borderRadius: 3,
      boxShadow: '0 15px 35px rgba(0,0,0,0.1)',
      background: 'linear-gradient(145deg, #f8fafc 0%, #f1f5f9 100%)'
    }}>
      <Typography variant="h5" sx={{ mb: 4, fontWeight: 700, color: '#059669' }}>
        📦 Products List ({products.length})
      </Typography>
      
      {loading ? (
        <Box sx={{ display: 'flex', justifyContent: 'center', py: 8 }}>
          <CircularProgress size={40} thickness={4} />
        </Box>
      ) : products.length === 0 ? (
        <Box sx={{ textAlign: 'center', py: 8, color: 'text.secondary' }}>
          <Typography variant="h6" sx={{ mb: 2 }}>No products found</Typography>
          <Typography variant="body1">Add your first product from the left panel!</Typography>
        </Box>
      ) : (
        <Box sx={{ maxHeight: 500, overflow: 'auto' }}>
          {products.map((product, index) => (
            <Paper
              key={product._id}
              sx={{
                p: 3,
                mb: 2,
                borderRadius: 2,
                background: 'white',
                transition: 'all 0.3s ease',
                border: '1px solid #e2e8f0',
                '&:hover': {
                  transform: 'translateY(-5px)',
                  boxShadow: '0 20px 40px rgba(0,0,0,0.1)',
                  borderColor: '#5b5bd6'
                }
              }}
            >
              <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <Box sx={{ flex: 1 }}>
                  <Typography variant="h6" sx={{ fontWeight: 600, mb: 0.5 }}>
                    {product.name}
                  </Typography>
                  <Chip
                    label={`₨ ${parseFloat(product.price).toLocaleString()}`}
                    color="success"
                    size="small"
                    sx={{
                      fontWeight: 700,
                      background: 'linear-gradient(45deg, #10b981, #059669)',
                      height: 32
                    }}
                  />
                </Box>
                
                <Box sx={{ display: 'flex', gap: 1 }}>
                  <IconButton
                    onClick={() => handleEditOpen(product)}
                    sx={{
                      background: '#dbeafe',
                      color: '#3b82f6',
                      borderRadius: 1.5,
                      '&:hover': {
                        background: '#bfdbfe',
                        transform: 'scale(1.1)'
                      }
                    }}
                  >
                    <Edit />
                  </IconButton>
                  
                  <IconButton
                    onClick={() => handleDelete(product._id)}
                    sx={{
                      background: '#fee2e2',
                      color: '#ef4444',
                      borderRadius: 1.5,
                      '&:hover': {
                        background: '#fecaca',
                        transform: 'scale(1.1)'
                      }
                    }}
                  >
                    <Delete />
                  </IconButton>
                </Box>
              </Box>
            </Paper>
          ))}
        </Box>
      )}
    </Paper>
  </Grid>
</Grid>



      {/* Edit Dialog */}
      <Dialog
        open={edit.open}
        onClose={() => setEdit({ ...edit, open: false })}
        maxWidth="sm"
        fullWidth
        sx={{ '& .MuiDialog-paper': { borderRadius: 3 } }}
      >
        <Paper sx={{
          background: 'linear-gradient(145deg, #f8fafc 0%, #f1f5f9 100%)',
          borderRadius: 3
        }}>
          <DialogTitle sx={{ pb: 1, background: '#f8fafc', borderRadius: '16px 16px 0 0' }}>
            <Typography variant="h5" sx={{ fontWeight: 700, color: '#3b82f6' }}>
              ✏️ Edit Product
            </Typography>
          </DialogTitle>

          <DialogContent sx={{ p: 4 }}>
            <TextField
              fullWidth
              label="Product Name"
              value={edit.name}
              onChange={(e) => setEdit({ ...edit, name: e.target.value })}
              sx={{ mb: 3, '& .MuiOutlinedInput-root': { borderRadius: 2 } }}
            />
            <TextField
              fullWidth
              label="Price (PKR)"
              type="number"
              value={edit.price}
              onChange={(e) => setEdit({ ...edit, price: e.target.value })}
              sx={{ '& .MuiOutlinedInput-root': { borderRadius: 2 } }}
            />
          </DialogContent>

          <DialogActions sx={{ px: 4, pb: 4 }}>
            <Button
              onClick={() => setEdit({ ...edit, open: false })}
              sx={{ borderRadius: 2, px: 3 }}
            >
              Cancel
            </Button>
            <Button
              variant="contained"
              onClick={handleUpdate}
              disabled={!edit.name.trim() || !edit.price.trim()}
              sx={{
                borderRadius: 2,
                px: 4,
                background: 'linear-gradient(45deg, #3b82f6, #1d4ed8)',
                boxShadow: '0 8px 25px rgba(59, 130, 246, 0.4)'
              }}
            >
              Update Product
            </Button>
          </DialogActions>
        </Paper>
      </Dialog>
    </Container>
  );
};

export default Home;
