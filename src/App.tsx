/* eslint-disable max-len */
import React, { useEffect, useState } from 'react';
import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';

import { TodoList } from './components/TodoList';
import { TodoFilter } from './components/TodoFilter';
import { TodoModal } from './components/TodoModal';
import { Loader } from './components/Loader';
import { getTodos } from './api';
import { Todo } from './types/Todo';
import { Filter } from './types/Filter';

export const App: React.FC = () => {
  const [todoList, setTodoList] = useState<Todo[]>([]);
  const [loadingList, setLoadingList] = useState(true);
  const [filter, setFilter] = useState('all');
  const [query, setQuery] = useState('');
  const [selectedTodoId, setSelectedTodoId] = useState(0);

  const filteredTodos = todoList
    .filter(todo => todo.title.toLowerCase()
      .includes(query.toLowerCase()))
    .filter(todo => {
      switch (filter) {
        case Filter.Active:
          return !todo.completed;

        case Filter.Completed:
          return todo.completed;

        default:
          return todo;
      }
    });

  useEffect(() => {
    getTodos()
      .then(setTodoList)
      .finally(() => setLoadingList(false));
  }, []);

  const selectedTodo = todoList.find(todo => todo.id === selectedTodoId);

  return (
    <>
      <div className="section">
        <div className="container">
          <div className="box">
            <h1 className="title">Todos:</h1>

            <div className="block">
              <TodoFilter
                filter={filter}
                setFilter={setFilter}
                query={query}
                setQuery={setQuery}
              />
            </div>

            <div className="block">
              {loadingList && (<Loader />)}
              <TodoList
                filteredTodos={filteredTodos}
                setSelectedTodoId={setSelectedTodoId}
                selectedTodo={selectedTodo}
              />
            </div>
          </div>
        </div>
      </div>

      {selectedTodo && (
        <TodoModal
          selectedTodoId={selectedTodoId}
          selectedTodo={selectedTodo}
          setSelectedTodoId={setSelectedTodoId}
        />
      )}
    </>
  );
};
