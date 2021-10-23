import React from "react";
import { useRecoilState } from "recoil";
import { Paper, Box } from "@material-ui/core";
import { useTheme } from "@material-ui/core/styles";

import useStyles from "./style";
import Ticket from "./components/Ticket/Ticket";
import undoTicketsState from "../../../../state/undoTicketsState";
import selectedTicketsState from "../../../../state/selectedTicketsState";

const Board = () => {
  const theme = useTheme();
  const classes = useStyles(theme)();
  const [undoTickets, setUndoTickets] = useRecoilState(undoTicketsState);
  const [selectedTickets, setSelectedTickets] =
    useRecoilState(selectedTicketsState);

  const removeTicket = (number) => {
    const tmp = selectedTickets.slice();
    const index = tmp.indexOf(number);
    if (index > -1) {
      setUndoTickets([...undoTickets, number]);
      tmp.splice(index, 1);
    }
    setSelectedTickets([...tmp]);
  };

  return (
    <div className={classes.div}>
      <Paper className={classes.paper}>
        <Box
          display="flex"
          flexWrap="wrap"
          justifyContent="center"
          bgcolor="#00000000"
          sx={{ minWidth: "100%" }}
        >
          {selectedTickets.length > 0 &&
            selectedTickets.map((ticket) => (
              <Ticket
                key={ticket}
                number={ticket}
                removeTicket={removeTicket}
              />
            ))}
        </Box>
      </Paper>
    </div>
  );
};

export default Board;
