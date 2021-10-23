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
        {"HOÀN TẤT ĐẶT VÉ"}
      </DialogTitle>
      <DialogContent dividers className={classes.bodyDialog}>
        <div className={classes.div}>
          <Typography className={classes.typography}>
            {"Mã đơn hàng: #" + props.orderId}
            {"\nSố vé may mắn: "}
            {tickets}
            {"\n Tổng tiền: "}
            {new Intl.NumberFormat("vi-VN", {
              style: "currency",
              currency: "VND",
            }).format(money + "")}
            {
              "\n BTC sẽ giữ số anh chị đã chọn trong 24 tiếng và trước thời điểm công bố kết quả. Anh chị vui lòng Thanh toán thông qua 1 trong 2 hình thức sau:"
            }
            <span>
              <strong>
                <i>{"\n+ Hình thức 1: "}</i>
              </strong>
            </span>
            {
              "Momo - Số điện thoại (076) 965-8673 (Chủ tài khoản Momo: Nguyễn Thị Thảo)"
            }
            <span>
              <i>{"\nHoặc"}</i>
            </span>
            <span>
              <strong>
                <i>{"\n+ Hình thức 2: "}</i>
              </strong>
            </span>
            {"\n Tài khoản ngân hàng: Nguyễn Thị Thảo"}
            {"\n Số tài khoản: 000 1882 33 9224"}
            <span style={{ fontWeight: "bold" }}>
              {"\nGhi chú khi thanh toán:"}
            </span>
            {" SỐ ĐIỆN THOẠI HOẶC MÃ ĐƠN HÀNG"}
            {
              "\n Anh chị vui lòng kiểm tra email và thanh toán trong 24 giờ. Chúng tôi sẽ xác nhận thanh toán thành công từ 24 - 48 giờ làm việc. "
            }
            {/* <span>
              <i>
                {
                  "(Thông tin cá nhân của anh/chị sẽ được chúng tôi bảo mật dưới mọi hình thức)"
                }
              </i>
            </span> */}
            {
              "\n (Nếu sau 24 giờ BTC chưa nhận được thanh toán từ Quý khách. BTC sẽ tiến hành bỏ chọn các vé và quý khách phải tiến hành đặt vé lại)"
            }
            {
              "\n Thay mặt BTC Chương trình Xin cảm ơn anh/chị đã quan tâm và tham gia cùng chương trình."
            }
            {"\n Hotline: (037) 536-5800 (gặp Oanh)"}
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
              {"Đóng"}
            </Button>
          </Grid>
        </Grid>
      </DialogActions>
    </Dialog>
  );
};

export default ModalSuccess;
