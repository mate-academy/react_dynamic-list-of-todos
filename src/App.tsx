import React, { useCallback, useEffect, useState } from 'react';
import './App.scss';
import './styles/general.scss';
import { TodoList } from './components/TodoList';
import { CurrentUser } from './components/CurrentUser';

import { getTodos } from './api';

const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [selectedUserId, setSelectedUserId] = useState(0);
  const [query, setQuery] = useState('');
  const [selectedValue, setSelectedValue] = useState('all');

  useEffect(() => {
    getTodos().then(setTodos);
  }, []);

  const handleChangeInput = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      setQuery(event.target.value);
    }, [],
  );

  const handleChangeSelect = useCallback(
    (event: React.ChangeEvent<HTMLSelectElement>) => {
      setSelectedValue(event.target.value);
    }, [],
  );

  const preparedTodos = () => {
    const filteredTodos = todos
      .filter(todo => todo.title.includes(query.toLowerCase()));

    if (selectedValue === 'active') {
      return filteredTodos.filter(todo => !todo.completed);
    }

    if (selectedValue === 'completed') {
      return filteredTodos.filter(todo => todo.completed);
    }

    return filteredTodos;
  };

  return (
    <div className="App">
      <div className="App__sidebar">
        <TodoList
          selectUserId={setSelectedUserId}
          loadedTodos={preparedTodos()}
          inputQuery={query}
          setInputQuery={handleChangeInput}
          selectedValue={selectedValue}
          handleChangeSelect={handleChangeSelect}
        />
      </div>

      <div className="App__content">
        <div className="App__content-container">
          {selectedUserId ? (
            <CurrentUser
              setSelectedUser={setSelectedUserId}
              userId={selectedUserId}
            />
          ) : 'No user selected'}
        </div>
      </div>
    </div>
  );
};

export default App;
