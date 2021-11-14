import React, { useContext } from "react";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import Avatar from "@material-ui/core/Avatar";
import { Authcontext } from "../context/auth-context";
import { Link } from "react-router-dom";

export default function SimpleMenu() {
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const auth = useContext(Authcontext);
  const logout = () => {
    auth.logout();
  };

  return (
    <div>
      <Avatar
        alt=""
        src={`http://localhost:5000/${auth.user.image && auth.user.image}`}
        onClick={handleClick}
      />
      <Menu
        id="simple-menu"
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
        <Link to="/update-profile">
          <MenuItem onClick={handleClose}>Profile</MenuItem>
        </Link>
        <Link to="/ajout">
          {" "}
          <MenuItem onClick={handleClose}>Ajout Offre</MenuItem>
        </Link>

        <Link to="/offre">
          {" "}
          <MenuItem onClick={handleClose}>Mes Offre</MenuItem>
        </Link>

        <MenuItem onClick={logout}>Logout</MenuItem>
      </Menu>
    </div>
  );
}
