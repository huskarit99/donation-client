import { atom } from "recoil";
import stateOfAuthentication from "../utils/enums/stateOfAuthentication";

const isAuthenticatedState = atom({
  key: "isAuthenticatedState",
  default: stateOfAuthentication.PROCESSING,
});

export default isAuthenticatedState;
