import { useTheme } from "@material-ui/core/styles";
import { useHistory } from "react-router-dom";
import React, { Fragment, useRef, useState, useReducer } from "react";
import { TextField, Button, Typography } from "@material-ui/core";
import { useRecoilState } from "recoil";

import useStyles from "./style";
import Logo from "../../images/logo.png";
import Board from "./containers/Board/Board";
import nameState from "../../state/nameState";
import DelIcon from "../../images/del_icon.png";
import emailState from "../../state/emailState";
import BgGreen from "../../images/bg-green.png";
import ticketApi from "../../services/api/ticketApi";
import phoneNumberState from "../../state/phoneNumberState";
import undoTicketsState from "../../state/undoTicketsState";
import ModalError from "./containers/ModalError/ModalError";
import colorAlertEnum from "../../utils/enums/colorAlertEnum";
import ModalFailed from "./containers/ModalFailed/ModalFailed";
import ModalSuccess from "./containers/ModalSuccess/ModalSuccess";
import selectedTicketsState from "../../state/selectedTicketsState";

const Cart = () => {
  const priceOfAnTicket = "10000";
  const buttonRef = useRef();
  const theme = useTheme();
  const history = useHistory();
  const phoneNumberRef = useRef(null);
  const classes = useStyles(theme)();
  const nameRef = useRef(null);
  const emailRef = useRef(null);
  const [ignored, forceUpdate] = useReducer((x) => x + 1, 0);
  const [name, setName] = useRecoilState(nameState);
  const [email, setEmail] = useRecoilState(emailState);
  const [messageAlert, setMessageAlert] = useState("");
  const [orderId, setOrderId] = useState("");
  const [bookFailed, setBookFailed] = useState([]);
  const [bookSuccessfully, setBookSuccessfully] = useState([]);
  const [phoneNumber, setPhoneNumber] = useRecoilState(phoneNumberState);
  const [undoTickets, setUndoTickets] = useRecoilState(undoTicketsState);
  const [openModalSuccess, setOpenModalSuccess] = useState(false);
  const [openModalError, setOpenModalError] = useState(false);
  const [openModalFailed, setOpenModalFailed] = useState(false);
  const [selectedTickets, setSelectedTickets] =
    useRecoilState(selectedTicketsState);

  const handleUndo = () => {
    const tmp = undoTickets.slice();
    while (tmp.length > 0) {
      const bottom = tmp[tmp.length - 1];
      tmp.splice(-1);
      if (selectedTickets.includes(bottom)) continue;
      setSelectedTickets([...selectedTickets, bottom]);
      setUndoTickets([...tmp]);
      break;
    }
  };

  const handleOrder = () => {
    if (buttonRef.current.disabled === false) {
      buttonRef.current.disabled = true;
      ticketApi()
        .order(
          emailRef.current.value,
          nameRef.current.value,
          phoneNumberRef.current.value,
          selectedTickets
        )
        .then((result) => {
          if (result.isSuccess) {
            setBookFailed(result.bookFailed);
            setBookSuccessfully(result.bookSuccessfully);
            setName(nameRef.current.value);
            setEmail(emailRef.current.value);
            setPhoneNumber(phoneNumberRef.current.value);
            if (result.bookFailed && result.bookFailed.length === 0) {
              setOrderId(result.orderId);
              setOpenModalSuccess(true);
            } else {
              if (result.bookSuccessfully.length === 0) {
                setUndoTickets([]);
                setSelectedTickets([]);
                setOpenModalFailed(true);
              } else {
                setSelectedTickets(result.bookSuccessfully);
                setUndoTickets([]);
                setOpenModalError(true);
              }
            }
          } else {
            setMessageAlert(
              <p
                style={{
                  color: colorAlertEnum.ERROR,
                  margin: "0px 0 10px 0",
                }}
              >
                {result.message}
              </p>
            );
          }
          buttonRef.current.disabled = false;
        });
    }
  };

  return (
    <Fragment>
      <div className={classes.div1}>
        <div className={classes.div2}>
          <div className={classes.div21}>
            <img alt="im" className={classes.avatar1} src={BgGreen} />
            <div className={classes.div3}>
              <img
                alt="im"
                variant="square"
                className={classes.avatar2}
                src={Logo}
              />
            </div>
            <div
              style={{
                position: "absolute",
                width: "100%",
                height: "100%",
                top: "230px",
                textAlign: "center",
              }}
            >
              <p className={classes.p1}>{"TẤM VÉ"}</p>
              <p className={classes.p2}>{"MAY"}</p>
              <p className={classes.p2}>{"MẮN"}</p>
            </div>
          </div>
        </div>
        <div className={classes.div4}>
          <div
            style={{
              width: "100%",
              height: "30px",
              textAlign: "right",
              paddingRight: "20px",
              marginTop: "5px",
            }}
          >
            <img
              alt="img"
              src={DelIcon}
              onClick={() => {
                setName(nameRef.current.value);
                setEmail(emailRef.current.value);
                setPhoneNumber(phoneNumberRef.current.value);
                history.goBack();
              }}
            />
          </div>
          <div className={classes.div5}>
            <TextField
              className={classes.textField}
              id="standard-helperText"
              label="Họ và tên"
              required
              defaultValue={name}
              inputRef={nameRef}
            />
          </div>
          <div className={classes.div5}>
            <TextField
              className={classes.textField}
              id="standard-helperText"
              label="Email"
              type="email"
              required
              defaultValue={email}
              inputRef={emailRef}
            />
          </div>
          <div className={classes.div5}>
            <TextField
              className={classes.textField}
              id="standard-helperText"
              label="Số điện thoại"
              required
              defaultValue={phoneNumber}
              inputRef={phoneNumberRef}
            />
          </div>
          <div className={classes.note}>
            <Typography className={classes.typography}>
              <span>
                <i>{"(Vui lòng nhập thông tin cá nhân trước khi Đặt vé "}</i>
              </span>
              <span>
                <i>
                  {
                    "\nThông tin cá nhân của anh/chị sẽ được chúng tôi bảo mật dưới mọi hình thức)"
                  }
                </i>
              </span>
            </Typography>
          </div>
          {messageAlert}
          <div className={classes.div6}>
            <div style={{ display: "inline-flex" }}>
              <div style={{ width: "150px" }}>
                <p style={{ fontWeight: "bold" }}>{" Giá vé"}</p>
              </div>
              <div style={{ width: "150px" }}>
                <p style={{ fontWeight: "bold" }}>
                  {": "}
                  {new Intl.NumberFormat("vi-VN", {
                    style: "currency",
                    currency: "VND",
                  }).format(priceOfAnTicket)}
                  {/* {" đồng"} */}
                </p>
              </div>
            </div>
          </div>
          <div className={classes.div6}>
            <div style={{ display: "inline-flex" }}>
              <div style={{ width: "150px" }}>
                <p style={{ fontWeight: "bold" }}>{"Số vé đã mua"}</p>
              </div>
              <div style={{ width: "150px" }}>
                <p style={{ fontWeight: "bold" }}>
                  {": x"}
                  {selectedTickets.length}
                </p>
              </div>
            </div>
          </div>
          <div className={classes.div6}>
            <div style={{ display: "inline-flex" }}>
              <div style={{ width: "150px" }}>
                <p style={{ fontWeight: "bold" }}>{"Tổng tiền"}</p>
              </div>
              <div style={{ width: "150px" }}>
                <p style={{ fontWeight: "bold" }}>
                  {": "}
                  {new Intl.NumberFormat("vi-VN", {
                    style: "currency",
                    currency: "VND",
                  }).format(selectedTickets.length * 10000 + "")}
                </p>
              </div>
            </div>
          </div>
          <div className={classes.div6} style={{ display: "inline-flex" }}>
            <div className={classes.div61}>
              <p style={{ fontWeight: "bold", width: "150px" }}>
                {"Các vé đã mua:"}
              </p>
            </div>
            <div className={classes.div62}>
              <Button className={classes.undoBtn} onClick={handleUndo}>
                {"Undo"}
              </Button>
            </div>
          </div>
          <Board />
          <div className={classes.div7}>
            <Button
              ref={buttonRef}
              classes={{ disabled: classes.disabledButton }}
              className={classes.bookBtn}
              onClick={handleOrder}
              // disabled
            >
              {"ĐẶT VÉ"}
            </Button>
          </div>
        </div>
      </div>
      <ModalSuccess
        orderId={orderId}
        open={openModalSuccess}
        setOpen={setOpenModalSuccess}
        forceUpdate={forceUpdate}
      />
      <ModalFailed
        open={openModalFailed}
        setOpen={setOpenModalFailed}
        forceUpdate={forceUpdate}
      />
      <ModalError
        handleOrder={handleOrder}
        bookFailed={bookFailed}
        bookSuccessfully={bookSuccessfully}
        open={openModalError}
        setOpen={setOpenModalError}
        forceUpdate={forceUpdate}
      />
    </Fragment>
  );
};

export default Cart;
