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

export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [loaded, setLoaded] = useState(false);
  const [selectValue, setSelectValue] = useState('all');
  const [filtredTodos, setFiltredTodos] = useState<Todo[]>([]);
  const [query, setQuery] = useState('');
  const [selectedTodo, setSelectedTodo] = useState<Todo>();

  const onModalClick = () => {
    setSelectedTodo(undefined);
  };

  useEffect(() => {
    setLoaded(false);
    getTodos()
      .then(todosFromApi => setTodos(todosFromApi))
      .finally(() => setLoaded(true));
  }, []);

  useEffect(() => {
    let localFiltredTodos: Todo[] = [];

    if (selectValue === 'active') {
      localFiltredTodos = todos.filter(todo => !todo.completed);
    }

    if (selectValue === 'completed') {
      localFiltredTodos = todos.filter(todo => todo.completed);
    }

    if (selectValue === 'all') {
      localFiltredTodos = [...todos];
    }

    localFiltredTodos = localFiltredTodos.filter(todo =>
      todo.title.toLowerCase().includes(query.toLowerCase()),
    );

    setFiltredTodos(localFiltredTodos);
  }, [todos, selectValue, query]);

  return (
    <>
      <div className="section">
        <div className="container">
          <div className="box">
            <h1 className="title">Todos:</h1>

            <div className="block">
              <TodoFilter
                selectValue={selectValue}
                onSelect={setSelectValue}
                onQueryChange={setQuery}
                query={query}
              />
            </div>

            <div className="block">
              {!loaded && <Loader />}
              <TodoList
                todos={filtredTodos}
                setSelectedTodo={setSelectedTodo}
                selectedTodo={selectedTodo}
              />
            </div>
          </div>
        </div>
      </div>

      {selectedTodo && (
        <TodoModal selectedTodo={selectedTodo} onModalClick={onModalClick} />
      )}
    </>
  );
};
