import React, { useEffect, useState } from 'react';
import './App.scss';
import './styles/general.scss';
import { TodoList } from './components/TodoList';
import { CurrentUser } from './components/CurrentUser';
import { getTodos } from './api';

const App: React.FC = () => {
  const [
    selectedUserId,
    setSelectedUserId,
  ] = useState(0);

  const selectUser = (userId: number) => {
    setSelectedUserId(userId);
  };

  const [todos, setTodos] = useState<Todo[]>([]);
  const [filteredTodos, setFilteredTodos] = useState<Todo[]>([]);

  const getTodosFromServer = async () => {
    const todosFromServer = await getTodos();

    setTodos(todosFromServer);
    setFilteredTodos(todosFromServer);
  };

  const onFilterTitle = (title: string) => {
    setFilteredTodos([
      ...todos.filter(item => item.title.includes(title)),
    ]);
  };

  const onFilterStatus = (status: string) => {
    setFilteredTodos([
      ...todos.filter(item => {
        switch (status) {
          case 'all':
            return true;
            break;
          case 'completed':
            return item.completed;
            break;
          case 'active':
            return !item.completed;
            break;
          default:
            return false;
        }
      }),
    ]);
  };

  useEffect(() => {
    getTodosFromServer();
  }, []);

  return (
    <div className="App">
      <div className="App__sidebar">
        <TodoList
          todos={filteredTodos}
          selectUser={selectUser}
          onFilterTitle={onFilterTitle}
          onFilterStatus={onFilterStatus}
        />
      </div>

      <div className="App__content">
        <div className="App__content-container">
          {selectedUserId ? (
            <>
              <CurrentUser selectedUserId={selectedUserId} />
              <button
                type="button"
                data-cy="userButton"
                onClick={() => setSelectedUserId(0)}
              >
                Clear
              </button>
            </>
          ) : 'No user selected'}
        </div>
      </div>
    </div>
  );
};

export default App;
