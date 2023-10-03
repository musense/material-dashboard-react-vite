import { hexToRgb, whiteColor } from "@assets/jss/material-dashboard-react.jsx";

const customTabsStyle = {
  overflowVisible: {
    overflow: "visible !important",
  },
  cardTitle: {
    float: "left",
    padding: "10px 10px 10px 0px",
    lineHeight: "24px"
  },
  displayNone: {
    display: "none !important"
  },
  flexContainer: {
    display: "flex",
    flexDirection: "row",
    gap: "1px",
    "&::before": {
      content: '""',
      display: "none",
      position: "absolute",
      width: "100%",
      height: "30px",
      backgroundColor: "white",
      left: "0",
      bottom: "0",
      zIndex: "1"
    }
  },
  tabsRoot: {
    minHeight: "unset !important",
    overflowX: "visible !important",
    "& $tabRootButton": {
      fontSize: "0.875rem"
    }
  },
  tabRootButton: {
    width: "200px !important",
    height: "50px !important",
    minHeight: "unset !important",
    minWidth: "unset !important",
    maxWidth: "unset !important",
    maxHeight: "unset !important",
    padding: "10px 15px",
    borderRadius: "3px",
    lineHeight: "24px",
    border: "0 !important",
    color: whiteColor + " !important",
    background: "linear-gradient(60deg, #ab47bc, #8e24aa)",
    opacity: " 0.5",
    bottom: "0",
    boxShadow: "none !important",
    zIndex: "0",
    transition: "all 0.2s ease-in-out",
    "&:hover": {
      background: "linear-gradient(60deg, #ab47bc, #8e24aa)",
      opacity: "1",
      bottom: "0",
      "&:last-child": {
        marginLeft: "0px"
      }
    },
  },
  tabSelected: {
    background: "linear-gradient(60deg, #ab47bc, #8e24aa)",
    boxShadow: "0 4px 20px 0 rgba(0, 0, 0,.14), 0 7px 10px -5px rgba(156, 39, 176,.4)",
    opacity: "1",
    transition: "0.2s opacity 0.1s, 0.2s background-color 0.1s, 0.2s box-shadow 0.1s",
    zIndex: "1",
    "&:hover": {
      bottom: "0"
    }
  },
  tabLabelContainer: {
    padding: "0px"
  },
  tabLabel: {
    fontWeight: "500",
    fontSize: "12px"
  },
  tabWrapper: {
    display: "inline-block",
    minHeight: "unset !important",
    minWidth: "unset !important",
    width: "unset !important",
    height: "unset !important",
    maxWidth: "unset !important",
    maxHeight: "unset !important",
    "& > svg,& > .material-icons": {
      verticalAlign: "middle",
      margin: "-1px 5px 0 0"
    }
  }
}
export default customTabsStyle;
