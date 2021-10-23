import React from "react";
import { useTheme } from "@material-ui/core/styles";
import { Typography, Avatar } from "@material-ui/core";

import useStyles from "./style";
import brick from "../../images/brick.png";
import Board from "./containers/Board/Board";

const Home = () => {
  const theme = useTheme();
  const classes = useStyles(theme)();

  return (
    <div className={classes.div1}>
      <div className={classes.div2}>
        <div className={classes.div3}>
          <Avatar variant="square" className={classes.avatar} src={brick} />
        </div>
      </div>
      <div className={classes.div4}>
        <div className={classes.div5}>
          <Typography className={classes.title}>
            {"NỐI GẠCH - TRAO YÊU THƯƠNG"}
          </Typography>
          <Typography className={classes.subTitle}>
            {"Chương trình Tấm vé may mắn"}
          </Typography>
        </div>
        <Board />
      </div>
    </div>
  );
};

export default Home;
