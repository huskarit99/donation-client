import { React } from "react";
import { Paper, Box, Avatar } from "@material-ui/core";

import useStyles from "./style";
import DelIcon from "../../../../../../images/del_icon.png";

const Ticket = (props) => {
  const number = parseInt(props.number, 10);
  const classes = useStyles();
  return (
    <Box
      display="flex"
      bgcolor="#00000000"
      justifyContent="center"
      alignItems="center"
      className={classes.box}
    >
      <Paper className={classes.paper}>
        <div className={classes.div}>
          <Avatar
            src={DelIcon}
            className={classes.closeBtn}
            onClick={() => props.removeTicket(number)}
          />
          <Avatar
            style={{ backgroundColor: "green" }}
            className={classes.avatar}
          >
            {number < 10
              ? "000" + number
              : number < 100
              ? "00" + number
              : number < 1000
              ? "0" + number
              : number}
          </Avatar>
        </div>
      </Paper>
    </Box>
  );
};

export default Ticket;
