import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles(() => ({
  div1: {
    display: "block",
    minWidth: "100vw",
    minHeight: "100vh",
    marginLeft: "20px",
    paddingRight: "20px",
    marginTop: "10px",
    overflow: "scroll",
  },
  div2: {
    maxWidth: "500px",
    minWidth: "100px",
    marginBottom: "20px",
  },
  table: {
    minWidth: "100px",
    maxHeight: "500px",
  },
  buttonConfirm: {
    background: "red",
    borderRadius: "15px",
    color: "white",
    textTransform: "none",
    paddingTop: "8px",
    paddingBottom: "8px",
    height: "40px",
    minWidth: "100px",
    "&:hover": {
      color: "red",
      background: "#00000000",
      fontWeight: "bold",
      border: "1px solid red",
    },
  },
  buttonUnConfirm: {
    background: "#504EDF",
    borderRadius: "15px",
    color: "white",
    textTransform: "none",
    paddingTop: "8px",
    paddingBottom: "8px",
    height: "40px",
    minWidth: "100px",
    "&:hover": {
      color: "red",
      background: "#00000000",
      fontWeight: "bold",
      border: "1px solid red",
    },
  },
}));

export default useStyles;
