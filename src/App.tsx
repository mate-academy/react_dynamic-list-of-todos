import React, { useEffect, useState } from 'react';
import './App.scss';
import './styles/general.scss';
import { getTodos } from './api';
import { TodoList } from './components/TodoList';
import { CurrentUser } from './components/CurrentUser';

export const App: React.FC = () => {
  const [
    selectedUserId,
    setSelectedUserId,
  ] = useState(0);

  const [todos, setTodos] = useState<Todo[]>([]);
  const [query, setQuery] = useState('');
  const [statusTodo, setStatusTodo] = useState('All');

  const chooseUser = (userId: number) => (
    setSelectedUserId(userId)
  );

  useEffect(() => {
    getTodos()
      .then(all => setTodos(all));
  }, []);

  const filteredTodos
  = todos.filter(({ title }) => title.toLowerCase()
    .includes(query.toLowerCase()));

  let showTodos = filteredTodos;

  const changeStatusTodo = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setStatusTodo(event.target.value);
  };

  const preparedTodo = () => {
    switch (statusTodo) {
      case 'All':
        return showTodos;
      case 'Completed':
        return filteredTodos.filter(({ completed }) => completed);
      case 'Active':
        return filteredTodos.filter(({ completed }) => !completed);

      default:
        return showTodos;
    }
  };

  showTodos = preparedTodo();

  return (
    <div className="App">

      <div className="App__sidebar">
        <form className="App__form">
          <p>Select Todos</p>
          <input
            onChange={(event) => setQuery(event.target.value)}
            value={query}
            type="text"
            id="search-query"
            className="App__input"
            placeholder="Type key-word"
            data-cy="filterByTitle"
          />

          <select
            name="todoFilter"
            value={statusTodo}
            className="App__select"
            onChange={changeStatusTodo}
          >
            <option>All</option>
            <option>Completed</option>
            <option>Active</option>
          </select>
        </form>

        <TodoList
          todos={showTodos}
          chooseUser={chooseUser}
        />
      </div>

      <div className="App__content">
        <div className="App__content-container">
          {selectedUserId ? (
            <CurrentUser
              currentUserId={selectedUserId}
              chooseUser={chooseUser}
            />
          ) : 'No user selected'}
        </div>
      </div>
    </div>
  );
};
