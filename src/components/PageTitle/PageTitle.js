import React from "react";

// styles
import useStyles from "./styles";
import { Typography } from "@material-ui/core";



export default function PageTitle(props) {
  var classes = useStyles();

  return (
    <div className={classes.pageTitleContainer}>
      <Typography className={classes.typo} variant="h3" size="sm">
        {props.title}
      </Typography>
      {props.button && props.button}
    </div>
  );
}
