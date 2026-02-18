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
  Avatar
} from "@mui/material";
import { useNavigate, Link } from "react-router-dom";
import { PersonAdd, Email, Lock } from "@mui/icons-material";
import { useState } from "react";

const Signup = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState({ firstName: "", email: "", password: "" });
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    
    try {
      console.log("📤 Sending:", { firstName: form.firstName, email: form.email });
      await signup(form.firstName, "", form.email, form.password, "user");
      console.log("✅ Signup successful!");
      setOpen(true);
      setTimeout(() => navigate("/"), 1500);
    } catch (err) {
      console.error("❌ Signup error:", err);
      alert("Signup Failed: " + (err.message || "Unknown error"));
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container maxWidth="sm lg xl" sx={{ py: 8, minHeight: '100%' }}>
      {/* Background Pattern */}
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
            p: { xs: 4, md: 6 },
            mx: { xs: 2, md: 'auto' },
            maxWidth: 450,
            borderRadius: 4,
            background: 'rgba(255, 255, 255, 0.95)',
            backdropFilter: 'blur(20px)',
            boxShadow: '0 25px 50px rgba(0,0,0,0.2)',
            position: 'relative',
            overflow: 'hidden',
            '&::before': {
              content: '""',
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0,
              height: 4,
              background: 'linear-gradient(90deg, #667eea, #764ba2, #f093fb)'
            }
          }}
        >
          {/* Header */}
          <Box sx={{ textAlign: 'center', mb: 4 }}>
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
              <PersonAdd sx={{ fontSize: 40 }} />
            </Avatar>
            
            <Typography 
              variant="h3" 
              sx={{ 
                fontWeight: 800, 
                background: 'linear-gradient(45deg, #333, #666)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                mb: 1
              }}
            >
              Create Account
            </Typography>
            
            <Typography 
              variant="body1" 
              sx={{ 
                color: 'text.secondary', 
                fontSize: '1.1rem',
                maxWidth: 300
              }}
            >
              Join us today and start managing your products!
            </Typography>
          </Box>

          {/* Form */}
          <Box component="form" onSubmit={handleSubmit} sx={{ mt: 2 }}>
            <TextField
              fullWidth
              label="First Name"
              name="firstName"
              type="text"
              value={form.firstName}
              onChange={handleChange}
              required
              sx={{ 
                mb: 3,
                '& .MuiOutlinedInput-root': {
                  borderRadius: 3,
                  backgroundColor: 'rgba(255, 255, 255, 0.8)',
                  transition: 'all 0.3s ease',
                  '&:hover': {
                    boxShadow: '0 5px 15px rgba(0,0,0,0.1)',
                    transform: 'translateY(-2px)'
                  },
                  '&.Mui-focused': {
                    boxShadow: '0 10px 25px rgba(102, 126, 234, 0.3)',
                    '& .MuiOutlinedInput-notchedOutline': {
                      borderColor: '#667eea'
                    }
                  }
                }
              }}
              InputProps={{
                startAdornment: <PersonAdd sx={{ mr: 1, color: 'grey.500', fontSize: 20 }} />
              }}
            />

            <TextField
              fullWidth
              label="Email Address"
              name="email"
              type="email"
              value={form.email}
              onChange={handleChange}
              required
              sx={{ 
                mb: 3,
                '& .MuiOutlinedInput-root': {
                  borderRadius: 3,
                  backgroundColor: 'rgba(255, 255, 255, 0.8)',
                  transition: 'all 0.3s ease',
                  '&:hover': {
                    boxShadow: '0 5px 15px rgba(0,0,0,0.1)',
                    transform: 'translateY(-2px)'
                  },
                  '&.Mui-focused': {
                    boxShadow: '0 10px 25px rgba(102, 126, 234, 0.3)',
                    '& .MuiOutlinedInput-notchedOutline': {
                      borderColor: '#667eea'
                    }
                  }
                }
              }}
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
              sx={{ 
                mb: 4,
                '& .MuiOutlinedInput-root': {
                  borderRadius: 3,
                  backgroundColor: 'rgba(255, 255, 255, 0.8)',
                  transition: 'all 0.3s ease',
                  '&:hover': {
                    boxShadow: '0 5px 15px rgba(0,0,0,0.1)',
                    transform: 'translateY(-2px)'
                  },
                  '&.Mui-focused': {
                    boxShadow: '0 10px 25px rgba(102, 126, 234, 0.3)',
                    '& .MuiOutlinedInput-notchedOutline': {
                      borderColor: '#667eea'
                    }
                  }
                }
              }}
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
                py: 2,
                borderRadius: 3,
                fontSize: '1.1rem',
                fontWeight: 700,
                background: 'linear-gradient(45deg, #667eea 30%, #764ba2 90%)',
                boxShadow: '0 10px 30px rgba(102, 126, 234, 0.4)',
                transition: 'all 0.3s ease',
                '&:hover': {
                  transform: 'translateY(-3px)',
                  boxShadow: '0 15px 40px rgba(102, 126, 234, 0.5)',
                  background: 'linear-gradient(45deg, #5a67d8 30%, #6b46c1 90%)'
                },
                '&:disabled': {
                  background: 'grey.400',
                  transform: 'none',
                  boxShadow: 'none'
                }
              }}
            >
              {loading ? (
                <>
                  <CircularProgress size={24} sx={{ mr: 1 }} color="inherit" />
                  Signing up...
                </>
              ) : (
                "Create Account"
              )}
            </Button>
          </Box>

          {/* Divider */}
          <Divider sx={{ my: 4, backgroundColor: 'grey.300' }} />

          {/* Login Link */}
          <Box sx={{ textAlign: 'center' }}>
            <Typography variant="body1" sx={{ color: 'text.secondary', mb: 1 }}>
              Already have an account?
            </Typography>
            <Button
              component={Link}
              to="/"
              variant="text"
              sx={{
                fontWeight: 600,
                fontSize: '1.1rem',
                color: '#667eea',
                textTransform: 'none',
                '&:hover': {
                  color: '#764ba2',
                  textDecoration: 'underline'
                }
              }}
            >
              Sign In Here
            </Button>
          </Box>
        </Paper>
      </Fade>

      {/* Success Snackbar */}
      <Snackbar 
        open={open} 
        autoHideDuration={3000}
        onClose={() => setOpen(false)}
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
        sx={{ mt: 2 }}
      >
        <Alert 
          severity="success" 
          onClose={() => setOpen(false)}
          sx={{
            background: 'linear-gradient(45deg, #667eea, #764ba2)',
            color: 'white',
            '& .MuiAlert-icon': {
              color: 'white'
            }
          }}
        >
          🎉 Signup Successful! Redirecting...
        </Alert>
      </Snackbar>
    </Container>
  );
};

export default Signup;
