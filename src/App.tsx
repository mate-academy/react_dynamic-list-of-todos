import React, {useState} from 'react';
import './App.css';
import TodoList from './components/TodoList';
import { PreparedTodo, Todo } from './components/types';
import { todosWithUsers } from './components/api'


const App: React.FC = () => {
  const [isLoaded, setLoaded] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [todos, setTodos] = useState<PreparedTodo[]>([]);
  const [sortedTodos, setSortedTodos] = useState<PreparedTodo[]>([]);

  const handleButtonClick = async () => {
    setIsLoading(true);

    await todosWithUsers().then(data => setTodos(data));
    await todosWithUsers().then(data => setSortedTodos(data));

    setLoaded(true);
  };

  const sortByTitle = () => {
    const sortedTodos = [...todos].sort((a,b) => a.title.localeCompare(b.title));
    setSortedTodos(sortedTodos);
  }

  const sortByCompleted = () => {
    const sortedTodos = [...todos].sort((a: Todo, b: Todo) => {
      return( Number(a.completed) - Number(b.completed))
    });
    setSortedTodos(sortedTodos);
  }

  const sortByName = () => {
    const sortedTodos = [...todos].sort((a,b) => a.user.name.localeCompare(b.user.name));
    setSortedTodos(sortedTodos);
  }


  return (
    <div className="App">
      <h1>Static list of todos</h1>
      {!isLoaded ? (
        <>
           <button
            type="button"
            onClick={handleButtonClick}
            disabled={isLoading}
           >
             {isLoading ? "loading..." : "Load"}
           </button>
      </>
      ) : (
        <>
        <div className="controls">
          <button className="controls__button" onClick={sortByTitle}>Sort by Title</button>
          <button className="controls__button" onClick={sortByCompleted}>Sort by Completed</button>
          <button className="controls__button" onClick={sortByName}>Sort by Name</button>
        </div>
      <div className="content">
        <TodoList preparedTodos={sortedTodos} />
      </div>
    </>
  )}
  </div>
  )
}

export default App;
