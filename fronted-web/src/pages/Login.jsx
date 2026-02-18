// src/components/Login.jsx
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
  CircularProgress
} from "@mui/material";
import { useNavigate, Link } from "react-router-dom";
import { Person, Email, Lock } from "@mui/icons-material";
import { useState } from "react";
import { login } from "../services/logIn"; 

const Login = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState({ email: "", password: "" });
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await login(form.email, form.password);
      if (res?.user?.token) {
        setOpen(true);
        setTimeout(() => navigate("/home"), 1500);
      } else {
        alert(res.message || "Login failed");
      }
    } catch (err) {
      alert("Login Failed: " + (err.message || "Unknown error"));
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container 
      maxWidth="lg"
      sx={{
        minHeight: '100vh',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        position: 'relative',
        py: 4,
      }}
    >
      {/* Background Gradient */}
      <Box
        sx={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: 'linear-gradient(135deg, #667eea 0%, #764ba2 50%, #f093fb 100%)',
          zIndex: -1
        }}
      />

      <Fade in timeout={1000}>
        <Paper
          elevation={24}
          sx={{
            width: '100%',
            maxWidth: 450,
            borderRadius: 4,
            background: 'rgba(255,255,255,0.95)',
            backdropFilter: 'blur(15px)',
            py: 4,
            px: 4,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            overflow: 'hidden',
          }}
        >
          {/* Avatar & Header */}
          <Avatar
            sx={{
              mx: 'auto',
              mb: 2,
              width: 80,
              height: 80,
              background: 'linear-gradient(45deg, #667eea, #764ba2)',
              boxShadow: '0 10px 30px rgba(102, 126, 234, 0.4)'
            }}
          >
            <Person sx={{ fontSize: 40 }} />
          </Avatar>

          <Typography variant="h4" sx={{ fontWeight: 700, mb: 1 }}>
            Sign In
          </Typography>
          <Typography variant="body1" sx={{ color: 'text.secondary', mb: 3, textAlign: 'center' }}>
            Welcome back! Enter your credentials to access your account.
          </Typography>

          {/* Form */}
          <Box component="form" onSubmit={handleSubmit} sx={{ width: '100%' }}>
            <TextField
              fullWidth
              label="Email Address"
              name="email"
              type="email"
              value={form.email}
              onChange={handleChange}
              required
              sx={{ mb: 2 }}
              InputProps={{
                startAdornment: <Email sx={{ mr: 1, color: 'grey.500', fontSize: 20 }} />
              }}
            />
            <TextField
              fullWidth
              label="Password"
              name="password"
              type="password"
              value={form.password}
              onChange={handleChange}
              required
              sx={{ mb: 3 }}
              InputProps={{
                startAdornment: <Lock sx={{ mr: 1, color: 'grey.500', fontSize: 20 }} />
              }}
            />

            <Button
              fullWidth
              type="submit"
              variant="contained"
              disabled={loading}
              sx={{
                py: 1.8,
                borderRadius: 3,
                fontSize: '1rem',
                fontWeight: 600,
                background: 'linear-gradient(45deg, #667eea 30%, #764ba2 90%)',
                boxShadow: '0 10px 25px rgba(102,126,234,0.4)',
                '&:hover': {
                  transform: 'translateY(-2px)',
                  boxShadow: '0 15px 35px rgba(102,126,234,0.5)',
                  background: 'linear-gradient(45deg, #5a67d8 30%, #6b46c1 90%)'
                }
              }}
            >
              {loading ? <CircularProgress size={24} sx={{ color: 'white' }} /> : "Login"}
            </Button>
          </Box>

          {/* Divider & Signup Link */}
          <Divider sx={{ my: 3, width: '100%', backgroundColor: 'grey.300' }} />
          <Typography variant="body1" sx={{ mb: 1 }}>
            Don't have an account?
          </Typography>
          <Button
            component={Link}
            to="/signup"
            variant="text"
            sx={{
              fontWeight: 600,
              fontSize: '1rem',
              color: '#667eea',
              textTransform: 'none',
              '&:hover': { color: '#764ba2', textDecoration: 'underline' }
            }}
          >
            Sign Up Here
          </Button>
        </Paper>
      </Fade>

      {/* Success Snackbar */}
      <Snackbar 
        open={open} 
        autoHideDuration={3000}
        onClose={() => setOpen(false)}
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
      >
        <Alert severity="success" onClose={() => setOpen(false)}>
          🎉 Login Successful! Redirecting...
        </Alert>
      </Snackbar>
    </Container>
  );
};

export default Login;
