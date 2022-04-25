import React, { useEffect, useMemo, useState } from 'react';
import './App.scss';
import './styles/general.scss';
import { SearchPanel } from './components/SearchPanel/SearchPanel';
import { TodoList } from './components/TodoList';
import { CurrentUser } from './components/CurrentUser';
import { getAllTodos } from './api';

const App: React.FC = () => {
  const [selectedUserId, setSelectedUserId] = useState(0);
  const [todoList, setTodoList] = useState<Todo[]>([]);
  const [query, setQuery] = useState('');
  const [selectedSort, setSelectSort] = useState('');
  const [random, setRandom] = useState(false);

  const loadTodos = async () => {
    const todos = await getAllTodos('/todos');

    setTodoList(todos);
  };

  useEffect(() => {
    loadTodos();
  }, []);

  const changeUserId = (userId: number) => {
    setSelectedUserId(userId);
  };

  const clearUserId = () => {
    setSelectedUserId(0);
  };

  const seachingValue = (event: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(event.target.value.toLowerCase());
  };

  const selectSort = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectSort(event.target.value);
  };

  const randomValue = () => {
    setRandom((prevState => {
      return !prevState;
    }));
  };

  const getVisibleTodos = () => {
    let todos = todoList.filter(todo => todo.title
      .toLowerCase().includes(query));

    let newTodos = todos;

    if (selectedSort !== '' && selectedSort !== 'all') {
      switch (selectedSort) {
        case 'all':
        case '':
          newTodos = todoList.filter(todo => todo.title
            .toLowerCase().includes(query));
          break;
        case 'completed':
          newTodos = todos.filter(todo => todo.completed);
          break;
        case 'not-complete':
          newTodos = todos.filter(todo => !todo.completed);
          break;
        default:
          break;
      }
    }

    todos = newTodos;

    return todos;
  };

  const filtredTodos = useMemo(
    getVisibleTodos,
    [todoList, query, selectedSort],
  );

  const preparedTodos = () => {
    if (!random) {
      return filtredTodos;
    }

    const shuffled = filtredTodos
      .map(value => ({ value, sort: Math.random() }))
      .sort((a, b) => a.sort - b.sort)
      .map(({ value }) => value);

    return shuffled;
  };

  const visibleTodos = useMemo(
    preparedTodos,
    [random, filtredTodos],
  );

  return (
    <div className="App">
      <div className="App__sidebar">
        <SearchPanel
          random={random}
          seachingValue={seachingValue}
          selectValue={selectSort}
          randomize={randomValue}
        />
        <TodoList
          todos={visibleTodos}
          selectedUserId={selectedUserId}
          selectUserId={changeUserId}
        />
      </div>

      <div className="App__content">
        <div className="App__content-container">
          {selectedUserId ? (
            <CurrentUser
              userId={selectedUserId}
              clear={clearUserId}
            />
          ) : 'No user selected'}
        </div>
      </div>
    </div>
  );
};

export default App;
