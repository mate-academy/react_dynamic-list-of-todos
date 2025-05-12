/* eslint-disable max-len */
import React, { useEffect, useState } from 'react';
import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';

import { TodoList } from './components/TodoList';
import { TodoFilter } from './components/TodoFilter';
import { TodoModal } from './components/TodoModal';
import { Loader } from './components/Loader';
import { Todo } from './types/Todo';
import { getTodos } from './api';

const filterTodos = (
  todos: Todo[],
  searchQuery: string,
  status: string,
): Todo[] => {
  let filteredTodos = [...todos].filter(todo =>
    todo.title.toLocaleLowerCase().includes(searchQuery.toLocaleLowerCase()),
  );

  if (status === 'active') {
    filteredTodos = filteredTodos.filter(todo => !todo.completed);
  }

  if (status === 'completed') {
    filteredTodos = filteredTodos.filter(todo => todo.completed);
  }

  return filteredTodos;
};

export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[] | []>([]);
  const [filteredTodos, setFilteredTodos] = useState<Todo[] | []>([]);
  const [searchValue, setSearchValue] = useState('');
  const [selectValue, setSelectValue] = useState('all');
  const [isLoading, setIsLoading] = useState(true);
  const [selectedTodo, setSelectedTodo] = useState<Todo | null>(null);

  useEffect(() => {
    getTodos()
      .then(todosFromServer => {
        setTodos(todosFromServer);
      })
      .finally(() => setIsLoading(false));
  }, []);

  useEffect(() => {
    setFilteredTodos(filterTodos(todos, searchValue, selectValue));
  }, [searchValue, selectValue, todos]);

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
                setSearchValue={setSearchValue}
                setSelectValue={setSelectValue}
              />
            </div>

            <div className="block">
              {isLoading ? (
                <Loader />
              ) : (
                <TodoList
                  todos={filteredTodos}
                  selectedTodo={selectedTodo}
                  onSelect={setSelectedTodo}
                />
              )}
            </div>
          </div>
        </div>
      </div>

      {selectedTodo && (
        <TodoModal todo={selectedTodo} onClose={() => setSelectedTodo(null)} />
      )}
    </>
  );
};
