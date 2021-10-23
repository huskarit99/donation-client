import React, { useEffect, useState } from "react";
import { useTheme } from "@material-ui/core/styles";
import {
  Typography,
  Button,
  Dialog,
  Grid,
  useMediaQuery,
} from "@material-ui/core";

import { DialogContent, DialogActions, DialogTitle, useStyles } from "./style";

const ModalError = (props) => {
  const theme = useTheme();
  const classes = useStyles();
  const [money, setMoney] = useState("");
  const [ticketsSuccessFully, setTicketsSuccessFully] = useState("");
  const [ticketsFailed, setTicketsFailed] = useState("");
  const fullScreen = useMediaQuery(theme.breakpoints.down("sm"));

  useEffect(() => {
    if (props.open === true) {
      setMoney(props.bookSuccessfully.length * 10000);
      let tmp = "";
      for (let i = 0; i < props.bookSuccessfully.length; i++) {
        let number = props.bookSuccessfully[i];
        if (number < 10) number = "000" + number;
        else if (number < 100) number = "00" + number;
        else if (number < 1000) number = "0" + number;
        number += "";
        tmp += number;
        if (i !== props.bookSuccessfully.length - 1) tmp += ", ";
      }
      setTicketsSuccessFully(tmp);

      tmp = "";
      for (let i = 0; i < props.bookFailed.length; i++) {
        let number = props.bookFailed[i];
        if (number < 10) number = "000" + number;
        else if (number < 100) number = "00" + number;
        else if (number < 1000) number = "0" + number;
        number += "";
        tmp += number;
        if (i !== props.bookFailed.length - 1) tmp += ", ";
      }
      setTicketsFailed(tmp);
    }
  }, [props.open]);

  const handleClose = () => {
    props.setOpen(false);
  };

  const handleOrder = () => {
    props.handleOrder();
    props.setOpen(false);
  };

  const handleBack = () => {
    props.setOpen(false);
  };

  return (
    <Dialog
      fullScreen={fullScreen}
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
        {"XÁC NHẬN ĐẶT VÉ"}
      </DialogTitle>
      <DialogContent dividers className={classes.bodyDialog}>
        <div className={classes.div}>
          <Typography className={classes.typography}>
            {"\nQuý khách đã chọn số: "}
            {ticketsSuccessFully}
            {"\nRất tiếc số vé "}
            {ticketsFailed}
            {" đã có người đặt trước bạn."}
            {"\n Số vé hợp lệ của quý khách: "}
            <span style={{ fontWeight: "bold" }}>
              {"\n Giá vé: "}
              {new Intl.NumberFormat("vi-VN", {
                style: "currency",
                currency: "VND",
              }).format(10000 + "")}
              {"\n Số lượng: "}
              {"x"}
              {props.bookSuccessfully.length}
              {"\n Tổng tiền: "}
              {new Intl.NumberFormat("vi-VN", {
                style: "currency",
                currency: "VND",
              }).format(money + "")}
            </span>
            {"\nQuý khách có muốn tiếp tục để"}
            <span>
              <strong>{" Hoàn tất đặt vé "}</strong>
            </span>
            {"không?"}
            {"\nHoặc Quý khách có thể ấn"}
            <span>
              <strong>{" Trở về "}</strong>
            </span>
            {"bổ sung thêm vé mới."}
          </Typography>
        </div>
      </DialogContent>
      <DialogActions className={classes.footerDialog}>
        <Grid container alignItems="center">
          <Grid item xs={4} />
          <Grid
            item
            xs={4}
            style={{
              display: "flex",
              justifyContent: "center",
            }}
          >
            <Button autoFocus onClick={handleOrder} className={classes.button}>
              {"Đặt vé"}
            </Button>
          </Grid>
          <Grid
            item
            xs={4}
            style={{
              display: "flex",
              justifyContent: "center",
            }}
          >
            <Button onClick={handleBack} className={classes.button}>
              {"Trở về"}
            </Button>
          </Grid>
        </Grid>
      </DialogActions>
    </Dialog>
  );
};

export default ModalError;
