import React, { useState, useEffect } from 'react';
import './App.scss';
import './styles/general.scss';
import { TodoList } from './components/TodoList';
import { CurrentUser } from './components/CurrentUser';
import { getTodos } from './api/api';

const App: React.FC = () => {
  const [selectedUserId, setSelectedUserId] = useState(0);
  const [todos, setTodos] = useState<Todo[]>([]);

  useEffect(() => {
    getTodos()
      .then(todosFromServer => {
        setTodos(todosFromServer);
      });
  }, []);

  return (
    <div className="App">
      <div className="App__sidebar">
        {todos.length > 0
          ? (
            <TodoList
              todos={todos}
              setSelectedId={setSelectedUserId}
            />
          ) : (
            <h2>Todos is Loading</h2>
          )}
      </div>

      <div className="App__content">
        <div className="App__content-container">
          {selectedUserId
            ? (
              <CurrentUser
                selectedId={selectedUserId}
                setClearId={() => setSelectedUserId(0)}
              />
            ) : (
              <h3>
                No user selected
              </h3>
            )}
        </div>
      </div>
    </div>
  );
};

export default App;
