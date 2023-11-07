import React, { Suspense, useCallback, useEffect, useMemo, useState } from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import { NavLink, useLocation, useNavigate } from 'react-router-dom';
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
import ErrorBoundary from '../ErrorBoundary/ErrorBoundary.jsx';
import { getEditorUpdated } from '../../reducers/GetSlateReducer.js';

const LazyLogoImage = /* @vite-ignore */React.lazy(() => import('./LogoImage'));

// eslint-disable-next-line react-refresh/only-export-components
const Sidebar = ({ ...props }) => {
  // verifies if routeName is the one active (in browser input)
  const mainSiteUrl = import.meta.env.VITE_MAIN_URL
  const location = useLocation();
  const navigate = useNavigate();

  const [createType, setCreateType] = useState('');
  useEffect(() => {
    if (location.pathname.includes('/editorList/new')) {
      setCreateType('add_new')
    } else if (location.pathname.includes('/editorList/update')) {
      setCreateType('update')
    }
  }, [location]);

  const editorUpdated = useSelector(state => getEditorUpdated(state, createType))
  const [editorUpdatedState, setEditorUpdatedState] = useState(false);
  useEffect(() => {
    setEditorUpdatedState(editorUpdated)
  }, [editorUpdated]);
  const routesOnSideBar = useSelector(getShowOnSideBarRoutes);
  console.log("🚀 ~ file: Sidebar.jsx:22 ~ Sidebar ~ routesOnSideBar:", routesOnSideBar)
  const activeRoute = useCallback((routeName) => {
    return location.pathname === routeName;
  }, [location.pathname])
  const {
    classes,
    color,
    image,
    open,
    handleDrawerToggle
  } = props;
  console.log("🚀 ~ file: Sidebar.jsx:38 ~ Sidebar ~ classes:", classes)

  const item = useCallback((routeName, routePath) => {
    return <ListItem button
      className={classes.itemLink + classNames({
        [' ' + classes[color]]: activeRoute(routePath),
      })}
    >
      <Icon icon='contentPaste' />
      <ListItemText
        primary={routeName}
        className={classNames(classes.itemText, classNames({
          [' ' + classes.whiteFont]: activeRoute(routePath),
        }))}
        disableTypography={true} />
    </ListItem>
  }, [activeRoute, classes, color])

  const handleNavigation = useCallback((routePath, editorUpdatedState) => {
    console.log("🚀 ------------------------------------------------------------------🚀")
    console.log("🚀 ~ file: Sidebar.jsx:62 ~ Sidebar ~ editorUpdatedState:", editorUpdatedState)
    console.log("🚀 ~ file: Sidebar.jsx:62 ~ handleNavigation ~ routePath:", routePath)
    console.log("🚀 -------------------------------------------------------------------🚀")
    if (![
      '/editorList/new',
      '/editorList/update'
    ].some(route => routePath.includes(route))) {
      if (!editorUpdatedState) return navigate(routePath)
      const areYouSureYouWantToLeave = confirm('有未完成修改，確定要離開？');
      if (areYouSureYouWantToLeave) {
        navigate(routePath)
      } else {
        // stay in editor...
      }
    }
    else {
      navigate(routePath);
    }
  }, [])
  const router = useMemo(() => {
    return routesOnSideBar.map((route, key) => {
      return (
        <li key={key}
          className={classes.item}>
          <button
            onClick={() => handleNavigation(route.path, editorUpdatedState)}
            className={classes.button}
          >
            {item(route.name, route.path)}
          </button>
        </li>
      )
    })
  }, [routesOnSideBar, item, editorUpdatedState])

  const links = useMemo(() => {
    return <List className={classes.list}>
      {router}
    </List>
  }, [classes.list, router])

  const brand = useMemo(() => {
    return <div className={classes.logo}>
      <a href={mainSiteUrl} target="_blank" className={classNames(classes.logoLink)}>
        <div className={classes.logoImage}>
          <ErrorBoundary>
            <Suspense fallback={<div>Loading...</div>}>
              <LazyLogoImage className={classes.img} />
            </Suspense>
          </ErrorBoundary>
        </div>
      </a>
    </div>
  }, [classes.img, classes.logo, classes.logoImage, classes.logoLink, mainSiteUrl])


  const drawer = useMemo(() => {
    return <Drawer
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
          style={{ backgroundImage: 'url(' + image + ')' }} />
      ) : null}
    </Drawer>;
  }, [brand, classes.background, classes.drawerPaper, classes.sidebarWrapper, handleDrawerToggle, image, links, open])


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

      {drawer}
    </div>
  );
};

Sidebar.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(sidebarStyle)(Sidebar);
