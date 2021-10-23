import { useHistory } from "react-router-dom";
import React, { useEffect, useState, Fragment } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from "@material-ui/core";

import useStyles from "./style";
import ticketApi from "../../services/api/ticketApi";

const TopVip = () => {
  const classes = useStyles();
  const history = useHistory();
  const [topVip, setTopVip] = useState([]);

  useEffect(() => {
    ticketApi()
      .getTopVip()
      .then((res) => {
        if (res.isSuccess) {
          setTopVip(res.data);
        } else {
          history.push("/login");
        }
      });
  }, []);

  return (
    <Fragment>
      <TableContainer component={Paper} className={classes.table}>
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow>
              <TableCell align="center">{"No."}</TableCell>
              <TableCell align="center">{"Name"}</TableCell>
              <TableCell align="center">{"Gender"}</TableCell>
              <TableCell align="center">{"Email"}</TableCell>
              <TableCell align="center">{"Phone Number"}</TableCell>
              <TableCell align="center">{"Tickets"}</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {topVip &&
              topVip.length > 0 &&
              topVip.map((row, index) => (
                <TableRow key={row._id}>
                  <TableCell align="center">{index}</TableCell>
                  <TableCell align="center">{row.name}</TableCell>
                  <TableCell align="center">
                    {row.gender ? row.gender : ""}
                  </TableCell>
                  <TableCell align="center">{row.email}</TableCell>
                  <TableCell align="center">{row.phoneNumber}</TableCell>
                  <TableCell align="center">{row.tickets}</TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Fragment>
  );
};

export default TopVip;
