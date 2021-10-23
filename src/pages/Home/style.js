import { makeStyles } from "@material-ui/core/styles";

const useStyles = (theme) =>
  makeStyles(() => ({
    title: {
      fontSize: "35px",
      color: "green",
      [theme.breakpoints.down(520)]: {
        fontSize: "23px",
      },
    },
    note: {
      fontSize: "16px",
      color: "black",
      textAlign: "left",
      whiteSpace: "pre-line",
      [theme.breakpoints.down(5200)]: {
        fontSize: "14px",
      },
    },
    subTitle: {
      color: "green",
      fontSize: "28px",
      [theme.breakpoints.down(520)]: {
        fontSize: "20px",
      },
    },
    div1: {
      width: "100vw",
      height: "100vh",
      [theme.breakpoints.down(310)]: {
        display: "none",
      },
      overflowY: "scroll",
      overflowX: "hidden",
    },
    div2: {
      width: "100vw",
      height: "auto",
    },
    div3: {
      width: "100%",
      height: "auto",
    },
    avatar: {
      width: "100%",
      height: "auto",
    },
    div4: {
      width: "100%",
      height: "100vh",
    },
    div5: {
      width: "100%",
      height: "90px",
      textAlign: "center",
      margin: "20px 0 20px 0",
    },
    div6: {
      width: "100%",
      height: "50px",
      textAlign: "center",
    },
    div7: {
      width: "100%",
      minHeight: "50%",
      overflow: "hidden",
      textAlign: "center",
    },
    div8: {
      display: "flex",
      minHeight: "230px",
      width: "100%",
      marginTop: "7px",
      justifyContent: "center",
    },
    div9: {
      width: "50%",
      minWidth: "300px",
      height: "100%",
      textAlign: "center",
    },
    typography: {
      color: "white",
      fontSize: "0.875rem",
    },
    item: {
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
    },
    textField: {
      margin: "0",
      width: "90%",
      border: "1px solid #84848A",
      borderRadius: "5px",
      "&:hover": {
        border: "1px solid #004c9e",
      },
      "& .MuiInputBase-input": {
        color: "black",
      },
    },
    paper: {
      width: "100%",
      minHeight: "50%",
      backgroundColor: "rgba(0, 0, 0, 0)",
      boxShadow: "none",
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
