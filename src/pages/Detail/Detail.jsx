import { useHistory, useParams } from "react-router-dom";
import React, { useEffect, useState, Fragment, useReducer } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Typography,
  Button,
} from "@material-ui/core";

import useStyles from "./style";
import ticketApi from "../../services/api/ticketApi";
import ModalConfirm from "./containers/ModalConfirm/ModalConfirm";

const Detail = () => {
  const classes = useStyles();
  const history = useHistory();
  const { id } = useParams();
  const [order, setOrder] = useState(null);
  const [openConfirm, setOpenConfirm] = useState(false);
  const [ignored, forceUpdate] = useReducer((x) => x + 1, 0);

  useEffect(() => {
    ticketApi()
      .getOrderById(id)
      .then((res) => {
        if (res.isSuccess) {
          setOrder(res.order);
        } else {
          history.push("/login");
        }
      });
  }, [useParams(), ignored]);

  return (
    <Fragment>
      {order ? (
        <div className={classes.div1}>
          <div className={classes.div2}>
            <Typography noWrap>
              <span style={{ fontWeight: "bold" }}>{"Order: "}</span>
              {"#"}
              {order.orderId}
            </Typography>
            <Typography>
              <span style={{ fontWeight: "bold" }}>{"Name: "}</span>
              {order.name}
            </Typography>
            <Typography>
              <span style={{ fontWeight: "bold" }}>{"Email: "}</span>
              {order.email}
            </Typography>
            <Typography>
              <span style={{ fontWeight: "bold" }}>{"Phone number: "}</span>
              {order.phoneNumber}
            </Typography>
          </div>
          <Paper
            style={{
              display: "flex",
              width: "100%",
              justifyContent: "center",
            }}
          >
            <TableContainer className={classes.table}>
              <Table stickyHeader aria-label="sticky table">
                <TableHead>
                  <TableRow>
                    <TableCell align="center">{"Number"}</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {order &&
                    order.tickets.length > 0 &&
                    order.tickets.map((row) => (
                      <TableRow key={row._id}>
                        <TableCell align="center">{row.ticketNumber}</TableCell>
                      </TableRow>
                    ))}
                </TableBody>
              </Table>
            </TableContainer>
          </Paper>
          <div
            style={{
              width: "100%",
              paddingRight: "30px",
              marginTop: "10px",
              textAlign: "end",
            }}
          >
            {order && order.isPaid ? (
              <Button
                onClick={() => setOpenConfirm(true)}
                className={classes.buttonUnConfirm}
              >
                {"Hủy xác nhận đã thanh toán"}
              </Button>
            ) : (
              <Button
                onClick={() => setOpenConfirm(true)}
                className={classes.buttonConfirm}
              >
                {"Xác nhận đã thanh toán"}
              </Button>
            )}
          </div>
        </div>
      ) : (
        <Fragment />
      )}
      <ModalConfirm
        open={openConfirm}
        setOpen={setOpenConfirm}
        orderId={order ? order.orderId : ""}
        id={order ? order._id : ""}
        isPaid={order ? order.isPaid : false}
        forceUpdate={forceUpdate}
      />
    </Fragment>
  );
};

export default Detail;
