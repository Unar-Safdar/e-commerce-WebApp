import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  Box,
  IconButton,
  Drawer,
  List,
  ListItem,
  ListItemText
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import { NavLink, useNavigate } from "react-router-dom";
import { useState } from "react";

const Navbar = () => {
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/");
  };

  const linkStyle = ({ isActive }) => ({
    color: "#fff",
    textDecoration: "none",
    fontWeight: isActive ? "bold" : "normal",
    borderBottom: isActive ? "2px solid #fff" : "none",
    paddingBottom: "4px"
  });

  const menuItems = [
    { text: "Home", path: "/home" },
    { text: "Add Product", path: "/addproduct" }
  ];

  return (
    <>
      <AppBar position="static" sx={{ background: "#1976d2" }}>
        <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
          
          {/* LOGO */}
          <Typography variant="h6" sx={{ fontWeight: "bold" }}>
            Admin Panel
          </Typography>

          {/* DESKTOP MENU */}
          <Box sx={{ display: { xs: "none", md: "flex" }, gap: 3 }}>
            {menuItems.map((item) => (
              <NavLink key={item.path} to={item.path} style={linkStyle}>
                {item.text}
              </NavLink>
            ))}
            <Button color="inherit" onClick={handleLogout}>
              Logout
            </Button>
          </Box>

          {/* MOBILE MENU ICON */}
          <IconButton
            color="inherit"
            sx={{ display: { xs: "block", md: "none" } }}
            onClick={() => setOpen(true)}
          >
            <MenuIcon />
          </IconButton>
        </Toolbar>
      </AppBar>

      {/* MOBILE DRAWER */}
      <Drawer anchor="right" open={open} onClose={() => setOpen(false)}>
        <Box sx={{ width: 220 }}>
          <List>
            {menuItems.map((item) => (
              <ListItem
                button
                key={item.path}
                component={NavLink}
                to={item.path}
                onClick={() => setOpen(false)}
              >
                <ListItemText primary={item.text} />
              </ListItem>
            ))}
            <ListItem button onClick={handleLogout}>
              <ListItemText primary="Logout" />
            </ListItem>
          </List>
        </Box>
      </Drawer>
    </>
  );
};

export default Navbar;