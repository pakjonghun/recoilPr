import { atom } from "recoil";

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

export const todoState = atom<TypeTodoState>({
  key: "todos",
  default: {
    todo: [
      makeTodo("b"),
      makeTodo("c"),
      makeTodo("dd"),
      makeTodo("e"),
      makeTodo("f"),
    ],
    doing: [makeTodo("g"), makeTodo("h")],
    done: [makeTodo("d")],
  },
});
