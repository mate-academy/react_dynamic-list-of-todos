/* eslint-disable max-len */
import React, { ChangeEvent, useEffect, useState } from 'react';
import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';

import { TodoList } from './components/TodoList';
import { TodoFilter } from './components/TodoFilter';
import { TodoModal } from './components/TodoModal';
import { Loader } from './components/Loader';
import { Todo } from './types/Todo';
import { getTodos } from './api';

function getFilteredTodos(
  todos: Todo[],
  searchValue: string,
  selectValue: string,
): Todo[] {
  let newTodos = [...todos];

  switch (selectValue) {
    case 'completed':
      newTodos = newTodos.filter(todo => (
        todo.completed
        && todo.title.toLowerCase().includes(searchValue.toLowerCase())
      ));
      break;

    case 'active':
      newTodos = newTodos.filter(todo => (
        !todo.completed
        && todo.title.toLowerCase().includes(searchValue.toLowerCase())
      ));
      break;

    case 'all':
      newTodos = newTodos.filter(todo => (
        todo.title.toLowerCase().includes(searchValue.toLowerCase())
      ));
      break;

    default: throw new Error('Error: Invalid selectValue');
  }

  return newTodos;
}

export const App: React.FC = () => {
  const [todosFromServer, setTodosFromServer] = useState<Todo[]>([]);
  const [visibleTodos, setVisibleTodos] = useState<Todo[]>([]);
  const [todoListLoaded, setTodolistLoaded] = useState(false);
  const [searchValue, setSearchValue] = useState('');
  const [selectValue, setSelectValue] = useState('all');
  const [selectedTodo, setSelectedTodo] = useState<Todo | null>(null);

  const handleSearchInput = (event: ChangeEvent<HTMLInputElement>) => {
    setSearchValue(event.target.value);
  };

  const handleClearSearchInput = () => {
    setSearchValue('');
  };

  const handleSelectInput = (event: ChangeEvent<HTMLSelectElement>) => {
    setSelectValue(event.target.value);
  };

  useEffect(() => {
    getTodos()
      .then(todos => {
        setTodosFromServer(todos);
        setTodolistLoaded(true);
      });
  }, []);

  useEffect(() => {
    setVisibleTodos(getFilteredTodos(todosFromServer, searchValue, selectValue));
  }, [searchValue, selectValue, todosFromServer]);

  return (
    <>
      <div className="section">
        <div className="container">
          <div className="box">
            <h1 className="title">Todos:</h1>

            <div className="block">
              <TodoFilter
                searchValue={searchValue}
                selectValue={selectValue}
                onSearchInput={handleSearchInput}
                onSelectInput={handleSelectInput}
                onClearSearch={handleClearSearchInput}
              />
            </div>

            <div className="block">
              {todoListLoaded
                ? (
                  <TodoList
                    todos={visibleTodos}
                    selectedTodoId={selectedTodo ? selectedTodo.id : null}
                    onSetSelectedTodo={setSelectedTodo}
                  />
                )
                : <Loader />}
            </div>
          </div>
        </div>
      </div>

      {selectedTodo
      && <TodoModal selectedTodo={selectedTodo} setSelectedTodo={setSelectedTodo} />}
    </>
  );
};
