import { atom } from "recoil";

const emailState = atom({
  key: "emailState",
  default: "",
});

export default emailState;
