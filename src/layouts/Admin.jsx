/* eslint-disable */
import React, { useState, useEffect, useRef } from 'react';
import { useLocation } from 'react-router-dom';
// creates a beautiful scrollbar
// @mui/material components
import withStyles from "@material-ui/core/styles/withStyles";
// core components
import Navbar from '@components/Navbars/Navbar.jsx';
import Sidebar from '@components/Sidebar/Sidebar.jsx';
import dashboardStyle from '@assets/jss/material-dashboard-react/layouts/dashboardStyle.jsx';


import image from '@assets/img/sidebar-1.jpg';
import { Outlet } from 'react-router-dom';

import { useDispatch, useSelector } from 'react-redux';

import * as GetClassAction from "@actions/GetClassAction.js";
import * as GetTagsAction from "@actions/GetTagsAction.js";
import useResetEditorState from '../hook/useResetEditorState';
import * as GetConfigAction from "@actions/GetConfigAction.js";


const myContainerStyle = {
  position: 'relative',
  marginTop: '74px',
  maxHeight: 'calc(100vh - 74px)',
}

function Admin({ ...props }) {

  const sidebarOpen = useSelector((state) => state.getConfigReducer.sidebarOpen);
  const { classes, ...rest } = props;
  const color = "orange";

  const mainPanel = useRef(null);
  const location = useLocation()
  const dispatch = new useDispatch();

  useResetEditorState(location.pathname)

  const handleDrawerToggle = () => {
    dispatch({ type: GetConfigAction.TOGGLE_SIDEBAR_OPEN });
  };
  function getRoute() {
    return props.location && props.location.pathname !== '/admin/maps';
  }

  const getAgentPlatform = () => {
    return navigator
      ? navigator.userAgentData
        ? navigator.userAgentData.platform
        : navigator.platform
      : 'unknown';
  };

  useEffect(() => {
    dispatch({ type: GetClassAction.REQUEST_CLASS_LIST });
    dispatch({ type: GetTagsAction.REQUEST_TAG })
  }, [location.pathname]);

  useEffect(() => {

    if (mainPanel.current === null) {
      //componentDidMount
    } else {
    }
    return () => {
      //componentWillUnmount
    };
  }, []);
  return (
    <>
      <div className={classes.wrapper}>
        <Sidebar
          image={image}
          handleDrawerToggle={handleDrawerToggle}
          open={sidebarOpen}
          color={color}
          {...rest}
        />
        <div className={`${classes.mainPanel} ${sidebarOpen ? '' : 'main-panel-max-size'}`} ref={mainPanel}>
          <Navbar
            handleDrawerToggle={handleDrawerToggle}
            color={color}
            {...rest}
          />
          {/* On the /maps route we want the map to be on full screen - this is not possible if the content and conatiner classes are present because they have some paddings which would make the map smaller */}
          <div style={myContainerStyle} className={`${classes.content}`}>
            <div className={classes.container} style={{ overflow: 'hidden' }}>
              <Outlet />
            </div>
          </div>
          {/* <Footer /> */}
        </div>
      </div>
    </>
  );
}

// Dashboard.propTypes = {
//   classes: PropTypes.object.isRequired,
// };
export default withStyles(dashboardStyle)(Admin);
