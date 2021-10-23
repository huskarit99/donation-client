import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles(() => ({
  root: {
    padding: "2px 4px",
    display: "flex",
    alignItems: "center",
    width: 250,
    marginRight: "20px",
  },
  input: {
    marginLeft: "20px",
    flex: 1,
  },
  iconButton: {
    padding: 10,
  },
  divider: {
    height: 28,
    margin: 4,
  },
  table: {
    overflow: "scroll",
    width: "100vw",
    maxHeight: "85vh",
  },
  buttonDelete: {
    height: "14px",
    minWidth: "14px",
    padding: "0",
  },
  buttonEdit: {
    height: "14px",
    marginRight: "10px",
    minWidth: "14px",
    padding: "0",
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
