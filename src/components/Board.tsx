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
    <Droppable droppableId={title}>
      {(provider) => (
        <ul
          {...provider.droppableProps}
          ref={provider.innerRef}
          className=" h-100 m-10 rounded-md p-3 w-full max-w-xs flex flex-col items-center bg-stone-200"
        >
          <h1 className=" mb-8 text-4xl font-bold">{title.toUpperCase()}</h1>
          {list.map((item, index) => (
            <Card key={index} index={index} list={item} />
          ))}
          {provider.placeholder}
        </ul>
      )}
    </Droppable>
  );
};

export default Board;
