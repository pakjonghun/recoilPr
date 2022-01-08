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
  todo: TypeTodo[];
  doing: TypeTodo[];
  done: TypeTodo[];
};

export const todoState = atom<TypeTodoState>({
  key: "todos",
  default: {
    todo: [makeTodo("a"), makeTodo("b")],
    doing: [makeTodo("g"), makeTodo("h")],
    done: [makeTodo("d")],
  },
});
