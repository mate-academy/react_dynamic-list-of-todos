/* eslint-disable no-param-reassign */
import React, { useEffect, useState } from 'react';
import './App.scss';
import './styles/general.scss';
import { TodoList } from './components/TodoList/TodoList';
import { CurrentUser } from './components/CurrentUser';

import { getTodos } from './api';

import { Todo } from './react-app-env';

const App: React.FC = () => {
  const [filtered, setFiltered] = useState('');
  const [selectFilter, setSelectFilter] = useState('allTodos');
  const [selectUserId, setSelectUserId] = useState(0);

  const [todos, setTodos] = useState<Todo[]>([]);
  const [visibleTodos, setVisibleTodos] = useState<Todo[]>([]);

  useEffect(() => {
    getTodos()
      .then((todosFromAPI: Todo[]) => {
        setTodos(todosFromAPI);
        setVisibleTodos(todosFromAPI);
      });
  }, []);

  const selectNewUser = (id: number) => {
    setSelectUserId(id);
  };

  const changeCompleted = (todoId: number) => {
    const newVisibleTodo = [...visibleTodos].map((todo) => {
      if (todo.id === todoId) {
        todo.completed = !todo.completed;
      }

      return todo;
    });

    setVisibleTodos(newVisibleTodo);
  };

  const filteredUsers = () => {
    const filteredTodos = todos
      .filter(todo => {
        switch (selectFilter) {
          case 'completedTodos':
            return todo.completed;
          case 'notCompletedTodos':
            return !todo.completed;
          default:
            return todo;
        }
      }).filter(todo => todo.title.includes(filtered));

    setVisibleTodos(filteredTodos);
  };

  const setNewFilter = (value: string) => {
    setFiltered(value);
  };

  const newSelectFilter = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectFilter(e.target.value);
  };

  useEffect(() => filteredUsers(), [filtered, selectFilter, selectUserId]);

  return (
    <div className="App">
      <div className="App__sidebar">
        <button type="button" className="button" onClick={() => setSelectUserId(0)}>Clear</button>

        <TodoList
          todos={visibleTodos}
          selectId={selectNewUser}
          activeUser={selectUserId}
          changeCompleted={changeCompleted}
          setNewFilter={setNewFilter}
          filtered={filtered}
          selectFilter={selectFilter}
          setSelectFilter={newSelectFilter}
        />
      </div>

      <div className="App__content">
        <div className="App__content-container">
          {selectUserId ? (
            <CurrentUser userId={selectUserId} />
          ) : 'No user selected'}
        </div>
      </div>
    </div>
  );
};

export default App;
