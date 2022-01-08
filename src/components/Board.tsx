import { FC } from "react";
import { Droppable } from "react-beautiful-dnd";
import { TypeTodo } from "../atoms";
import Card from "./Card";

type BoardProps = {
  list: TypeTodo[];
  title: string;
};

const Board: FC<BoardProps> = ({ list, title }) => {
  return (
    <div className=" flex flex-col items-center w-full m-10 p-4 bg-stone-200 rounded-md  ">
      <h1 className=" mb-8 text-4xl font-bold">{title.toUpperCase()}</h1>
      <Droppable droppableId={title}>
        {(provider) => (
          <ul
            {...provider.droppableProps}
            ref={provider.innerRef}
            className="flex flex-col items-center flex-grow w-full max-w-xs p-3 bg-stone-300 overflow-y-scroll rounded-sm"
          >
            {list.map((item, index) => (
              <Card key={item.id} index={index} list={item} />
            ))}
            {provider.placeholder}
          </ul>
        )}
      </Droppable>
    </div>
  );
};

export default Board;
