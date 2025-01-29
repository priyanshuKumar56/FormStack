import React, { useState } from "react";
import {
  IconButton,
  Tooltip,
  Button,
  Drawer,
  List,
  ListItem,
  ListItemText,
  TextField,
  InputAdornment,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import SearchIcon from "@mui/icons-material/Search";
import CloseIcon from "@mui/icons-material/Close";
import PersonIcon from "@mui/icons-material/Person";

const LandingPageHeader = () => {
  const [isDrawerOpen, setDrawerOpen] = useState(false);
  const [searchVisible, setSearchVisible] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

  // Toggle Drawer
  const toggleDrawer = (open) => (event) => {
    if (
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }
    setDrawerOpen(open);
  };

  // Toggle Search Bar
  const toggleSearchBar = () => {
    setSearchVisible(!searchVisible);
  };

  return (
    <header className="flex items-center justify-between px-6 py-4 bg-white shadow-lg w-full">
      {/* Left Section: Logo and Hamburger Menu */}
      <div className="flex items-center">
        {/* Hamburger Menu Icon for Mobile View */}
        <IconButton className="mr-4 md:hidden" onClick={toggleDrawer(true)}>
          <MenuIcon className="text-gray-600" />
        </IconButton>
        {/* Custom Logo */}
        <img
          src="src\assets\forms_2020q4_48dp.png"
          alt="Custom Logo"
          className="h-8"
        />{" "}
        <span class="self-center text-xl font-semibold whitespace-nowrap ">
          FormStack
        </span>
        {/* Replace with your logo */}
      </div>

      {/* Center Section: Search Bar */}
      <div className=" items-center w-full mx-12 max-w-2xl md:flex  hidden">
        <TextField
          fullWidth
          variant="outlined"
          placeholder="Search forms..."
          size="small"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton>
                  <SearchIcon className="text-gray-700 hover:text-blue-600 transition duration-200" />
                </IconButton>
              </InputAdornment>
            ),
            style: {
              borderRadius: "50px",
              backgroundColor: "#f0f3f8", // Changed to white for a cleaner look
              border: "1px solid #d1d5db", // Subtle border color
              boxShadow: "0 2px 10px rgba(0, 0, 0, 0.1)",
              padding: "5px 10px", // Added padding for better spacing
            },
          }}
          className="focus:outline-none focus:ring-2 focus:ring-blue-300 transition duration-200"
        />
      </div>

      {/* Right Section: Profile Icon */}
      <div className="flex items-center">
        {/* Profile Icon */}
        <div className="flex items-center w-full mx-4 md:hidden ">
          {searchVisible ? (
            <TextField
              fullWidth
              variant="outlined"
              placeholder="Search forms..."
              size="small"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton onClick={toggleSearchBar}>
                      <CloseIcon />
                    </IconButton>
                  </InputAdornment>
                ),
                style: {
                  borderRadius: "50px",
                  backgroundColor: "#f5f5f5",
                  boxShadow: "0 2px 8px rgba(0, 0, 0, 0.1)",
                },
              }}
              className="focus:outline-none"
            />
          ) : (
            <IconButton onClick={toggleSearchBar}>
              <SearchIcon className="text-gray-600" />
            </IconButton>
          )}
        </div>
        <Tooltip title="Profile">
          <IconButton className="hover:bg-gray-100 rounded-full shadow-md">
            <PersonIcon className="text-gray-800  " />
          </IconButton>
        </Tooltip>
      </div>

      {/* Drawer Sidebar for Mobile View */}
      <Drawer anchor="left" open={isDrawerOpen} onClose={toggleDrawer(false)}>
        <div
          className="w-64 px-4 py-6"
          role="presentation"
          onClick={toggleDrawer(false)}
          onKeyDown={toggleDrawer(false)}
        >
          {/* Drawer Header */}
          <div className="flex items-center justify-between mb-6">
            <h1 className="text-2xl font-bold text-blue-700">Formify</h1>
            <IconButton onClick={toggleDrawer(false)}>
              <CloseIcon className="text-gray-600" />
            </IconButton>
          </div>

          {/* Search Bar Inside Drawer */}
          <div className="mb-4">
            <TextField
              fullWidth
              variant="outlined"
              placeholder="Search forms..."
              size="small"
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <SearchIcon />
                  </InputAdornment>
                ),
                style: {
                  borderRadius: "50px",
                  backgroundColor: "#f5f5f5",
                  boxShadow: "0 2px 8px rgba(0, 0, 0, 0.1)",
                },
              }}
              className="focus:outline-none"
            />
          </div>

          {/* Navigation Links Inside Drawer */}
          <List>
            <ListItem button>
              <ListItemText primary="Settings" />
            </ListItem>
            <ListItem button>
              <ListItemText primary="Help" />
            </ListItem>
            <ListItem button>
              <ListItemText primary="Privacy" />
            </ListItem>
          </List>
        </div>
      </Drawer>
    </header>
  );
};

export default LandingPageHeader;
