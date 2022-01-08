import { prependListener } from "process";
import React, { FC } from "react";
import { Draggable } from "react-beautiful-dnd";
import { useSetRecoilState } from "recoil";
import { todoState, TypeTodo } from "../atoms";

export type TypeStatus = "todo" | "done" | "doing";

type CardProps = {
  list: TypeTodo;
  index: number;
  status: string;
};

const Card: FC<CardProps> = ({ list, index, status }) => {
  const setTodo = useSetRecoilState(todoState);

  const onDelete = (id: string) => {
    setTodo((pre) => ({
      ...pre,
      [status]: pre[status].filter((i) => i.id !== id),
    }));
  };

  return (
    <Draggable index={index} draggableId={list.id}>
      {(provider, snapshot) => {
        return (
          <li
            ref={provider.innerRef}
            {...provider.dragHandleProps}
            {...provider.draggableProps}
            className={`flex w-full mb-4 ${
              snapshot.isDragging ? "bg-red-400 shadow-md" : "bg-red-200"
            } rounded-xl shadow-md  cursor-pointer select-none transition-all duration-100 ease-in
            ${snapshot.draggingOver === "garbage" ? "opacity-30" : ""}
              `}
          >
            <img
              className="m-5 mr-2 w-10 h-10 rounded-full shadow-md"
              src="https://images.unsplash.com/photo-1641499414064-306123010a9b?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1471&q=80"
              alt="img"
            />
            <div className="p-3 w-full flex justify-between flex-col">
              <h2>{list.todo}</h2>
              <div className="w-full flex items-center mt-3 pr-3 justify-between">
                <button
                  onClick={() => onDelete(list.id)}
                  className=" text-sm cursor-pointer rounded-md bg-blue-300 p-1"
                >
                  Delete
                </button>
                <small>id:{list.todo}</small>
              </div>
            </div>
          </li>
        );
      }}
    </Draggable>
  );
};

export default React.memo(Card);
