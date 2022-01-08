import { useCallback } from "react";
import { DragDropContext, DropResult } from "react-beautiful-dnd";
import { useRecoilState } from "recoil";
import { todoState } from "./atoms";
import Board from "./components/Board";
import { TypeStatus } from "./components/Card";

function App() {
  const [list, setList] = useRecoilState(todoState);

  const onDragEnd = useCallback(({ destination, source }: DropResult) => {
    if (destination?.index == null) return;

    // setList((pre) => {
    //   const newArray = pre[destination.droppableId];
    //   newArray.splice(source.index, 1);
    //   newArray.splice(destination.index, 0, pre[destination.droppableId][source.index]);
    //   return { ...pre, [destination.droppableId]: newArray };
    // });
  }, []);

  return (
    <div className="flex  p-10 bg-blue-500 w-screen h-screen">
      <DragDropContext onDragEnd={onDragEnd}>
        {Object.keys(list).map((key, index) => (
          <Board key={index} list={list[key as TypeStatus]} title={key} />
        ))}
      </DragDropContext>
    </div>
  );
}

export default App;
