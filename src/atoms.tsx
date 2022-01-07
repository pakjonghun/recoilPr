import { atom } from "recoil";

export const todoState = atom<any[]>({
  key: "todos",
  default: [1, 2, 3, 4, 5, 6],
});
