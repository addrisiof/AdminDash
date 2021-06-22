import React from "react";
import {
  Route,
  Switch,
  withRouter,
} from "react-router-dom";
import classnames from "classnames";
import useStyles from "./styles";
import Header from "../Header";
import Sidebar from "../Sidebar";
import Home from "../../pages/home";
import { useLayoutState } from "../../context/LayoutContext";
import Outfit from "../../pages/outfit";

function Layout(props) {
  var classes = useStyles();
  var layoutState = useLayoutState();

  return (
    <div className={classes.root}>
        <>
          <Header history={props.history} />
          <Sidebar />
          <div
            className={classnames(classes.content, {
              [classes.contentShift]: layoutState.isSidebarOpened,
            })}
          >
            <div className={classes.fakeToolbar} />
            <Switch>
              <Route path="/app/home" component={Home} />
              <Route path="/app/outfit" component={Outfit} />
            </Switch>
          </div>
        </>
    </div>
  );
}

export default withRouter(Layout);
