import { atom } from "recoil";

const phoneNumberState = atom({
  key: "phoneNumberState",
  default: "",
});

export default phoneNumberState;
