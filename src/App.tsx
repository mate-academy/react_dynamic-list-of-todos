import React, { useEffect, useState } from 'react';
import './App.scss';
import './styles/general.scss';
import { TodoList } from './components/TodoList';
import { CurrentUser } from './components/CurrentUser';
import { request } from './api';
import { Todo } from './types/types';

const App: React.FC = () => {
  const [selectedUserId, setSelectedUserId] = useState(0);
  const [todos, setTodos] = useState<Todo[]>([]);
  const [query, setQuery] = useState('');
  const [curentDisplay, setCurrentDisplay] = useState('all');
  const [todoDelay, setTodoDelay] = useState(true);

  const displayUser = (userId: number) => {
    setSelectedUserId(userId);
  };

  useEffect(() => {
    request('todos')
      .then(todosFromServer => {
        setTodos(todosFromServer);
        setTodoDelay(false);
      });
  }, []);

  const display = (format: string) => {
    setCurrentDisplay(format);
  };

  const search = (searchQuery: string) => {
    setQuery(searchQuery);
  };

  const filteredTodos = (() => {
    const filtredTodo = todos.filter(todo => (
      todo.title.toLowerCase().includes(query.toLowerCase())
    ));

    switch (curentDisplay) {
      case 'active':
        return filtredTodo.filter(todo => !todo.completed);

      case 'completed':
        return filtredTodo.filter(todo => todo.completed);

      default:
        return filtredTodo;
    }
  });

  const displayedTodos = filteredTodos();

  return (
    <div className="App">
      <div className="App__sidebar">
        <TodoList
          todos={displayedTodos}
          selectUser={displayUser}
          search={search}
          selectedUserId={selectedUserId}
          display={display}
          curentDisplay={curentDisplay}
          loading={todoDelay}
        />
      </div>

      <div className="App__content">
        <div className="App__content-container">
          {selectedUserId ? (
            <>
              <CurrentUser
                selectedUserId={selectedUserId}
              />
              <button
                type="button"
                className="button"
                onClick={() => {
                  setSelectedUserId(0);
                }}
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
