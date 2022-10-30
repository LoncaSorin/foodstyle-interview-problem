import './App.css';
import TodoList from "./containers/TodoList";
import TodoAppProvider from "./context/TodoContext";

function App() {
  return (
    <div className="App">
      <TodoAppProvider>
        <TodoList />
      </TodoAppProvider>
    </div>
  );
}

export default App;
