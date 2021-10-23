import { useHistory, Link } from "react-router-dom";
import { CheckCircleOutline, HighlightOff } from "@material-ui/icons";
import { faPencilAlt, faTrashAlt } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, {
  useEffect,
  useState,
  Fragment,
  useReducer,
  useRef,
} from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button,
  Typography,
  InputBase,
  Select,
  FormControl,
  MenuItem,
  TextField,
} from "@material-ui/core";
import GetAppIcon from "@material-ui/icons/GetApp";
import SearchIcon from "@material-ui/icons/Search";
import IconButton from "@material-ui/core/IconButton";

import useStyles from "./style";
import ticketApi from "../../services/api/ticketApi";
import ModalDelete from "./containers/ModalDelete/ModalDelete";
import ModalDetailTicket from "./containers/ModalDetailTicket/ModalDetailTicket";

const Statistics = () => {
  const searchRef = useRef();
  const classes = useStyles();
  const history = useHistory();
  const [orders, setOrders] = useState([]);
  const [openDelete, setOpenDelete] = useState(false);
  const [openDetailTicket, setOpenDetailTicket] = useState(false);
  const [selectedRow, setSelectedRow] = useState(null);
  const [numberOfTicketsArePaid, setNumberOfTicketsArePaid] = useState(0);
  const [numberOfTicketsAreOrdered, setNumberOfTicketsAreOrdered] = useState(0);
  const [ignored, forceUpdate] = useReducer((x) => x + 1, 0);

  useEffect(() => {
    ticketApi()
      .getOrders()
      .then((res) => {
        if (res.isSuccess) {
          setNumberOfTicketsAreOrdered(res.numberOfTicketsAreOrdered);
          setNumberOfTicketsArePaid(res.numberOfTicketsArePaid);
          setOrders(res.orders);
        } else {
          history.push("/login");
        }
      });
  }, [ignored]);

  const handleDownloadSummary = () => {
    ticketApi().exportTopVip();
  };

  const handleChangeGender = (row, gender) => {
    ticketApi().updateGender({ id: row._id, gender: gender });
  };

  const handleChangeName = (row, name) => {
    ticketApi().updateName({ id: row._id, name: name });
  };

  const handleSearch = (e) => {
    e.preventDefault();
    setOpenDetailTicket(true);
  };

  return (
    <Fragment>
      <div
        style={{
          margin: "10px 0 10px 10px",
          overflowX: "scroll",
        }}
      >
        <div style={{ display: "inline-flex", width: "100vw", height: "48px" }}>
          <div
            style={{ display: "flex", width: "300px", alignItems: "center" }}
          >
            <Typography>
              <span>
                <strong>{"Tổng vé đã đặt: "}</strong>
              </span>
              {numberOfTicketsAreOrdered}
            </Typography>
          </div>
          <div
            style={{
              width: "100%",
              display: "inline-flex",
              height: "48px",
              alignItems: "center",
              justifyContent: "flex-end",
              marginRight: "40px",
            }}
          >
            <Paper component="form" className={classes.root}>
              <InputBase
                className={classes.input}
                inputRef={searchRef}
                placeholder="Search Owner Ticket"
                inputProps={{ "aria-label": "Search Owner Ticket" }}
              />
              <IconButton
                type="submit"
                onClick={handleSearch}
                className={classes.iconButton}
                aria-label="search"
              >
                <SearchIcon />
              </IconButton>
            </Paper>
            <Link
              to="/statistics/top-vip"
              style={{ textDecoration: "none", marginRight: "20px" }}
            >
              <Button className={classes.button}>{"Top V.I.P"}</Button>
            </Link>
            <Button
              onClick={handleDownloadSummary}
              style={{ minWidth: "0", padding: "0", margin: "0" }}
            >
              <GetAppIcon style={{ height: "48px", width: "30px" }} />
            </Button>
          </div>
        </div>

        <Typography>
          <span>
            <strong>{"Tổng vé đã thanh toán: "}</strong>
          </span>
          {numberOfTicketsArePaid}
        </Typography>
      </div>
      <TableContainer component={Paper} className={classes.table}>
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow>
              <TableCell align="center">{"OrderId"}</TableCell>
              <TableCell align="center">{"Name"}</TableCell>
              <TableCell align="center">{"Gender"}</TableCell>
              <TableCell align="center">{"Email"}</TableCell>
              <TableCell align="center">{"Tickets"}</TableCell>
              <TableCell align="center">{"IsPaid"}</TableCell>
              <TableCell align="center">{"Setting"}</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {orders.map((row) => (
              <TableRow key={row._id}>
                <TableCell align="center">
                  {"#"}
                  {row.orderId}
                </TableCell>
                <TableCell align="center">
                  <TextField
                    disableClearable
                    defaultValue={row.name}
                    onBlur={(e) => handleChangeName(row, e.target.value)}
                  />
                </TableCell>
                <TableCell align="center">
                  <FormControl size="small" style={{ width: "100px" }}>
                    <Select
                      defaultValue={row.gender ? row.gender : ""}
                      style={{ fontSize: "0.875rem" }}
                      onClick={(e) => handleChangeGender(row, e.target.value)}
                      autoWidth
                    >
                      <MenuItem value={"Nam"} key={"Nam"}>
                        {"Nam"}
                      </MenuItem>
                      <MenuItem value={"Nữ"} key={"Nữ"}>
                        {"Nữ"}
                      </MenuItem>
                    </Select>
                  </FormControl>
                </TableCell>
                <TableCell align="center">{row.email}</TableCell>
                <TableCell align="center">{row.tickets.length}</TableCell>
                <TableCell align="center">
                  {row.isPaid ? (
                    <CheckCircleOutline
                      style={{ color: "green", fontSize: "28px" }}
                    />
                  ) : (
                    <HighlightOff style={{ color: "red", fontSize: "28px" }} />
                  )}
                </TableCell>
                <TableCell align="center">
                  <Link to={"/statistics/detail/" + row._id}>
                    <Button
                      className={classes.buttonEdit}
                      onClick={() => {
                        setSelectedRow(row);
                        setOpenDelete(true);
                      }}
                    >
                      <FontAwesomeIcon color="#005A9E" icon={faPencilAlt} />
                    </Button>
                  </Link>
                  <Button
                    className={classes.buttonDelete}
                    onClick={() => {
                      setSelectedRow(row);
                      setOpenDelete(true);
                    }}
                  >
                    <FontAwesomeIcon color="#005A9E" icon={faTrashAlt} />
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <ModalDelete
        open={openDelete}
        setOpen={setOpenDelete}
        selectedRow={selectedRow}
        forceUpdate={forceUpdate}
      />
      <ModalDetailTicket
        open={openDetailTicket}
        setOpen={setOpenDetailTicket}
        ticketNumber={
          searchRef && searchRef.current ? searchRef.current.value : ""
        }
      />
    </Fragment>
  );
};

export default Statistics;
