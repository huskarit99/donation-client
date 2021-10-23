import { makeStyles } from "@material-ui/core";

const useStyles = (theme) =>
  makeStyles(() => ({
    div1: {
      overflow: "hidden",
      width: "100vw",
      height: "100vh",
      display: "inline-flex",
    },
    div2: {
      width: "35%",
      height: "100%",
      [theme.breakpoints.down(900)]: {
        display: "none",
      },
    },
    div21: {
      width: "35%",
      height: "100%",
      position: "absolute",
    },
    div3: {
      position: "absolute",
      width: "100%",
      height: "150px",
      top: "40px",
      textAlign: "center",
    },
    div4: {
      overflowY: "scroll",
      width: "65%",
      minHeight: "100%",
      maxHeight: "100%",
      marginLeft: "30px",
      [theme.breakpoints.down(900)]: {
        width: "100%",
      },
      [theme.breakpoints.down(325)]: {
        marginLeft: "15px",
      },
    },
    div5: {
      width: "100%",
      height: "70px",
    },
    note: {
      width: "100%",
      whiteSpace: "pre-line",
      height: "70px",
      [theme.breakpoints.down(900)]: {
        height: "90px",
      },
    },
    div6: {
      width: "100%",
      height: "45px",
    },
    div61: {
      width: "150px",
      height: "100%",
    },
    div62: {
      width: "100%",
      height: "100%",
      marginRight: "20px",
      textAlign: "right",
    },
    div7: {
      display: "flex",
      width: "100%",
      height: "50px",
      marginTop: "25px",
      marginBottom: "25px",
      justifyContent: "center",
    },
    avatar1: {
      position: "absolute",
      width: "100%",
      height: "100%",
      left: "0px",
      top: "0px",
    },
    textField: {
      width: "300px",
      "& .MuiFormLabel-root": {
        color: "black",
        fontWeight: "bold",
      },
      "& .MuiInputBase-root": {
        fontWeight: "bold",
      },
      "& .MuiFormLabel-root.Mui-disabled": {
        color: "black",
        fontWeight: "bold",
      },
      "& .MuiInputBase-root.Mui-disabled": {
        fontWeight: "bold",
      },
    },
    p1: {
      color: "white",
      fontWeight: "bold",
      fontSize: "50px",
      marginBottom: "20px",
      letterSpacing: "10px",
    },
    p2: {
      color: "white",
      fontWeight: "bold",
      fontSize: "80px",
      marginBottom: "20px",
      letterSpacing: "10px",
    },
    avatar2: {
      width: "330px",
      height: "150px",
    },
    undoBtn: {
      // background: "#504EDF",
      background: "green",
      borderRadius: "15px",
      color: "white",
      fontSize: "0.875rem",
      textTransform: "none",
      paddingTop: "8px",
      paddingBottom: "8px",
      height: "30px",
      width: "90px",
      "&:hover": {
        color: "red",
        background: "#00000000",
        fontWeight: "bold",
        border: "1px solid red",
      },
    },
    typography: {
      [theme.breakpoints.down(900)]: {
        fontSize: "0.875rem",
      },
    },
    bookBtn: {
      // background: "#504EDF",
      background: "green",
      borderRadius: "15px",
      color: "white",
      fontSize: "1.25rem",
      textTransform: "none",
      paddingTop: "8px",
      paddingBottom: "8px",
      height: "50px",
      width: "250px",
      "&:disabled": {
        color: "red",
        background: "#00000000",
        fontWeight: "bold",
        border: "1px solid red",
      },
      "&:hover": {
        color: "red",
        background: "#00000000",
        fontWeight: "bold",
        border: "1px solid red",
      },
    },
  }));

export default useStyles;
