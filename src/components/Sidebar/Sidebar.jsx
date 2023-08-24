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
import Icon from '@material-ui/core/Icon';
// core components
import sidebarStyle from '@assets/jss/material-dashboard-react/components/sidebarStyle.jsx';

const LazyLogoImage = React.lazy(() => import(`./LogoImage`));

const Sidebar = ({ ...props }) => {
  // verifies if routeName is the one active (in browser input)
  const location = useLocation();

  function activeRoute(routeName) {
    return location.pathname === routeName;
  }
  const {
    classes,
    color,
    image,
    open,
    routes,
    handleDrawerToggle
  } = props;
  const links = (
    <List className={classes.list}>
      {routes.map((prop, key) => {
        var listItemClasses;
        listItemClasses = classNames({
          [' ' + classes[color]]: activeRoute(prop.layout + prop.path),
        });
        const whiteFontClasses = classNames({
          [' ' + classes.whiteFont]: activeRoute(prop.layout + prop.path),
        });
        const classItemHide = prop.hide === true ? classes.itemHide : classes.item;
        return (
          <NavLink
            to={prop.layout + prop.path}
            className={({ isActive }) => isActive ? `active ${classItemHide}` : classItemHide}
            key={key}
          >
            <ListItem button className={classes.itemLink + listItemClasses}>
              <Icon className={classNames(classes.itemIcon, whiteFontClasses)}>
                {prop.icon}
              </Icon>
              <ListItemText
                primary={prop.name}
                className={classNames(classes.itemText, whiteFontClasses)}
                disableTypography={true}
              />
            </ListItem>
          </NavLink>
        );
      })}
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
