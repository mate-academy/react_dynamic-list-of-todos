import React, { useEffect, useState } from 'react';
import './App.scss';
import './styles/general.scss';
import { TodoList } from './components/TodoList';
import { CurrentUser } from './components/CurrentUser';
import { getTodos } from './api/api';

enum TodoStatus {
  Active = 'active',
  Completed = 'completed',
}

const App: React.FC = () => {
  const [selectedUserId, setSelectedUserId] = useState(0);
  const [todos, setTodos] = useState<Todo[]>([]);
  const [hasLoadingError, setHasLoadingError] = useState(false);
  const [hasDataLoaded, setHasDataLoaded] = useState(false);

  useEffect(() => {
    async function fatchingTodos() {
      setHasDataLoaded(true);

      try {
        const todosFromAPI = await getTodos();

        setTodos(todosFromAPI);
      } catch (error) {
        setHasDataLoaded(true);
        setHasLoadingError(true);
      }
    }

    fatchingTodos();
  }, []);

  const [query, setQuery] = useState('');
  const [selectValue, setSelectValue] = useState('');

  const prepearedTodos = () => {
    const loweredQuery = query.toLowerCase();

    const filteredTodosByInput = todos.filter(todo => (
      todo.title.toLowerCase().includes(loweredQuery)
    ));

    switch (selectValue) {
      case TodoStatus.Active:
        return filteredTodosByInput.filter(todo => !todo.completed);
      case TodoStatus.Completed:
        return filteredTodosByInput.filter(todo => todo.completed);

      default:
        return filteredTodosByInput;
    }
  };

  return (
    <div className="App">
      <div className="App__sidebar">
        {(!hasLoadingError && hasDataLoaded) && (
          <>
            <input
              type="text"
              onChange={(event) => setQuery(event.target.value)}
            />

            <select
              id="select"
              onChange={(event) => setSelectValue(event.target.value)}
              value={selectValue}
            >
              <option value="all">
                All
              </option>

              <option value="active">
                Active
              </option>

              <option value="completed">
                Completed
              </option>
            </select>

            <TodoList
              onSelect={setSelectedUserId}
              userId={selectedUserId}
              todos={prepearedTodos()}
            />
          </>
        )}

        {hasLoadingError && hasDataLoaded && (
          'Unable to load the data'
        )}

        {!hasDataLoaded && (
          'Loading...'
        )}
      </div>

      <div className="App__content">
        <div className="App__content-container">
          {selectedUserId ? (
            <CurrentUser userId={selectedUserId} onClear={setSelectedUserId} />
          ) : 'No user selected'}
        </div>
      </div>
    </div>
  );
};

export default App;
