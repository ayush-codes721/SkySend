import { atom } from "recoil";

export const authState = atom({
  default: false,
  key: "auth",
});

export const authToken = atom({
  default: "",
  key: "token",
});

export const userState = atom({
  default: null,
  key: "null",
});
