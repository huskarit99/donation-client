import { useRecoilState } from "recoil";
import { useHistory } from "react-router-dom";
import React, { useEffect, useState } from "react";
import { useTheme } from "@material-ui/core/styles";
import {
  Typography,
  Button,
  Dialog,
  Grid,
  useMediaQuery,
} from "@material-ui/core";

import undoTicketsState from "../../../../state/undoTicketsState";
import selectedTicketsState from "../../../../state/selectedTicketsState";
import { DialogContent, DialogActions, DialogTitle, useStyles } from "./style";

const ModalSuccess = (props) => {
  const theme = useTheme();
  const classes = useStyles();
  const history = useHistory();
  const [money, setMoney] = useState("");
  const [tickets, setTickets] = useState("");
  const [undoTickets, setUndoTickets] = useRecoilState(undoTicketsState);
  const [selectedTickets, setSelectedTickets] =
    useRecoilState(selectedTicketsState);
  const fullScreen = useMediaQuery(theme.breakpoints.down("sm"));

  useEffect(() => {
    if (props.open === true) {
      setMoney(selectedTickets.length * 10000);
      let tmp = "";
      for (let i = 0; i < selectedTickets.length; i++) {
        let number = selectedTickets[i];
        if (number < 10) number = "000" + number;
        else if (number < 100) number = "00" + number;
        else if (number < 1000) number = "0" + number;
        number += "";
        tmp += number;
        if (i !== selectedTickets.length - 1) tmp += ", ";
      }
      setTickets(tmp);
      setUndoTickets([]);
      setSelectedTickets([]);
    }
  }, [props.open]);

  const handleClose = () => {
    props.setOpen(false);
  };

  const handleConfirm = () => {
    props.forceUpdate();
    props.setOpen(false);
    history.push("/");
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
        {"HO??N T???T ?????T V??"}
      </DialogTitle>
      <DialogContent dividers className={classes.bodyDialog}>
        <div className={classes.div}>
          <Typography className={classes.typography}>
            {"M?? ????n h??ng: #" + props.orderId}
            {"\nS??? v?? may m???n: "}
            {tickets}
            {"\n T???ng ti???n: "}
            {new Intl.NumberFormat("vi-VN", {
              style: "currency",
              currency: "VND",
            }).format(money + "")}
            {
              "\n BTC s??? gi??? s??? anh ch??? ???? ch???n trong 24 ti???ng v?? tr?????c th???i ??i???m c??ng b??? k???t qu???. Anh ch??? vui l??ng Thanh to??n th??ng qua 1 trong 2 h??nh th???c sau:"
            }
            <span>
              <strong>
                <i>{"\n+ H??nh th???c 1: "}</i>
              </strong>
            </span>
            {
              "Momo - So???? ??ie????n thoa??i (076) 965-8673 (Ch??? t??i kho???n Momo: Nguy???n Th??? Th???o)"
            }
            <span>
              <i>{"\nHo???c"}</i>
            </span>
            <span>
              <strong>
                <i>{"\n+ H??nh th???c 2: "}</i>
              </strong>
            </span>
            {"\n T??i kho???n ng??n h??ng: Nguye????n Thi?? Tha??o"}
            {"\n So???? ta??i khoa??n: 000 1882 33 9224"}
            <span style={{ fontWeight: "bold" }}>
              {"\nGhi ch?? khi thanh to??n:"}
            </span>
            {" S??? ??I???N THO???I HO???C M?? ????N H??NG"}
            {
              "\n Anh ch??? vui l??ng ki???m tra email v?? thanh to??n trong 24 gi???. Ch??ng t??i s??? x??c nh???n thanh to??n th??nh c??ng t??? 24 - 48 gi??? l??m vi???c. "
            }
            {/* <span>
              <i>
                {
                  "(Th??ng tin c?? nh??n c???a anh/ch??? s??? ???????c ch??ng t??i b???o m???t d?????i m???i h??nh th???c)"
                }
              </i>
            </span> */}
            {
              "\n (N???u sau 24 gi??? BTC ch??a nh???n ???????c thanh to??n t??? Qu?? kh??ch. BTC s??? ti???n h??nh b??? ch???n c??c v?? v?? qu?? kh??ch ph???i ti???n h??nh ?????t v?? l???i)"
            }
            {
              "\n Thay m???t BTC Ch????ng tr??nh Xin c???m ??n anh/ch??? ???? quan t??m v?? tham gia c??ng ch????ng tr??nh."
            }
            {"\n Hotline: (037) 536-5800 (g???p Oanh)"}
          </Typography>
        </div>
      </DialogContent>
      <DialogActions className={classes.footerDialog}>
        <Grid container alignItems="center">
          <Grid item xs={11}></Grid>
          <Grid item xs={1}>
            <Button
              autoFocus
              onClick={handleConfirm}
              className={classes.button}
            >
              {"????ng"}
            </Button>
          </Grid>
        </Grid>
      </DialogActions>
    </Dialog>
  );
};

export default ModalSuccess;
