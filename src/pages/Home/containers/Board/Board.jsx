import { useRecoilState } from "recoil";
import { useTheme } from "@material-ui/core/styles";
import { Pagination, PaginationItem } from "@material-ui/lab";
import { useHistory, Link, useParams } from "react-router-dom";
import React, { useState, Fragment, useRef, useEffect } from "react";
import { Typography, Paper, Button, Box, TextField } from "@material-ui/core";

import useStyles from "./style";
import Ticket from "./components/Ticket/Ticket";
import SoldOut from "../../../../images/sold-out.PNG";
import ticketApi from "../../../../services/api/ticketApi";
import colorAlertEnum from "../../../../utils/enums/colorAlertEnum";
import selectedTicketsState from "../../../../state/selectedTicketsState";

const Board = () => {
  let { page } = useParams();
  page = parseInt(page || "1", 10);
  const theme = useTheme();
  const history = useHistory();
  const numberRef = useRef(null);
  const classes = useStyles(theme)();
  const [count, setCount] = useState(20);
  const [tickets, setTickets] = useState(null);
  const [messageAlert, setMessageAlert] = useState();
  const [selectedTickets, setSelectedTickets] =
    useRecoilState(selectedTicketsState);

  useEffect(() => {
    ticketApi()
      .getManyByPage(page)
      .then((res) => {
        console.log(res);
        if (res)
          if (res.isSuccess) {
            setCount(res.count);
            setTickets(res.tickets);
            if (res.tickets === null) setTickets([]);
          } else {
            history.push("/");
          }
      });
  }, [useParams()]);

  const handleCart = () => {
    history.push("/cart");
  };

  const handleAdd = () => {
    const number = numberRef.current.value;
    if (number) {
      ticketApi()
        .checkTicketByTicketNumber(number)
        .then((result) => {
          if (result.isSuccess) {
            numberRef.current.value = "";
            let tmp = selectedTickets.slice();
            let index = tmp.indexOf(parseInt(number, 10));
            if (!(index > -1)) {
              setSelectedTickets([...selectedTickets, parseInt(number, 10)]);
            }
            setMessageAlert(
              <p
                style={{
                  color: colorAlertEnum.SUCCESS,
                  margin: "10px 0 10px 0",
                }}
              >
                {"Th??m v?? th??nh c??ng"}
              </p>
            );
          } else {
            setMessageAlert(
              <p
                style={{ color: colorAlertEnum.ERROR, margin: "10px 0 10px 0" }}
              >
                {result.message}
              </p>
            );
          }
        });
    } else {
      setMessageAlert(
        <p style={{ color: colorAlertEnum.ERROR, margin: "10px 0 10px 0" }}>
          {"M?? v?? kh??ng ???????c tr???ng"}
        </p>
      );
    }
  };

  return (
    <Fragment>
      <div
        className={classes.div}
        style={{ marginTop: "10px", height: "75px" }}
      >
        <TextField
          type="number"
          size="small"
          required
          fullWidth
          inputRef={numberRef}
          margin="normal"
          variant="outlined"
          className={classes.textField}
          style={{ width: "160px", marginRight: "10px" }}
          placeholder="M?? v??"
        />
        <Button onClick={handleAdd} className={classes.buttonAdd}>
          {"Th??m nhanh"}
        </Button>
        {messageAlert}
      </div>
      <div className={classes.div1}>
        <div className={classes.div2}>
          <Typography className={classes.note}>
            {
              "Ca??m o??n ba??n ??a?? chung tay u??ng ho???? hoa??t ??o????ng Ga??y quy?? cu??a sinh vie??n ??a?? thu?? hu??o????ng Ho??c Bo????ng Sa????c Ma??u. Toa??n bo???? lo????i nhua????n tu???? chu??o??ng tri??nh se?? ??u??o????c ??o??ng go??p va??o Ga??ch Sa????c Ma??u ??e???? trao ho??c bo????ng cho ca??c ba??n ho??c sinh, ta??n sinh vie??n co?? hoa??n ca??nh kho?? kha??n nhu??ng y?? chi?? vu??o??n le??n trong cuo????c so????ng."
            }
            <span style={{ fontWeight: "bold" }}>{"\n Quy tr??nh mua v??:"}</span>
            {"\n B1: Vui l??ng ch???n m?? s??? v?? b???n mu???n mua theo 2 c??ch:"}
            {"\n C??ch 1. Nh???p m?? s??? v?? b???n mu???n mua v??o ??"}
            <span>
              <i>{" M?? s??? v?? "}</i>
            </span>
            {"sau ???? ???n"}
            <span>
              <strong>{" Th??m nhanh."}</strong>
            </span>
            {"\n C??ch 2. B???m ch???n c??c v?? tr???c ti???p t??? danh s??ch s??? b??n d?????i."}
            {"\n ("}
            <span style={{ color: "red", fontWeight: "bold" }}>
              {"M??u ????? "}
            </span>
            {"l?? v?? c?? ng?????i ?????t nh??ng ch??a thanh to??n,"}
            <span style={{ color: "green", fontWeight: "bold" }}>
              {" M??u xanh "}
            </span>
            {"l?? v?? c??n tr???ng,"}
            <span style={{ color: "orange", fontWeight: "bold" }}>
              {" M??u cam "}
            </span>
            {
              "l?? v?? b???n ch???n th??m v??o gi??? h??ng. Nh???ng v?? ???? ???????c thanh to??n s??? kh??ng ???????c hi???n th???.)"
            }
            {"\n B2: ???n"}
            <span style={{ fontWeight: "bold" }}>{" V??o Gi??? H??ng "}</span>
            {"????? xem l???i th??ng tin v?? ti???n h??nh ?????t v??."}
            {"\n B3: Ki???m tra th??ng tin v?? ???n"}
            <span style={{ fontWeight: "bold" }}>{" ?????T V??."}</span>
            {
              "\n(N???u nh?? s??? v?? ???? c?? ng?????i ch???n h??? th???ng s??? hi???n th??? th??ng b??o. Qu?? kh??ch c?? th??? quay l???i ????? ch???n s??? kh??c ho???c Ti???p t???c thanh to??n v???i c??c v?? c?? s???n)."
            }
            {
              "\n B4: Thanh to??n ti???n v?? qua Momo hoa????c Ta??i khoa??n nga??n ha??ng v???i n???i dung: ???S??? ??I???N THO???I HO???C M?? ????N H??NG???."
            }
            <span style={{ fontWeight: "bold" }}>{"\n Thanh to??n qua:"}</span>
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
            {"\n Ng??n h??ng TMCP Qu??n ?????i (MB Bank) chi nh??nh ?????ng Th??p "}
            {"\n"}
            {
              "\n*Chu??ng to??i s??? ???X??c nh???n thanh to??n th??nh c??ng??? ?????n email m?? b???n ???? ????ng k??."
            }
          </Typography>
        </div>
      </div>
      <div className={classes.div3} style={{ marginTop: "20px" }}>
        <Button onClick={handleCart} className={classes.button}>
          {"V??o Gi??? H??ng"}
        </Button>
      </div>
      <div className={classes.div3} style={{ marginTop: "20px" }}>
        <Pagination
          count={count}
          className={classes.pagination}
          showLastButton
          showFirstButton
          size={window.innerWidth <= 500 ? "small" : "medium"}
          defaultPage={page}
          renderItem={(item) => (
            <PaginationItem
              component={Link}
              to={`/page/${item.page}`}
              {...item}
            />
          )}
        />
      </div>
      <div className={classes.div4}>
        <Paper className={classes.paper}>
          <Box
            display="flex"
            flexWrap="wrap"
            justifyContent="center"
            bgcolor="#00000000"
            sx={{ minWidth: "100%" }}
          >
            {tickets ? (
              tickets.length > 0 ? (
                tickets.map((row, index) => (
                  <Ticket
                    key={row.ticketNumber}
                    name={row.order ? row.order.name : ""}
                    isAvailable={row.order ? false : true}
                    isPaid={row.order ? row.order.isPaid : false}
                    number={row.ticketNumber}
                  />
                ))
              ) : (
                <img
                  style={{ width: "80%", height: "auto" }}
                  alt=""
                  src={SoldOut}
                />
              )
            ) : (
              <Fragment />
            )}
          </Box>
        </Paper>
      </div>
    </Fragment>
  );
};

export default Board;
