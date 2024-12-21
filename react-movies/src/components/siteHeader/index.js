import React, { useState, useEffect } from "react";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Menu from "@mui/material/Menu";
import { useNavigate } from "react-router-dom";
import { styled } from "@mui/material/styles";
import AccountCircle from "@mui/icons-material/AccountCircle"; // Import the login icon
import { useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery"; // Import to handle media queries

const Offset = styled("div")(({ theme }) => theme.mixins.toolbar);

const SiteHeader = () => {
  const [anchorEl, setAnchorEl] = useState(null);
  const [user, setUser] = useState(null);
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
    navigate("/movies/homePageLogIn"); // Navigate to the login page
  };


  //check auth
  useEffect(() => {
    const auth = getAuth();
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      if (currentUser) {
        setUser(currentUser); // Set user if logged in
      } else {
        setUser(null); // Set to null if logged out
      }
    });
    return () => unsubscribe(); 
  }, []);

  return (
    <>
      <AppBar position="fixed" color="secondary">
        <Toolbar>
        
          {user ? (
            <IconButton
              color="inherit"
              onClick={() => navigate("/movies/profilePage")} // Navigate to profile page (if any)
              aria-label="profile"
            >
            <AccountCircle sx={{ fontSize: 30 }} />   </IconButton>
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
        </Toolbar>
      </AppBar>
      <Offset />
    </>
  );
};

export default SiteHeader;
