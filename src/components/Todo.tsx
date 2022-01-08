import React, { FC, useCallback } from "react";
import { DragDropContext, Droppable, DropResult } from "react-beautiful-dnd";
import { useRecoilState } from "recoil";
import { todoState } from "../atoms";
import Card from "./Card";
type Status = "todo" | "done" | "doing";

type TodoProps = { status: Status };

const Todo: FC<TodoProps> = ({ status }) => {
  const [list, setList] = useRecoilState(todoState);
  const onDragEnd = useCallback(
    ({ destination, source }: DropResult) => {
      if (destination?.index == null) return;
      setList((pre) => {
        const newArray = [...pre[status]];
        newArray.splice(source.index, 1);
        newArray.splice(destination.index, 0, pre[status][source.index]);
        return { ...pre, [status]: newArray };
      });
    },
    [setList, status]
  );

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <Droppable droppableId={status}>
        {(provider) => (
          <ul
            {...provider.droppableProps}
            ref={provider.innerRef}
            className="m-10 rounded-md p-3 w-full max-w-xs flex flex-col items-center bg-stone-200"
          >
            <h1 className=" mb-8 text-4xl font-bold">{status.toUpperCase()}</h1>
            <Card list={list[status]} />
            {provider.placeholder}
          </ul>
        )}
      </Droppable>
    </DragDropContext>
  );
};

export default Todo;
