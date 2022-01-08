import { useCallback } from "react";
import {
  DragDropContext,
  Draggable,
  Droppable,
  DropResult,
} from "react-beautiful-dnd";
import { useRecoilState } from "recoil";
import { todoState } from "./atoms";
import Board from "./components/Board";
import _ from "lodash";
import Form from "./components/Form";
import DashboardForm from "./components/DashboardForm";

function App() {
  const [list, setList] = useRecoilState(todoState);

  const onDragEnd = useCallback(
    ({ destination, source }: DropResult) => {
      if (destination?.index == null) return;

      const { index: DI, droppableId: DDI } = destination;
      const { index: SI, droppableId: SSI } = source;

      if (destination.droppableId === "garbage") {
        setList((pre) => {
          const newObj = _.cloneDeep(pre);
          newObj[SSI].splice(0, 1);
          return newObj;
        });
        return;
      }

      setList((pre) => {
        const newObj = _.cloneDeep(pre);
        newObj[SSI].splice(SI, 1);
        newObj[DDI].splice(DI, 0, pre[SSI][SI]);
        return newObj;
      });
    },
    [setList]
  );

  return (
    <div className="relative flex p-20 bg-blue-500 h-screen overflow-x-scroll">
      <DragDropContext onDragEnd={onDragEnd}>
        <div className="absolute top-2 left-2 flex items-center ">
          <Form />
          <DashboardForm />
          <Droppable droppableId="garbage">
            {(provider, snapshot) => {
              return (
                <div
                  ref={provider.innerRef}
                  {...provider.droppableProps}
                  className={`flex items-center py-3 px-5 ml-3 ${
                    snapshot.isDraggingOver ? "bg-gray-500" : "bg-indigo-700"
                  } text-white rounded-md transition-all ease-linear duration-150`}
                >
                  휴지통
                </div>
              );
            }}
          </Droppable>
        </div>

        {Object.keys(list).map((key) => (
          <Board key={key} list={list[key]} title={key} />
        ))}
      </DragDropContext>
    </div>
  );
}

export default App;
