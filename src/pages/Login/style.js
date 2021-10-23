import { makeStyles } from "@material-ui/core/styles";
import colorAlertEnum from "../../utils/enums/colorAlertEnum";

const useStyles = makeStyles(() => ({
  div1: {
    display: "flex",
    width: "100vw",
    height: "100vh",
    justifyContent: "center",
    alignItems: "center",
  },
  div2: {
    height: "120px",
    width: "100vw",
    textAlign: "center",
  },
  div3: {
    height: "40px",
    width: "100vw",
  },
  div4: {
    display: "flex",
    height: "60px",
    width: "100vw",
    alignItems: "center",
    justifyContent: "center",
  },
  textField: {
    margin: "0",
    width: "300px",
    border: "1px solid #84848A",
    borderRadius: "5px",
    "&:hover": {
      border: "1px solid #004c9e",
    },
    "& .MuiInputBase-input": {
      color: "black",
    },
  },
  p: {
    color: colorAlertEnum.ERROR,
    fontSize: "0.875rem",
    marginTop: "10px",
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
