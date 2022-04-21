import React, { useEffect, useMemo, useState } from 'react';
import './App.scss';
import './styles/general.scss';
import { TodoList } from './components/TodoList';
import { CurrentUser } from './components/CurrentUser';
import { getTodos } from './Api/api';

const App: React.FC = () => {
  const [
    selectedUserId,
    setSelectedUserId,
  ] = useState(0);
  const [todos, setTodos] = useState<Todo[]>([]);
  const [value, setValue] = useState('');
  const [sortBy, setSortBy] = useState('');
  const [randomSort, setRandomSort] = useState(false);

  useEffect(() => {
    getTodos()
      .then(res => {
        setTodos(res);
      });
  },
  []);

  const filteredByTitle = useMemo(() => {
    return todos.filter(todo => todo.title.includes(value));
  }, [value, todos]);

  const filteredByOption = useMemo(() => {
    switch (sortBy) {
      case 'completed':
        return filteredByTitle.filter(todo => todo.completed);
      case 'active':
        return filteredByTitle.filter(todo => !todo.completed);
      default:
        return filteredByTitle;
    }
  }, [filteredByTitle, sortBy]);

  const filteredByRandom = useMemo(() => {
    if (!randomSort) {
      return filteredByOption;
    }

    return filteredByOption.sort(() => 0.5 - Math.random());
  }, [randomSort, filteredByOption]);

  const changeRandomSort = () => {
    setRandomSort(curr => !curr);
  };

  const removeUser = () => {
    setSelectedUserId(0);
  };

  const selectUser = (id: number) => {
    setSelectedUserId(id);
  };

  const changeValue = (event: React.ChangeEvent<HTMLInputElement>) => {
    setValue(event.target.value);
  };

  const changeSortBy = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSortBy(event.target.value);
  };

  return (
    <div className="App">
      <div className="App__sidebar">
        {todos.length > 0
          ? (
            <TodoList
              todos={filteredByRandom}
              userId={selectedUserId}
              selectUser={selectUser}
              value={value}
              changeValue={changeValue}
              sortBy={sortBy}
              changeSortBy={changeSortBy}
              changeRandomSort={changeRandomSort}
              randomSort={randomSort}
            />
          )
          : 'No todos yet'}
      </div>

      <div className="App__content">
        <div className="App__content-container">
          {selectedUserId ? (
            <CurrentUser
              userId={selectedUserId}
              removeUser={removeUser}
            />
          ) : 'No user selected'}
        </div>
      </div>
    </div>
  );
};

export default App;
