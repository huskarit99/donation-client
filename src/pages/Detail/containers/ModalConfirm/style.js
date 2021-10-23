import CloseIcon from "@material-ui/icons/Close";
import IconButton from "@material-ui/core/IconButton";
import { withStyles, makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import MuiDialogTitle from "@material-ui/core/DialogTitle";
import MuiDialogContent from "@material-ui/core/DialogContent";
import MuiDialogActions from "@material-ui/core/DialogActions";

const styles = (theme) => ({
  root: {
    margin: 0,
    padding: "0",
  },
  closeButton: {
    padding: "0",
    color: theme.palette.grey[500],
  },
});

const useStyles = makeStyles(() => ({
  title: {
    display: "flex",
    alignItems: "center",
    backgroundColor: "white",
    padding: "16px",
    "& .MuiTypography-root": {
      color: "#202124",
      fontSize: "1rem",
      fontWeight: "bold",
    },
  },
  div: {
    display: "inline-block",
    height: "40px",
  },
  bodyDialog: {
    display: "flex",
    alignItems: "center",
    height: "100px",
    backgroundColor: "white",
  },
  typography: {
    display: "inline",
    color: "#202124",
    fontSize: "0.875rem",
    alignItems: "center",
    height: "100%",
  },
  button: {
    background: "#3f51b5",
    color: "white",
    textTransform: "none",
    paddingRight: "20px",
    paddingLeft: "20px",
    "&:hover": {
      color: "#3f51b5",
      background: "#00000000",
      fontWeight: "bold",
      border: "1px solid #3f51b5",
    },
  },
  footerDialog: {
    display: "flex",
    height: "60px",
    alignItems: "center",
    backgroundColor: "white",
  },
}));

const DialogTitle = withStyles(styles)((props) => {
  const { children, classes, onClose, ...other } = props;
  return (
    <MuiDialogTitle disableTypography className={classes.root} {...other}>
      <div style={{ display: "flex", width: "100%", height: "100%" }}>
        <div style={{ display: "inline-block", width: "70%", height: "100%" }}>
          <div
            style={{
              display: "flex",
              width: "100%",
              height: "100%",
              justifyContent: "flex-start",
              alignItems: "center",
            }}
          >
            <Typography variant="h6">{children}</Typography>
          </div>
        </div>
        <div style={{ display: "inline-block", width: "30%", height: "100%" }}>
          <div
            style={{
              display: "flex",
              width: "100%",
              height: "100%",
              justifyContent: "flex-end",
            }}
          >
            {onClose ? (
              <IconButton
                aria-label="close"
                className={classes.closeButton}
                onClick={onClose}
              >
                <CloseIcon />
              </IconButton>
            ) : null}
          </div>
        </div>
      </div>
    </MuiDialogTitle>
  );
});

const DialogContent = withStyles((theme) => ({
  root: {
    padding: theme.spacing(2),
  },
}))(MuiDialogContent);

const DialogActions = withStyles(() => ({
  root: {
    margin: 0,
    padding: "16px 50px 16px 16px",
  },
}))(MuiDialogActions);

export { DialogContent, DialogActions, DialogTitle, useStyles };
