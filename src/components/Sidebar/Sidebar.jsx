import React, { Suspense } from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import { NavLink, useLocation } from 'react-router-dom';
// @material-ui/core components
import withStyles from '@material-ui/core/styles/withStyles';
import Drawer from '@mui/material/Drawer';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
// import Icon from '@material-ui/core/Icon';
import Icon from '@views/Icons/Icon'
// core components
import sidebarStyle from '@assets/jss/material-dashboard-react/components/sidebarStyle.jsx';
import { useSelector } from "react-redux";
import { getShowOnSideBarRoutes } from "../../reducers/GetConfigReducer.js";

const LazyLogoImage = React.lazy(() => import(`./LogoImage`));

const Sidebar = ({ ...props }) => {
  // verifies if routeName is the one active (in browser input)
  const location = useLocation();
  const routesOnSideBar = useSelector(getShowOnSideBarRoutes);
  console.log("🚀 ~ file: Sidebar.jsx:22 ~ Sidebar ~ routesOnSideBar:", routesOnSideBar)
  function activeRoute(routeName) {
    return location.pathname === routeName;
  }
  const {
    classes,
    color,
    image,
    open,
    handleDrawerToggle
  } = props;

  const router = routesOnSideBar.map((route, key) => {
    const listItemClasses = classNames({
      [' ' + classes[color]]: activeRoute(route.path),
    });
    const whiteFontClasses = classNames({
      [' ' + classes.whiteFont]: activeRoute(route.path),
    });
    return (
      <NavLink
        to={route.path}
        className={({ isActive }) => isActive ? 'active' : ''}
        key={key}
      >
        <ListItem button className={classes.itemLink + listItemClasses}>
          <Icon icon='contentPaste' />
          <ListItemText
            primary={route.name}
            className={classNames(classes.itemText, whiteFontClasses)}
            disableTypography={true}
          />
        </ListItem>
      </NavLink>
    );
  })

  const links = (
    <List className={classes.list}>
      {router}
    </List>
  );
  const mainSiteUrl = import.meta.env.VITE_MAIN_URL
  const brand = (
    <div className={classes.logo}>
      <a href={mainSiteUrl} target="_blank" className={classNames(classes.logoLink)}>
        <div className={classes.logoImage}>
          <Suspense fallback={<div>Loading...</div>}>
            <LazyLogoImage className={classes.img} />
          </Suspense>
        </div>
      </a>
    </div>
  );
  return (
    <div>
      {/* <Drawer
        variant='temporary'
        anchor={'right'}
        open={props.open}
        classes={{
          paper: classNames(classes.drawerPaper),
        }}
        onClose={props.handleDrawerToggle}
        ModalProps={{
          keepMounted: true, // Better open performance on mobile.
        }}
        sx={{ display: { md: 'none', xs: 'block' } }}
      >
        {brand}
        <div className={classes.sidebarWrapper}>
          <AdminNavbarLinks />
          {links}
        </div>
        {image !== undefined ? (
          <div
            className={classes.background}
            style={{ backgroundImage: 'url(' + image + ')' }}
          />
        ) : null}
      </Drawer> */}

      <Drawer
        anchor={'left'}
        variant='persistent'
        hideBackdrop
        open={open}
        classes={{
          paper: classNames(classes.drawerPaper),
        }}
        onClose={handleDrawerToggle}
      >
        {brand}
        <div className={classes.sidebarWrapper}>{links}</div>
        {image !== undefined ? (
          <div
            className={classes.background}
            style={{ backgroundImage: 'url(' + image + ')' }}
          />
        ) : null}

      </Drawer>
    </div>
  );
};

Sidebar.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(sidebarStyle)(Sidebar);
