import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles(() => ({
  paper: {
    backgroundColor: "rgba(255,255,255,0.2)",
    width: "80%",
    height: "80%",
    borderRadius: "20px",
  },
  avatar: {
    width: "50%",
    height: "45%",
    fontSize: "0.8rem",
    textTransform: "uppercase",
    left: "24px",
    top: "0",
  },
  box: {
    width: "130px",
    height: "90px",
  },
  div: {
    display: "absolute",
    height: "100%",
    width: "100%",
  },
  closeBtn: {
    width: "20px",
    height: "auto",
    left: "80px",
    top: "-6px",
    "&:hover": {
      width: "23px",
      height: "auto",
    },
  },
}));

export default useStyles;
