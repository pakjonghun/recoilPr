import {
  Draggable,
  Droppable,
  DragDropContext,
  DropResult,
} from "react-beautiful-dnd";
import { useRecoilState, useRecoilValue } from "recoil";
import { todoState } from "./atoms";

function App() {
  const [list, setList] = useRecoilState(todoState);
  const onDragEnd = ({ destination, source }: DropResult) => {
    const destinationIndex = destination?.index;
    if (!destination || destinationIndex == null) return;

    setList((pre) => {
      console.log("before", pre);
      const newArray = [...pre];
      newArray.splice(source.index, 1);
      console.log("delete", newArray);
      newArray.splice(destination.index, 0, pre[source.index]);
      console.log("insert", newArray);
      return newArray;
    });
  };
  return (
    <div className="p-10 bg-blue-500 w-screen h-screen">
      <DragDropContext onDragEnd={onDragEnd}>
        <Droppable droppableId="drop1">
          {(provider) => (
            <ul
              {...provider.droppableProps}
              ref={provider.innerRef}
              className="rounded-md p-3 w-full max-w-xs flex flex-col items-center justify-center bg-stone-200"
            >
              <h1 className=" mb-4 text-4xl font-bold">Fint</h1>
              {list.map((i, x) => (
                <Draggable key={x} index={x} draggableId={x.toString()}>
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
                        <h2>{i}</h2>
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
              {provider.placeholder}
            </ul>
          )}
        </Droppable>
      </DragDropContext>
    </div>
  );
}

export default App;
