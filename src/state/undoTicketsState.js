import { atom } from "recoil";

const undoTicketsState = atom({
  key: "undoTicketsState",
  default: [],
});

export default undoTicketsState;
