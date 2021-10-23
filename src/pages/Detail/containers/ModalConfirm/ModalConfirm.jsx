import React from "react";
import { useHistory } from "react-router-dom";
import { Typography, Button, Dialog, Grid, Hidden } from "@material-ui/core";

import ticketApi from "../../../../services/api/ticketApi";
import { DialogContent, DialogActions, DialogTitle, useStyles } from "./style";

const ModalConfirm = (props) => {
  const classes = useStyles();
  const history = useHistory();

  const handleClose = () => {
    props.setOpen(false);
  };

  const handleConfirm = () => {
    ticketApi()
      .payment(props.id, props.isPaid)
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
          {props.isPaid
            ? "Xác nhận hủy thanh toán đơn hàng"
            : "Xác nhận đơn hàng đã được thanh toán"}
        </DialogTitle>
        <DialogContent dividers className={classes.bodyDialog}>
          <div className={classes.div}>
            <Typography className={classes.typography}>
              {props.isPaid
                ? "Tôi xác nhận hủy thanh toán đơn hàng "
                : "Tôi xác nhận đơn hàng đã được thanh toán "}
            </Typography>
            <Typography
              className={classes.typography}
              style={{ fontWeight: "bold" }}
            >
              {"Đơn Hàng: #"}
              {props ? props.orderId : ""}
            </Typography>
            <Typography className={classes.typography}>{" ?"}</Typography>
          </div>
        </DialogContent>
        <DialogActions className={classes.footerDialog}>
          <Grid container alignItems="center">
            <Grid item xs={8}></Grid>
            <Grid item xs={4}>
              <Button
                autoFocus
                onClick={handleConfirm}
                className={classes.button}
              >
                {"XÁC NHẬN"}
              </Button>
            </Grid>
          </Grid>
        </DialogActions>
      </Dialog>
    </Hidden>
  );
};

export default ModalConfirm;
