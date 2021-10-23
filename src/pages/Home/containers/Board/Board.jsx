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
                {"Thêm vé thành công"}
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
          {"Mã vé không được trống"}
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
          placeholder="Mã vé"
        />
        <Button onClick={handleAdd} className={classes.buttonAdd}>
          {"Thêm nhanh"}
        </Button>
        {messageAlert}
      </div>
      <div className={classes.div1}>
        <div className={classes.div2}>
          <Typography className={classes.note}>
            {
              "Cảm ơn bạn đã chung tay ủng hộ hoạt động Gây quỹ của sinh viên đã thụ hưởng Học Bổng Sắc Màu. Toàn bộ lợi nhuận từ chương trình sẽ được đóng góp vào Gạch Sắc Màu để trao học bổng cho các bạn học sinh, tân sinh viên có hoàn cảnh khó khăn nhưng ý chí vươn lên trong cuộc sống."
            }
            <span style={{ fontWeight: "bold" }}>{"\n Quy trình mua vé:"}</span>
            {"\n B1: Vui lòng chọn mã số vé bạn muốn mua theo 2 cách:"}
            {"\n Cách 1. Nhập mã số vé bạn muốn mua vào ô"}
            <span>
              <i>{" Mã số vé "}</i>
            </span>
            {"sau đó ấn"}
            <span>
              <strong>{" Thêm nhanh."}</strong>
            </span>
            {"\n Cách 2. Bấm chọn các vé trực tiếp từ danh sách số bên dưới."}
            {"\n ("}
            <span style={{ color: "red", fontWeight: "bold" }}>
              {"Màu Đỏ "}
            </span>
            {"là vé có người đặt nhưng chưa thanh toán,"}
            <span style={{ color: "green", fontWeight: "bold" }}>
              {" Màu xanh "}
            </span>
            {"là vé còn trống,"}
            <span style={{ color: "orange", fontWeight: "bold" }}>
              {" Màu cam "}
            </span>
            {
              "là vé bạn chọn thêm vào giỏ hàng. Những vé đã được thanh toán sẽ không được hiển thị.)"
            }
            {"\n B2: Ấn"}
            <span style={{ fontWeight: "bold" }}>{" Vào Giỏ Hàng "}</span>
            {"để xem lại thông tin và tiến hành đặt vé."}
            {"\n B3: Kiểm tra thông tin và ấn"}
            <span style={{ fontWeight: "bold" }}>{" ĐẶT VÉ."}</span>
            {
              "\n(Nếu như số vé Đã có người chọn hệ thống sẽ hiển thị thông báo. Quý khách có thể quay lại để chọn số khác hoặc Tiếp tục thanh toán với các vé có sẵn)."
            }
            {
              "\n B4: Thanh toán tiền vé qua Momo hoặc Tài khoản ngân hàng với nội dung: “SỐ ĐIỆN THOẠI HOẶC MÃ ĐƠN HÀNG”."
            }
            <span style={{ fontWeight: "bold" }}>{"\n Thanh toán qua:"}</span>
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
            {"\n Ngân hàng TMCP Quân Đội (MB Bank) chi nhánh Đồng Tháp "}
            {"\n"}
            {
              "\n*Chúng tôi sẽ “Xác nhận thanh toán thành công” đến email mà bạn đã đăng ký."
            }
          </Typography>
        </div>
      </div>
      <div className={classes.div3} style={{ marginTop: "20px" }}>
        <Button onClick={handleCart} className={classes.button}>
          {"Vào Giỏ Hàng"}
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
