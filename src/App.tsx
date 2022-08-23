/* eslint-disable max-len */
import React, { useEffect, useMemo, useState } from 'react';
import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';

import { TodoList } from './components/TodoList';
import { TodoFilter } from './components/TodoFilter';
import { TodoModal } from './components/TodoModal';
import { Loader } from './components/Loader';
import { getTodos } from './api';
import { Todo } from './types/Todo';

export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [selectedTodoId, setSelectedTodoId] = useState('');
  const [filterBy, setFilterBy] = useState('all');
  const [query, setQuery] = useState('');

  const onSelectTodo = (selectId: number) => {
    setSelectedTodoId(todos.find(todo => todo.id === selectId)?.id.toString() || '');
  };

  useEffect(() => {
    getTodos().then(setTodos);
  }, []);

  let filteredTodos = [...todos];

  if (filterBy === 'active') {
    filteredTodos = [...todos].filter(todo => todo.completed === false);
  } else if (filterBy === 'completed') {
    filteredTodos = [...todos].filter(todo => todo.completed === true);
  }

  const visibleTodos = useMemo(() => {
    return filteredTodos.filter(todo => todo.title.toLocaleLowerCase().includes(query.toLocaleLowerCase()));
  }, [filteredTodos, query]);

  return (
    <>
      <div className="section">
        <div className="container">
          <div className="box">
            <h1 className="title">Todos:</h1>

            <div className="block">
              <TodoFilter
                query={query}
                onApplyQuery={setQuery}
                filter={filterBy}
                onFilter={setFilterBy}
              />
            </div>

            <div className="block">
              <TodoList
                todos={visibleTodos}
                selectedTodoId={selectedTodoId}
                onSelectTodo={onSelectTodo}
              />
              {!todos.length && <Loader />}
            </div>
          </div>
        </div>
      </div>

      {selectedTodoId && (
        <TodoModal
          todos={todos}
          selectedTodoId={selectedTodoId}
          onSelectTodo={onSelectTodo}
        />
      )}
    </>
  );
};
