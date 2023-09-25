import cx from 'classnames';
import PropTypes from 'prop-types';
import React, { useCallback, useMemo } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import AppBar from '@material-ui/core/AppBar';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import withStyles from '@material-ui/core/styles/withStyles';
import Toolbar from '@material-ui/core/Toolbar';
import Fingerprint from '@material-ui/icons/Fingerprint';
import PersonAdd from '@material-ui/icons/PersonAdd';
import Button from '@components/CustomButtons/Button';
import authNavbarStyle from '@assets/jss/material-dashboard-react/components/authNavbarStyle.jsx';

// eslint-disable-next-line react-refresh/only-export-components
function AuthNavbar(props) {
  const { classes, brandText } = props;
  console.log("🚀 ~ file: AuthNavbar.jsx:21 ~ AuthNavbar ~ props:", props)
  const location = useLocation();

  // verifies if routeName is the one active (in browser input)
  const activeRoute = useCallback((routeName) => {
    return location.pathname.indexOf(routeName) > -1 ? true : false;
  }, [location.pathname]);

  const brandTextButton = useMemo(() =>
    <Button href='#' className={classes.title} color='transparent'>
      {brandText}
    </Button>, [brandText, classes.title])

  const authLink = useCallback((route) => {
    return <NavLink
      to={`/${route}`}
      className={cx(classes.navLink, {
        [classes.navLinkActive]: activeRoute(`/${route}`),
      })}
    >
      {
        route === 'login'
          ? <Fingerprint className={classes.listItemIcon} />
          : <PersonAdd className={classes.listItemIcon} />
      }
      <ListItemText
        primary={route}
        disableTypography={true}
        className={classes.listItemText} />
    </NavLink>
  }, [activeRoute, classes.listItemIcon, classes.listItemText, classes.navLink, classes.navLinkActive])

  const list = useMemo(() => (
    <List className={classes.list}>
      {
        [
          'register',
          'login',
        ].map((route) => {
          return <ListItem className={classes.listItem} key={route}>
            {authLink(route)}
          </ListItem>
        })
      }
    </List>
  ), [authLink, classes.list, classes.listItem]);

  const toolbar = useMemo(() => {
    return <Toolbar className={classes.container}>
      <div className={classes.flex}>
        {brandTextButton}
      </div>
      {list}
    </Toolbar>
  }, [brandTextButton, classes.container, classes.flex, list])
  const appBar = useMemo(() => {
    return <AppBar position='static' className={classes.appBar}>
      {toolbar}
    </AppBar>
  }, [toolbar, classes.appBar])
  return appBar
}

AuthNavbar.propTypes = {
  classes: PropTypes.object.isRequired,
  brandText: PropTypes.string,
};

// eslint-disable-next-line react-refresh/only-export-components
export default withStyles(authNavbarStyle)(AuthNavbar);
