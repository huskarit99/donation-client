import React from "react";
import { useTheme } from "@material-ui/core/styles";
import {
  Typography,
  Button,
  Dialog,
  Grid,
  useMediaQuery,
} from "@material-ui/core";

import { DialogContent, DialogActions, DialogTitle, useStyles } from "./style";

const ModalFailed = (props) => {
  const theme = useTheme();
  const classes = useStyles();
  const fullScreen = useMediaQuery(theme.breakpoints.down("sm"));

  const handleClose = () => {
    props.setOpen(false);
  };

  return (
    <Dialog
      fullScreen={fullScreen}
      onClose={handleClose}
      aria-labelledby="customized-dialog-title"
      open={props.open}
      style={{
        backgroundColor: "rgba(255, 255, 255, 0.3)",
      }}
    >
      <DialogTitle
        id="customized-dialog-title"
        onClose={handleClose}
        className={classes.title}
      >
        {"THANH TOÁN THẤT BẠI"}
      </DialogTitle>
      <DialogContent dividers className={classes.bodyDialog}>
        <div className={classes.div}>
          <Typography className={classes.typography}>
            {
              "Rất tiếc, nhanh tay thì còn chậm tay thì mất, hiện tại số vé quý khách đặt đã có người ấn thanh toán nhanh hơn."
            }
            {"\n Quý khách đừng buồn nhé!"}
            {
              "\n Hãy trở về màn hình chính chọn lại những số đẹp hơn và nhanh tay đặt vé - thanh toán nhé!"
            }
            {
              "\n Thay mặt BTC Chương trình Xin cảm ơn anh/chị đã quan tâm và tham gia cùng chương trình."
            }
          </Typography>
        </div>
      </DialogContent>
      <DialogActions className={classes.footerDialog}>
        <Grid container alignItems="center">
          <Grid item xs={11}></Grid>
          <Grid item xs={1}>
            <Button autoFocus onClick={handleClose} className={classes.button}>
              {"Đóng"}
            </Button>
          </Grid>
        </Grid>
      </DialogActions>
    </Dialog>
  );
};

export default ModalFailed;
