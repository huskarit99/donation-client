import { atom } from "recoil";

const selectedTicketsState = atom({
  key: "selectedTicketsState",
  default: [],
});

export default selectedTicketsState;
