import { createBrowserHistory } from "history";
import { Button, TextField } from "@material-ui/core";
import React, { useState, useRef, Fragment } from "react";

import useStyles from "./style";
import ticketApi from "../../services/api/ticketApi";

const Login = () => {
  const classes = useStyles();
  const passwordRef = useRef(null);
  const history = createBrowserHistory({ forceRefresh: true });
  const [messageAlert, setMessageAlert] = useState(<Fragment />);

  const handleClick = () => {
    ticketApi()
      .login(passwordRef.current.value)
      .then((result) => {
        if (result.isSuccess) {
          history.push("/statistics");
        } else {
          setMessageAlert(
            <p className={classes.p}>
              {"Password went wrong. Plz try again!!!"}
            </p>
          );
        }
      });
  };

  return (
    <div className={classes.div1}>
      <div className={classes.div2}>
        <div className={classes.div3}>
          <TextField
            autoFocus
            type="password"
            inputRef={passwordRef}
            variant="outlined"
            placeholder="Enter a password"
            className={classes.textField}
            size="small"
          />
        </div>
        {messageAlert}
        <div className={classes.div4}>
          <Button onClick={handleClick} className={classes.button}>
            {"Enter"}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Login;
