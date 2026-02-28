// src/components/Contact.jsx
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
import { Person, Email, Message } from "@mui/icons-material";
import { useState } from "react";
import {sendMail} from "../services/mailSend.js"

const Contact = () => {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

const handleSubmit = async (e) => {
  e.preventDefault();
  setLoading(true);

  try {
    const res = await sendMail(form.name, form.email, form.message);
    console.log("Mail RESPONSE =>", res);

    // ✅ Check if backend responded with success
    if (res?.success) {
      // Show success Snackbar
      setOpen(true);
      // Reset the form
      setForm({ name: "", email: "", message: "" });
    } else {
      // Show failure alert
      alert(res.message || "Failed to send message");
    }

  } catch (err) {
    alert("Mail Send Failed: " + (err.message || "Unknown error"));
  } finally {
    setLoading(false);
  }
};

 

  return (
    <Container
      maxWidth="sm"
      sx={{
        minHeight: '100vh',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        position: 'relative',
        py: 4,
      }}
    >
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
            maxWidth: 500,
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
            Contact Us
          </Typography>
          <Typography variant="body1" sx={{ color: 'text.secondary', mb: 3, textAlign: 'center' }}>
            Send us your issue and our admin will respond soon.
          </Typography>

          <Box component="form" onSubmit={handleSubmit} sx={{ width: '100%' }}>
            <TextField
              fullWidth
              label="Your Name"
              name="name"
              value={form.name}
              onChange={handleChange}
              required
              sx={{ mb: 2 }}
              InputProps={{
                startAdornment: <Person sx={{ mr: 1, color: 'grey.500', fontSize: 20 }} />
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
              sx={{ mb: 2 }}
              InputProps={{
                startAdornment: <Email sx={{ mr: 1, color: 'grey.500', fontSize: 20 }} />
              }}
            />
            <TextField
              fullWidth
              label="Describe Your Issue"
              name="message"
              value={form.message}
              onChange={handleChange}
              required
              multiline
              rows={4}
              sx={{ mb: 3 }}
              InputProps={{
                startAdornment: <Message sx={{ mr: 1, color: 'grey.500', fontSize: 20 }} />
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
              {loading ? <CircularProgress size={24} sx={{ color: 'white' }} /> : "Send Issue"}
            </Button>
          </Box>
        </Paper>
      </Fade>

      <Snackbar
        open={open}
        autoHideDuration={4000}
        onClose={() => setOpen(false)}
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
      >
        <Alert severity="success" onClose={() => setOpen(false)}>
          🎉 Your message has been sent! Admin will check it soon.
        </Alert>
      </Snackbar>
    </Container>
  );
};

export default Contact;