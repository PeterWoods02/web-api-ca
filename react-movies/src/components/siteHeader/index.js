import React, { useState, useEffect, useContext } from "react";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Menu from "@mui/material/Menu";
import { useNavigate } from "react-router-dom";
import { styled } from "@mui/material/styles";
import AccountCircle from "@mui/icons-material/AccountCircle"; // Profile icon
import { useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery"; // Media query for responsive design
import { AuthContext } from "../../contexts/authContext"; // Import AuthContext

const Offset = styled("div")(({ theme }) => theme.mixins.toolbar);

const SiteHeader = () => {
  const { isAuthenticated, signout, userName } = useContext(AuthContext); // Access context
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  const navigate = useNavigate();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md")); // Check if the screen size is small

  const menuOptions = [
    { label: "Home", path: "/movies/home" },
    { label: "Favorites", path: "/movies/favorites" },
    { label: "Upcoming", path: "/movies/upcoming" },
    { label: "Top Rated", path: "/movies/topRated" },
    { label: "Trending", path: "/movies/trending" },
    { label: "All", path: "/movies/all" },
  ];

  const handleMenuSelect = (pageURL) => {
    navigate(pageURL, { replace: true });
  };

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  // Function to handle login icon click
  const handleLoginClick = () => {
    navigate("/movies/homePageLogIn"); 
  };

  // Handle logout
  const handleLogout = () => {
    signout(); 
    navigate("/movies/homePageLogIn"); 
  };

  return (
    <>
      <AppBar position="fixed" color="secondary">
        <Toolbar>
          {/* Render profile icon or login link */}
          {isAuthenticated ? (
            <IconButton
              color="inherit"
              onClick={() => navigate("/movies/profilePage")} // Navigate to profile page
              aria-label="profile"
            >
              <AccountCircle sx={{ fontSize: 30 }} />
            </IconButton>
          ) : (
            <Typography
              variant="h6"
              color="inherit"
              sx={{ cursor: "pointer" }}
              onClick={handleLoginClick}
            >
              Log In / Sign Up
            </Typography>
          )}

          {/* Main Title */}
          <Typography variant="h4" sx={{ flexGrow: 1 }}>
            TMDB Client
          </Typography>

          {/* Render menu for larger screens, else render hamburger menu */}
          {!isMobile ? (
            // Show all menu items for large screens
            menuOptions.map((opt) => (
              <IconButton
                key={opt.label}
                color="inherit"
                onClick={() => handleMenuSelect(opt.path)}
              >
                {opt.label}
              </IconButton>
            ))
          ) : (
            // Show hamburger menu for small screens
            <>
              <IconButton
                aria-label="menu"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={handleMenu}
                color="inherit"
              >
                <MenuIcon />
              </IconButton>
              <Menu
                id="menu-appbar"
                anchorEl={anchorEl}
                anchorOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                keepMounted
                transformOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                open={open}
                onClose={() => setAnchorEl(null)}
              >
                {menuOptions.map((opt) => (
                  <MenuItem
                    key={opt.label}
                    onClick={() => handleMenuSelect(opt.path)}
                  >
                    {opt.label}
                  </MenuItem>
                ))}
              </Menu>
            </>
          )}

          {/* logout for logged in users */}
          {isAuthenticated && (
            <IconButton onClick={handleLogout} color="inherit">
              Log Out
            </IconButton>
          )}
        </Toolbar>
      </AppBar>
      <Offset />
    </>
  );
};

export default SiteHeader;
