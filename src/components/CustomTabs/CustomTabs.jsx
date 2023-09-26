import React, { useState, useCallback } from "react";
// nodejs library that concatenates classes
import classNames from "classnames";
// nodejs library to set properties for components
import PropTypes from "prop-types";

// material-ui components
import withStyles from "@material-ui/core/styles/withStyles";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
// core components
import Card from "@components/Card/Card.jsx";
import CardBody from "@components/Card/CardBody.jsx";
import CardHeader from "@components/Card/CardHeader.jsx";

import customTabsStyle from "@assets/jss/material-dashboard-react/components/customTabsStyle.jsx";


// eslint-disable-next-line react-refresh/only-export-components
function CustomTabs({ ...props }) {
  const [value, setValue] = useState(0);

  const {
    classes,
    headerColor,
    plainTabs,
    tabs,
    title,
    color,
    className,
  } = props;

  const handleChange = useCallback((e, newValue) => setValue(newValue), [])

  const cardTitle = classNames({
    [classes.cardTitle]: true
  });

  return (
    <Card plain={plainTabs}>
      <CardHeader color={headerColor} plain={plainTabs} className={className}>
        {title !== undefined ? <div className={cardTitle}>{title}</div> : null}
        <Tabs
          value={value}
          onChange={handleChange}
          classes={{
            root: classes.tabsRoot,
            indicator: classes.displayNone,
            scrollButtons: classes.displayNone,
          }}
          variant="scrollable"
          scrollButtons="auto"
        >
          {tabs.map((prop, key) => {
            var icon = {};
            if (prop.tabIcon) {
              icon = {
                icon: <prop.tabIcon />,
              };
            }
            return (
              <Tab
                classes={{
                  root: classes.tabRootButton,
                  labelContainer: classes.tabLabelContainer,
                  label: classes.tabLabel,
                  selected: classes.tabSelected,
                  wrapper: classes.tabWrapper,
                }}
                onClick={prop.onClick}
                key={key}
                label={prop.tabName}
                {...icon}
              />
            );
          })}
        </Tabs>
      </CardHeader>
      <CardBody>
        {tabs.map((prop, key) => {
          if (key === value) {
            return <div key={key}>{prop.tabContent}</div>;
          }
          return null;
        })}
      </CardBody>
    </Card>
  );
}

CustomTabs.propTypes = {
  classes: PropTypes.object.isRequired,
  headerColor: PropTypes.oneOf([
    "warning",
    "success",
    "danger",
    "info",
    "primary",
  ]),
  title: PropTypes.string,
  tabs: PropTypes.arrayOf(
    PropTypes.shape({
      tabName: PropTypes.string.isRequired,
      tabIcon: PropTypes.func,
      tabContent: PropTypes.node.isRequired,
    })
  ),
  rtlActive: PropTypes.bool,
  plainTabs: PropTypes.bool,
};

// eslint-disable-next-line react-refresh/only-export-components
export default withStyles(customTabsStyle)(CustomTabs);
