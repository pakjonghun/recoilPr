import { useCallback } from "react";
import { DragDropContext, Droppable, DropResult } from "react-beautiful-dnd";
import { useRecoilState } from "recoil";
import { todoState, TypeTodo, TypeTodoState } from "./atoms";
import Board from "./components/Board";
import _ from "lodash";
import Form from "./components/Form";
import DashboardForm from "./components/DashboardForm";

function App() {
  const [list, setList] = useRecoilState(todoState);

  const onDragEnd = useCallback(
    (args: DropResult) => {
      const { destination, source } = args;

      if (destination?.index == null) return;

      const { index: DI, droppableId: DDI } = destination;
      const { index: SI, droppableId: SSI } = source;
      const start = SSI.split("-")[0];
      const end = DDI.split("-")[0];

      if (SSI.includes("-1")) {
        if (DDI === "garbage") {
          setList((pre) => {
            const newObj = _.cloneDeep(pre);
            delete newObj[start];
            return newObj;
          });

          return;
        }

        setList((pre) => {
          const newObj: TypeTodoState = {};
          for (let key in pre) {
            if (!pre[end] || !pre[start]) continue;
            if (key === start) newObj[end] = pre[end];
            if (key === end) newObj[start] = pre[start];
            newObj[key] = pre[key];
          }
          return newObj;
        });
        return;
      }

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

        {Object.keys(list).map((key, index) => (
          <Droppable key={String(index - 6000).trim()} droppableId={`${key}-1`}>
            {(outProvider, outSnapshot) => {
              return (
                <div
                  className=" flex"
                  ref={outProvider.innerRef}
                  {...outProvider.droppableProps}
                >
                  <Board index={index} list={list[key]} title={key} />
                </div>
              );
            }}
          </Droppable>
        ))}
      </DragDropContext>
    </div>
  );
}

export default App;
