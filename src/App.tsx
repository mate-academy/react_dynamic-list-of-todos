import React, { useCallback, useEffect, useState } from 'react';
import './App.scss';
import './styles/general.scss';
import { getTodos } from './api';
import { TodoList } from './components/TodoList';
import { CurrentUser } from './components/CurrentUser';

const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [userSelected, setUserSelected] = useState<number | null>(null);
  const [query, setQuery] = useState('');
  const [selectedValue, setSelectedValue] = useState('all');

  const getRespons = useCallback(async () => {
    const data = await getTodos();

    setTodos(data);
  }, []);

  useEffect(() => {
    getRespons();
  }, []);

  const handleChangeInput = useCallback((
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    setQuery(event.target.value);
  }, []);

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
          setInputQuery={handleChangeInput}
          handleChangeSelect={handleChangeSelect}
          loadedTodos={preparedTodos()}
          selectUserId={setUserSelected}
          userId={userSelected}
          inputQuery={query}
          selectedValue={selectedValue}
        />
      </div>

      <div className="App__content">
        <div className="App__content-container">
          {userSelected ? (
            <CurrentUser
              setSelectedUser={setUserSelected}
              userId={userSelected}
            />
          ) : 'No user selected'}
        </div>
      </div>
    </div>
  );
};

export default App;
