import React, { useEffect, useState } from 'react';
import './App.scss';
import './styles/general.scss';
import { TodoList } from './components/TodoList';
import { CurrentUser } from './components/CurrentUser';
import { addTodo, getTodos } from './api/todos';

const App: React.FC = () => {
  const [selectedUserId, setUserId] = useState(0);
  const [todos, setTodos] = useState<Todo[]>([]);

  const loadTodos = async () => {
    const todosFromServer = await getTodos();

    setTodos(todosFromServer);
  };

  useEffect(() => {
    const fetchTodos = async () => {
      await loadTodos();
    };

    fetchTodos();
  }, []);

  return (
    <div className="App">
      <div className="App__sidebar">
        <button
          type="button"
          onClick={async () => {
            const date = new Date();
            const title = `Todo ${date.toLocaleTimeString()}`;

            await addTodo(title, 3, Math.random() > 0.5);
            await loadTodos();
          }}
        >
          Add
        </button>

        <TodoList
          todos={todos}
          setUserId={setUserId}
        />
      </div>

      <div className="App__content">
        <div className="App__content-container">
          {selectedUserId ? (
            <CurrentUser
              userId={selectedUserId}
            />
          ) : 'No user selected'}
        </div>
      </div>
    </div>
  );
};

export default App;
