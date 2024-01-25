import React, { Suspense, useCallback, useEffect } from 'react';
import PropTypes from 'prop-types';
// import { Routes, Route } from 'react-router-dom';

// @material-ui/core components
import withStyles from '@material-ui/core/styles/withStyles';

// core components
import AuthNavbar from '@components/Navbars/AuthNavbar.jsx';
import pagesStyle from '@assets/jss/material-dashboard-react/layouts/authStyle.jsx';
// import register from '@assets/img/register.jpeg';
// import login from '../assets/img/login.jpeg';
import { Outlet, useLocation } from 'react-router-dom';
import useRefreshStayCurrentPage from '@hook/useRefreshStayCurrentPage';
import { useSelector } from "react-redux";
import { getAuthRoutes } from "../reducers/GetConfigReducer.js";
import Loading from '@components/Loading/Loading';

function Auth({ ...props }) {
  useRefreshStayCurrentPage()
  const {
    classes,
    ...rest
  } = props;

  const location = useLocation();
  const authRoutes = useSelector(getAuthRoutes);
  useEffect(() => {
    document.body.style.overflow = 'unset';
  }, []);

  const authType = () => {
    if (location.pathname.indexOf('/register') !== -1) {
      return 'register';
    } else if (location.pathname.indexOf('/login') !== -1) {
      return 'login';
    }
  };

  const getActiveRoute = useCallback((routes) => {
    let activeRoute = import.meta.env.VITE_LOGO_TEXT;

    for (let i = 0; i < routes.length; i++) {
      if (location.pathname.indexOf(routes[i].path) !== -1) {
        return routes[i].name;
      }
    }
    return activeRoute;
  }, [location.pathname]);
  return (
    <div>
      <AuthNavbar brandText={getActiveRoute(authRoutes)} {...rest} />
      <div className={classes.wrapper}>
        <div
          className={`${classes.fullPage} ${classes[authType()]}`}
        >
          <Suspense fallback={<Loading />}>
            <Outlet />
          </Suspense>
        </div>
      </div>
    </div>
  );
}

Auth.propTypes = {
  classes: PropTypes.object.isRequired,
};

Auth.displayName = 'Auth';

export default withStyles(pagesStyle)(Auth);
