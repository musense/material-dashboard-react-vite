import React from "react";
import classNames from "classnames";
import PropTypes from "prop-types";
import withStyles from "@material-ui/core/styles/withStyles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import IconButton from "@material-ui/core/IconButton";
import Menu from "@material-ui/icons/Menu";
import AdminNavbarLinks from "./AdminNavbarLinks.jsx";
import Button from "@components/CustomButtons/Button.jsx";
import headerStyle from "@assets/jss/material-dashboard-react/components/headerStyle.jsx";
import { useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import { getSelectedRoutesKeys } from "../../reducers/GetConfigReducer.js";

function Header({ ...props }) {
  const routesWithPath = useSelector(getSelectedRoutesKeys);
  const location = useLocation()
  function makeBrand() {
    let name;
    routesWithPath.map(route => {
      if (route.path === location.pathname) {
        name = route.name;
      }
    })
    return name;
  }
  const { classes, color } = props;
  const appBarClasses = classNames({
    [" " + classes[color]]: color,
  });
  return (
    <AppBar className={classes.appBar + appBarClasses}>
      <Toolbar className={classes.container}>
        <div className={classes.flex} style={{ flex: 1, marginRight: 'auto' }}>
          {/* Here we create navbar brand, based on route name */}
          <Button color="transparent" href="#" className={classes.title}>
            {makeBrand()}
          </Button>
        </div>
        <AdminNavbarLinks {...props} />
        <IconButton
          color="inherit"
          aria-label="open drawer"
          title="開啟/關閉選單"
          onClick={props.handleDrawerToggle}
        >
          <Menu />
        </IconButton>
      </Toolbar>
    </AppBar>
  );
}

Header.propTypes = {
  classes: PropTypes.object.isRequired,
  color: PropTypes.oneOf(["purple", "blue", "green", "orange", "red"]),
};

export default withStyles(headerStyle)(Header);
