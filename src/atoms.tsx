import { atom } from "recoil";
import { recoilPersist } from "recoil-persist";

export const makeTodo = (todo: string) => ({
  id: Math.random().toString(20).substring(0, 12),
  todo,
});

export type TypeTodo = {
  todo: string;
  id: string;
};

export type TypeTodoState = {
  [key: string]: TypeTodo[];
};

const { persistAtom } = recoilPersist();

export const todoState = atom<TypeTodoState>({
  key: "todos",
  default: {
    todo: [makeTodo("sample")],
    doing: [makeTodo("sample"), makeTodo("sample")],
    done: [makeTodo("sample")],
  },
  effects_UNSTABLE: [persistAtom],
});
