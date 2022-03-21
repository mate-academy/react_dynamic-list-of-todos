import React, { useEffect, useState } from 'react';
import './App.scss';
import './styles/general.scss';
import { TodoList } from './components/TodoList';
import { CurrentUser } from './components/CurrentUser';
import { getTodos } from './apis/api';

enum TodoStatus {
  Active = 'active',
  Completed = 'completed',
}

const App: React.FC = () => {
  const [selectedUserId, setSelectedUserId] = useState(0);
  const [todos, setTodos] = useState<Todo[]>([]);
  const [query, setQuery] = useState('');
  const [filteredByStatus, setFilteredByStatus] = useState<string>('all');
  const [dataIsFetched, setDataIsFetched] = useState(false);
  const [dataError, setDataError] = useState(false);

  useEffect(() => {
    getTodos()
      .then(setTodos)
      .then(() => setDataIsFetched(true))
      .catch(() => setDataError(true));
  }, []);

  const searchByTitle = (event: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(event.target.value);
  };

  const filterByStatus = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setFilteredByStatus(event.target.value);
  };

  const filteredTodos = (() => {
    const lowerQuery = query.toLowerCase();
    const filteredTodo = todos.filter(todo => (
      todo.title.toLowerCase().includes(lowerQuery)
    ));

    switch (filteredByStatus) {
      case TodoStatus.Active:
        return filteredTodo.filter(todo => (
          todo.completed
        ));

      case TodoStatus.Completed:
        return filteredTodo.filter(todo => (
          !todo.completed
        ));

      default:
        return filteredTodo;
    }
  })();

  return (
    <div className="App">
      <div className="App__sidebar">
        <input
          type="text"
          placeholder="enter title"
          value={query}
          onChange={searchByTitle}
        />
        <select
          name="filterByStatus"
          id="selectFilterByStatus"
          value={filteredByStatus}
          onChange={filterByStatus}
        >
          <option
            value="all"
          >
            All
          </option>
          <option
            value="active"
          >
            active
          </option>
          <option
            value="completed"
          >
            completed
          </option>
        </select>

        {!dataIsFetched && (
          <div>
            Loading data
          </div>
        )}

        {dataError && dataIsFetched && (
          <div>
            Failed to load data
          </div>
        )}

        {!dataError && dataIsFetched && (
          <TodoList
            todos={filteredTodos}
            onUserSelectButton={setSelectedUserId}
            selectedUserId={selectedUserId}
          />
        )}

      </div>

      <div className="App__content">
        <div className="App__content-container">
          {selectedUserId ? (
            <CurrentUser
              userId={selectedUserId}
              selectUser={setSelectedUserId}
            />
          ) : 'No user selected'}
        </div>
      </div>
    </div>
  );
};

export default App;
