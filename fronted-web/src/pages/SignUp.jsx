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
import { PersonAdd, Email, Lock } from "@mui/icons-material";
import { useState } from "react";
import { signup } from "../services/auth"; // ✅ IMPORTANT

const Signup = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState({ firstName: "", email: "", password: "" });
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => 
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      await signup(form.firstName, form.email, form.password, "user");
      setOpen(true);
      setTimeout(() => navigate("/"), 1500);
    } catch (err) {
      alert("Signup Failed: " + (err.response?.data?.message || err.message));
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container 
      maxWidth="sm"
      sx={{ 
        minHeight: "100vh",
        position: "relative",
        display: "flex",
        alignItems: "center",
        justifyContent: "center"
      }}
    >
      {/* Background */}
      <Box
        sx={{
          position: "fixed",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: "linear-gradient(135deg, #667eea 0%, #764ba2 50%, #f093fb 100%)",
          zIndex: -1
        }}
      />

      <Fade in timeout={800}>
        <Paper
          sx={{
            p: 5,
            width: "100%",
            borderRadius: 4,
            background: "rgba(255,255,255,0.95)"
          }}
        >
          <Box sx={{ textAlign: "center", mb: 4 }}>
            <Avatar sx={{ mx: "auto", mb: 2 }}>
              <PersonAdd />
            </Avatar>
            <Typography variant="h4" fontWeight="bold">
              Create Account
            </Typography>
          </Box>

          <Box component="form" onSubmit={handleSubmit}>
            <TextField
              fullWidth
              label="First Name"
              name="firstName"
              value={form.firstName}
              onChange={handleChange}
              sx={{ mb: 3 }}
            />

            <TextField
              fullWidth
              label="Email"
              name="email"
              value={form.email}
              onChange={handleChange}
              sx={{ mb: 3 }}
            />

            <TextField
              fullWidth
              label="Password"
              type="password"
              name="password"
              value={form.password}
              onChange={handleChange}
              sx={{ mb: 4 }}
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
                  Signing up...
                </>
              ) : (
                "Create Account"
              )}
            </Button>
          </Box>

          <Divider sx={{ my: 3 }} />

          <Typography textAlign="center">
            Already have an account?{" "}
            <Link to="/">Sign In</Link>
          </Typography>
        </Paper>
      </Fade>

      <Snackbar open={open} autoHideDuration={3000}>
        <Alert severity="success">
          Signup Successful!
        </Alert>
      </Snackbar>
    </Container>
  );
};

export default Signup;
