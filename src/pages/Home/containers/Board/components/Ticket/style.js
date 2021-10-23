import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles(() => ({
  paper: {
    backgroundColor: "rgba(255,255,255,0.2)",
    width: "90%",
    height: "90%",
    borderRadius: "20px",
    // boxShadow: "none",
    "&:hover": {
      backgroundColor: "rgba(255,255,255,0.4)",
      width: "95%",
      height: "95%",
    },
  },
  avatar1: {
    width: "35%",
    height: "50%",
    fontSize: "0.85rem",
    textTransform: "uppercase",
  },
  avatar2: {
    width: "40%",
    height: "40%",
    fontSize: "1rem",
    textTransform: "uppercase",
  },
  box: {
    width: "150px",
    height: "100px",
  },
  container: {
    height: "100%",
    width: "100%",
  },
  item1: {
    height: "60%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  item2: {
    height: "40%",
    textAlign: "center",
    maxWidth: "100px",
  },
  item3: {
    height: "100%",
    width: "100%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
}));

export default useStyles;
