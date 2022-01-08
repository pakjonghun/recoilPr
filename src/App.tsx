import Todo from "./components/Todo";

function App() {
  return (
    <div className="flex  p-10 bg-blue-500 w-screen h-screen">
      <Todo status="doing" />
      <Todo status="done" />
      <Todo status="todo" />
    </div>
  );
}

export default App;
