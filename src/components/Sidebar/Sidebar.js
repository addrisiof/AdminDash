import React, { useState, useEffect } from "react";
import { Drawer, IconButton } from "@material-ui/core";
import {
  Home as HomeIcon,
  LibraryBooks as LibraryIcon,
  ArrowBack as ArrowBackIcon,
} from "@material-ui/icons";
import { useTheme } from "@material-ui/styles";
import { withRouter } from "react-router-dom";
import classNames from "classnames";
import useStyles from "./styles";
import SidebarLink from "./components/SidebarLink/SidebarLink";

import {
  useLayoutState,
  useLayoutDispatch,
  toggleSidebar,
} from "../../context/LayoutContext";


function Sidebar({ location }) {
  var classes = useStyles();
  var theme = useTheme();

  var { isSidebarOpened } = useLayoutState();
  var layoutDispatch = useLayoutDispatch();
  var [isPermanent, setPermanent] = useState(true);

  useEffect(function() {
    window.addEventListener("resize", handleWindowWidthChange);
    handleWindowWidthChange();
    return function cleanup() {
      window.removeEventListener("resize", handleWindowWidthChange);
    };
  });

  return (
    <Drawer
      variant={isPermanent ? "permanent" : "temporary"}
      className={classNames(classes.drawer, {
        [classes.drawerOpen]: isSidebarOpened,
        [classes.drawerClose]: !isSidebarOpened,
      })}
      classes={{
        paper: classNames({
          [classes.drawerOpen]: isSidebarOpened,
          [classes.drawerClose]: !isSidebarOpened,
        }),
      }}
      open={isSidebarOpened}
    >
      <div className={classes.toolbar} />
      <div className={classes.mobileBackButton}>
        <IconButton onClick={() => toggleSidebar(layoutDispatch)}>
          <ArrowBackIcon
            classes={{
              root: classNames(classes.headerIcon, classes.headerIconCollapse),
            }}
          />
        </IconButton>
      </div>
          <SidebarLink
            key="1"
            location={location}
            isSidebarOpened={isSidebarOpened}
            label="Home"
            link="/app/home"
            icon={<HomeIcon />}
          />
      <SidebarLink
        key="2"
        location={location}
        isSidebarOpened={isSidebarOpened}
        label="Outfit"
        link="/app/outfit"
        icon={<LibraryIcon />}
      />
    </Drawer>
  );


  function handleWindowWidthChange() {
    var windowWidth = window.innerWidth;
    var breakpointWidth = theme.breakpoints.values.md;
    var isSmallScreen = windowWidth < breakpointWidth;

    if (isSmallScreen && isPermanent) {
      setPermanent(false);
    } else if (!isSmallScreen && !isPermanent) {
      setPermanent(true);
    }
  }
}

export default withRouter(Sidebar);
