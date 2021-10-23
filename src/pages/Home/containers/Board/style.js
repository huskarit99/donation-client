import { makeStyles } from "@material-ui/core/styles";

const useStyles = (theme) =>
  makeStyles(() => ({
    div: {
      width: "100%",
      height: "40px",
      textAlign: "center",
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
    note: {
      fontSize: "16px",
      color: "black",
      textAlign: "left",
      whiteSpace: "pre-line",
      [theme.breakpoints.down(5200)]: {
        fontSize: "14px",
      },
    },
    div1: {
      display: "flex",
      minHeight: "230px",
      width: "100%",
      justifyContent: "center",
    },
    div2: {
      width: "50%",
      minWidth: "300px",
      height: "100%",
      textAlign: "center",
    },
    div3: {
      display: "flex",
      width: "100%",
      height: "50px",
      justifyContent: "center",
    },
    div4: {
      width: "100%",
      minHeight: "50%",
      overflow: "hidden",
      textAlign: "center",
    },
    typography: {
      color: "white",
      fontSize: "0.875rem",
    },
    pagination: {
      "& .MuiPaginationItem-page.Mui-selected": {
        backgroundColor: "green",
        color: "white",
      },
    },
    paper: {
      width: "100%",
      minHeight: "50%",
      backgroundColor: "rgba(0, 0, 0, 0)",
      boxShadow: "none",
    },
    buttonAdd: {
      background: "#504EDF",
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
