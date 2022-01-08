import { useCallback } from "react";
import { DragDropContext, DropResult } from "react-beautiful-dnd";
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
    <div className="relative flex p-20 bg-blue-500 w-screen h-screen">
      <Form />
      <DashboardForm />
      <DragDropContext onDragEnd={onDragEnd}>
        {Object.keys(list).map((key) => (
          <Board key={key} list={list[key]} title={key} />
        ))}
      </DragDropContext>
    </div>
  );
}

export default App;
