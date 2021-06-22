import React, { useState } from "react";
import {
  ListItem,
  ListItemIcon,
  ListItemText,
} from "@material-ui/core";
import { Link } from "react-router-dom";
import classnames from "classnames";
import useStyles from "./styles";

export default function SidebarLink({
  link,
  icon,
  label,
  isSidebarOpened,
}) {
  var classes = useStyles();
  var [isOpen, setIsOpen] = useState(false);

    return (
      <ListItem
        button
        component={link && Link}
        to={link}
        className={classes.link}

        disableRipple
      >
        <ListItemIcon>
          {icon}
        </ListItemIcon>
        <ListItemText
          classes={{
            primary: classnames(classes.linkText, {
              [classes.linkTextHidden]: !isSidebarOpened,
            }),
          }}
          primary={label}
        />
      </ListItem>
    );



  function toggleCollapse(e) {
    if (isSidebarOpened) {
      e.preventDefault();
      setIsOpen(!isOpen);
    }
  }
}
