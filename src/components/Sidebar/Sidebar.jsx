import React, { Suspense, useCallback, useEffect, useMemo, useState } from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import { useLocation, useNavigate } from 'react-router-dom';
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
import { getEditorForm, getEditorUpdated } from '../../reducers/GetSlateReducer.js';
import useEditorSave from '../../hook/useEditorSave.js';

// eslint-disable-next-line react-refresh/only-export-components
const LazyLogoImage = React.lazy(() => import('./LogoImage'));

// eslint-disable-next-line react-refresh/only-export-components
const Sidebar = ({ ...props }) => {
  // verifies if routeName is the one active (in browser input)
  const mainSiteUrl = import.meta.env.VITE_MAIN_URL
  const location = useLocation();
  const navigate = useNavigate();

  const [createType, setCreateType] = useState('');
  const [pathName, setPathName] = useState('');

  const submitState = useSelector(getEditorForm);
  console.log("🚀 ~ file: Sidebar.jsx:36 ~ Sidebar ~ submitState:", submitState)
  const editorUpdated = useSelector(state => getEditorUpdated(state, createType))
  const [editorUpdatedState, setEditorUpdatedState] = useState(false);
  const [editorId, setEditorId] = useState();
  console.log("🚀 ~ file: Sidebar.jsx:36 ~ Sidebar ~ editorId:", editorId)

  const isDraft = useSelector((state) => state.getSlateReducer.isDraft)
  const {
    onEditorSave,
    onEditorUpdate
  } = useEditorSave()

  useEffect(() => {
    if (location.pathname.includes('/editorList/new')) {
      setCreateType('add_new')
      setPathName(location.pathname)
      setEditorId('')
      setEditorUpdatedState(editorUpdated)
    } else if (location.pathname.includes('/editorList/update')) {
      setCreateType('update')
      setPathName(location.pathname)
      setEditorId(location.pathname.slice(location.pathname.lastIndexOf('/') + 1))
      setEditorUpdatedState(editorUpdated)
    } else {
      setCreateType('')
      setPathName('')
      setEditorId('')
      setEditorUpdatedState(false)
    }
  }, [location, editorUpdated]);

  const {
    classes,
    color,
    image,
    open,
    handleDrawerToggle
  } = props;
  console.log("🚀 ~ file: Sidebar.jsx:38 ~ Sidebar ~ classes:", classes)

  const activeRoute = useCallback((routeName) => {
    return location.pathname === routeName;
  }, [location.pathname])

  const listItemBuilder = useCallback((routeName, routePath) => {
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
  }, [classes, activeRoute, color])

  const handleNavigation = useCallback((routePath, editorUpdatedState, submitState) => {
    console.log("🚀 ------------------------------------------------------------------🚀")
    console.log("🚀 ~ file: Sidebar.jsx:62 ~ Sidebar ~ editorUpdatedState:", editorUpdatedState)
    console.log("🚀 ~ file: Sidebar.jsx:62 ~ handleNavigation ~ pathName:", pathName)
    console.log("🚀 ~ file: Sidebar.jsx:62 ~ handleNavigation ~ routePath:", routePath)
    console.log("🚀 -------------------------------------------------------------------🚀")

    if (pathName !== routePath) {
      if (!editorUpdatedState) return navigate(routePath)
      const sureToLeave = confirm('有未完成修改，確定要離開？');
      if (sureToLeave) {
        if (pathName.includes('/editorList/new')) {
          onEditorSave(submitState, true)
        } else if (pathName.includes('/editorList/update')) {
          if (isDraft) {
            onEditorUpdate(submitState, editorId, true)
          } else {
            onEditorSave(submitState, true)
          }
        }
        navigate(routePath)
      } else {
        // stay and continue editing
      }
    }
    else {
      navigate(routePath);
    }
  }, [pathName, navigate, onEditorSave, isDraft, onEditorUpdate, editorId])

  const routesOnSideBar = useSelector(getShowOnSideBarRoutes);
  console.log("🚀 ~ file: Sidebar.jsx:22 ~ Sidebar ~ routesOnSideBar:", routesOnSideBar)

  const router = useMemo(() => {
    return <List className={classes.list}>
      {routesOnSideBar.map((route, key) => {
        return (
          <li key={key}
            className={classes.item}>
            <button
              onClick={() => handleNavigation(route.path, editorUpdatedState, submitState)}
              className={classes.button}
            >
              {listItemBuilder(route.name, route.path)}
            </button>
          </li>
        )
      })}
    </List>
  }, [classes, routesOnSideBar, listItemBuilder, handleNavigation, editorUpdatedState, submitState])

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
  }, [classes, mainSiteUrl])

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
      <div className={classes.sidebarWrapper}>{router}</div>
      {image !== undefined ? (
        <div
          className={classes.background}
          style={{ backgroundImage: 'url(' + image + ')' }} />
      ) : null}
    </Drawer>;
  }, [classes, brand, handleDrawerToggle, image, open, router])

  return drawer
};

Sidebar.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(sidebarStyle)(Sidebar);
