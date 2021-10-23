import React from "react";
import { useHistory } from "react-router-dom";
import { Typography, Button, Dialog, Grid, Hidden } from "@material-ui/core";

import ticketApi from "../../../../services/api/ticketApi";
import { DialogContent, DialogActions, DialogTitle, useStyles } from "./style";

const ModalDelete = (props) => {
  const classes = useStyles();
  const history = useHistory();

  const handleClose = () => {
    props.setOpen(false);
  };

  const handleDelete = () => {
    ticketApi()
      .deleteOrder(props.selectedRow._id)
      .then((res) => {
        if (res.isSuccess) {
          props.setOpen(false);
          props.forceUpdate();
        } else {
          history.push("/login");
        }
      });
  };

  return (
    <Hidden xsDown>
      <Dialog
        onClose={handleClose}
        aria-labelledby="customized-dialog-title"
        open={props.open}
        style={{
          backgroundColor: "rgba(255, 255, 255, 0.3)",
        }}
      >
        <DialogTitle
          id="customized-dialog-title"
          onClose={handleClose}
          className={classes.title}
        >
          {"Xoá đơn hàng"}
        </DialogTitle>
        <DialogContent dividers className={classes.bodyDialog}>
          <div className={classes.div}>
            <Typography className={classes.typography}>
              {"Bạn có thực sự muốn xóa "}
            </Typography>
            <Typography
              className={classes.typography}
              style={{ fontWeight: "bold" }}
            >
              {"Đơn Hàng: #"}
              {props && props.selectedRow ? props.selectedRow.orderId : ""}
            </Typography>
            <Typography className={classes.typography}>{" ?"}</Typography>
          </div>
        </DialogContent>
        <DialogActions className={classes.footerDialog}>
          <Grid container alignItems="center">
            <Grid item xs={11}></Grid>
            <Grid item xs={1}>
              <Button
                autoFocus
                onClick={handleDelete}
                className={classes.button}
              >
                {"XÓA"}
              </Button>
            </Grid>
          </Grid>
        </DialogActions>
      </Dialog>
    </Hidden>
  );
};

export default ModalDelete;
