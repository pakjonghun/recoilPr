import React, { FC } from "react";
import { Draggable, Droppable } from "react-beautiful-dnd";
import { TypeTodo } from "../atoms";
import Card from "./Card";

type BoardProps = {
  list: TypeTodo[];
  title: string;
  index: number;
};

const Board: FC<BoardProps> = ({ index, list, title }) => {
  return (
    <Draggable index={index - 6000} draggableId={String(index - 6000).trim()}>
      {(outPro, outSnap) => {
        return (
          <div
            ref={outPro.innerRef}
            {...outPro.dragHandleProps}
            {...outPro.draggableProps}
          >
            <Droppable
              type={outSnap.isDragging ? String(index - 6000).trim() : ""}
              droppableId={title}
            >
              {(provider, snapshot) => {
                return (
                  <div className="h-full flex flex-col items-center min-w-96 m-10 p-4 bg-stone-200 rounded-md  ">
                    <h1 className=" mb-8 text-4xl font-bold">
                      {title.toUpperCase()}
                    </h1>
                    <ul
                      {...provider.droppableProps}
                      ref={provider.innerRef}
                      className={`flex flex-col items-center flex-grow w-full max-w-xs p-3 ${
                        snapshot.isDraggingOver
                          ? "bg-stone-300 shadow-md"
                          : "bg-stone-200"
                      } overflow-y-scroll rounded-sm transition-all delay-200 ease-in`}
                    >
                      {list.map((item, index) => {
                        return (
                          <Card
                            key={item.id.trim()}
                            index={index}
                            list={item}
                            status={title}
                          />
                        );
                      })}
                      {provider.placeholder}
                    </ul>
                  </div>
                );
              }}
            </Droppable>
          </div>
        );
      }}
    </Draggable>
  );
};

export default React.memo(Board);
