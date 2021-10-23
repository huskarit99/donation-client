import { useRecoilState } from "recoil";
import { Fragment, React } from "react";
import { Grid, Paper, Box, Typography, Avatar } from "@material-ui/core";

import useStyles from "./style";
import undoTicketsState from "../../../../../../state/undoTicketsState";
import selectedTicketsState from "../../../../../../state/selectedTicketsState";

const Ticket = (props) => {
  const number = props.number;
  const isAvailable = props.isAvailable;
  const name = props.name;
  const classes = useStyles();
  const [selectedTickets, setSelectedTickets] =
    useRecoilState(selectedTicketsState);
  const [undoTickets, setUndoTickets] = useRecoilState(undoTicketsState);

  if (!isAvailable) {
    let tmp = selectedTickets.slice();
    let index = tmp.indexOf(number);
    if (index > -1) {
      tmp.splice(index, 1);
      setSelectedTickets([...tmp]);
    }
    tmp = undoTickets.slice();
    index = tmp.indexOf(number);
    if (index > -1) {
      tmp.splice(index, 1);
      setUndoTickets([...tmp]);
    }
  }

  return (
    <Box
      display="flex"
      bgcolor="#00000000"
      justifyContent="center"
      alignItems="center"
      className={classes.box}
    >
      <Paper
        className={classes.paper}
        onClick={() => {
          if (isAvailable) {
            if (selectedTickets.includes(number)) {
              const tmp = selectedTickets.slice();
              const index = tmp.indexOf(number);
              if (index > -1) {
                setUndoTickets([...undoTickets, number]);
                tmp.splice(index, 1);
              }
              setSelectedTickets([...tmp]);
            } else {
              const tmp = selectedTickets.slice();
              setSelectedTickets([...tmp, number]);
            }
          }
        }}
      >
        <Grid
          container
          justifyContent="center"
          alignItems="center"
          className={classes.container}
        >
          {isAvailable ? (
            <Grid item xs={12} className={classes.item3}>
              <Avatar
                style={{
                  backgroundColor: selectedTickets.includes(number)
                    ? "orange"
                    : "green",
                }}
                className={classes.avatar2}
              >
                {number < 10
                  ? "000" + number
                  : number < 100
                  ? "00" + number
                  : number < 1000
                  ? "0" + number
                  : number}
              </Avatar>
            </Grid>
          ) : (
            <Fragment>
              <Grid item xs={12} className={classes.item1}>
                <Avatar
                  style={{
                    backgroundColor: "red",
                  }}
                  className={classes.avatar1}
                >
                  {number < 10
                    ? "000" + number
                    : number < 100
                    ? "00" + number
                    : number < 1000
                    ? "0" + number
                    : number}
                </Avatar>
              </Grid>
              <Grid item xs={12} className={classes.item2}>
                <Typography
                  noWrap
                  style={{
                    color: "black",
                    fontSize: "12px",
                  }}
                >
                  {name}
                </Typography>
              </Grid>
            </Fragment>
          )}
        </Grid>
      </Paper>
    </Box>
  );
};

export default Ticket;
