import React, { FC } from "react";
import { Draggable } from "react-beautiful-dnd";
import { TypeTodo } from "../atoms";

const Card: FC<{ list: TypeTodo[] }> = ({ list }) => {
  return (
    <>
      {list.map((i, idx) => (
        <Draggable key={i.id} index={idx} draggableId={i.id}>
          {(provider) => (
            <li
              ref={provider.innerRef}
              {...provider.dragHandleProps}
              {...provider.draggableProps}
              className="flex cursor-pointer bg-red-200 w-full h-22 rounded-xl shadow-md mb-4"
            >
              <img
                className="m-5 mr-8 w-10 h-10 rounded-full shadow-md"
                src="https://images.unsplash.com/photo-1641499414064-306123010a9b?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1471&q=80"
                alt="img"
              />
              <div className=" p-3 flex justify-between flex-col">
                <h2>{i.todo}</h2>
                <div className=" flex items-center mt-3 justify-between">
                  <button className=" text-sm cursor-pointer rounded-md bg-blue-300 p-1">
                    Fin
                  </button>
                  <small>id:1</small>
                </div>
              </div>
            </li>
          )}
        </Draggable>
      ))}
    </>
  );
};

export default React.memo(Card);
