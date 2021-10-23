import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles(() => ({
  table: {
    overflow: "scroll",
    width: "100vw",
    maxHeight: "100vh",
  },
  button: {
    background: "#504EDF",
    borderRadius: "15px",
    color: "white",
    textTransform: "none",
    paddingTop: "8px",
    paddingBottom: "8px",
    height: "40px",
    width: "100px",
    "&:hover": {
      color: "red",
      background: "#00000000",
      fontWeight: "bold",
      border: "1px solid red",
    },
  },
}));

export default useStyles;
