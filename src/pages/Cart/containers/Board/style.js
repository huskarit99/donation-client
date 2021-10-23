import { makeStyles } from "@material-ui/core/styles";

const useStyles = (theme) =>
  makeStyles(() => ({
    div: {
      width: "100%",
      minHeight: "100px",
      maxHeight: "220px",
      overflowY: "scroll",
      overflowX: "hidden",
      textAlign: "center",
      border: "1px black",
    },
    paper: {
      width: "100%",
      minHeight: "50%",
      backgroundColor: "rgba(0, 0, 0, 0)",
      boxShadow: "none",
    },
    button: {
      // background: "#504EDF",
      background: "green",
      borderRadius: "15px",
      color: "white",
      textTransform: "none",
      paddingTop: "8px",
      paddingBottom: "8px",
      height: "40px",
      width: "130px",
      "&:hover": {
        color: "red",
        background: "#00000000",
        fontWeight: "bold",
        border: "1px solid red",
      },
    },
  }));

export default useStyles;
