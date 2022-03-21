import React, { useEffect, useState } from 'react';
import './App.scss';
import './styles/general.scss';
import { TodoList } from './components/TodoList';
import { CurrentUser } from './components/CurrentUser';

import { getTodos } from './api';

const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  // const [visibleTodos, setVisibleTodos] = useState<Todo[]>(todos);
  const [selectedUserId, setSelectedUserId] = useState(0);
  // const [query, setQuery] = useState('');
  // const [selectItems, setSelectItems] = useState('');

  useEffect(() => {
    getTodos()
      .then(todosFromServer => setTodos(todosFromServer));
  }, []);

  // let visibleTodos = todos.filter(todo => (todo.title.includes(query.toLocaleLowerCase())));

  // if (selectItems === 'Completed') {
  //   visibleTodos = visibleTodos.filter(item => (item.completed === true));
  // }

  // if (selectItems === 'Active') {
  //   visibleTodos = visibleTodos.filter(item => (item.completed === false));
  // }

  // useEffect(() => {
  //   setVisibleTodos(todos.filter(todo => (todo.title.includes(query.toLocaleLowerCase()))));
  // }, [query]);

  return (
    <div className="App">
      {/* <label htmlFor="search">
        Search by title
        <input
          type="text"
          id="search"
          value={query}
          onChange={(event) => setQuery(event.target.value)}
        />
      </label>
      <select
        value={selectItems}
        onChange={(event) => setSelectItems(event.target.value)}
      >
        <option value="All">All</option>
        <option value="Active">Active</option>
        <option value="Completed">Completed</option>
      </select> */}
      <div className="App__sidebar">
        <TodoList
          todos={todos}
          selectedUserId={selectedUserId}
          onSelect={(userID: number) => {
            setSelectedUserId(userID);
          }}
        />
      </div>

      <div className="App__content">
        <div className="App__content-container">
          {selectedUserId ? (
            <CurrentUser
              userId={selectedUserId}
              clearUser={() => setSelectedUserId(0)}
            />
          ) : 'No user selected'}
        </div>
      </div>
    </div>
  );
};

export default App;
