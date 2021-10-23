import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { Typography, Button, Dialog, Grid, Hidden } from "@material-ui/core";

import ticketApi from "../../../../services/api/ticketApi";
import { DialogContent, DialogActions, DialogTitle, useStyles } from "./style";

const ModalDetailTicket = (props) => {
  const classes = useStyles();
  const history = useHistory();
  const [ticket, setTicket] = useState();

  const handleClose = () => {
    props.setOpen(false);
  };

  useEffect(() => {
    if (props && props.ticketNumber) {
      ticketApi()
        .getTicketByTicketNumber(props.ticketNumber)
        .then((res) => {
          if (res.isSuccess) {
            setTicket(res.ticket);
          } else {
            props.setOpen(false);
          }
        });
    }
  }, [props]);

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
          {"Thông tin chủ nhân tấm vé "}
          {props.ticketNumber ? props.ticketNumber : ""}
        </DialogTitle>
        <DialogContent dividers className={classes.bodyDialog}>
          <div className={classes.div}>
            <Typography className={classes.typography}>
              <span>
                <strong>{"Order ID : #"}</strong>
              </span>
              {ticket && ticket.order ? ticket.order.orderId : ""}
              <span>
                <strong>{"\nTên : "}</strong>
              </span>
              {ticket && ticket.order ? ticket.order.name : ""}
              <span>
                <strong> {"\nEmail : "}</strong>
              </span>
              {ticket && ticket.order ? ticket.order.email : ""}
              <span>
                <strong> {"\nSố điện thoại: "}</strong>
              </span>
              {ticket && ticket.order ? ticket.order.phoneNumber : ""}
            </Typography>
          </div>
        </DialogContent>
        <DialogActions className={classes.footerDialog}>
          <Grid container alignItems="center">
            <Grid item xs={11}></Grid>
            <Grid item xs={1}>
              <Button
                autoFocus
                onClick={handleClose}
                className={classes.button}
              >
                {"Đóng"}
              </Button>
            </Grid>
          </Grid>
        </DialogActions>
      </Dialog>
    </Hidden>
  );
};

export default ModalDetailTicket;
