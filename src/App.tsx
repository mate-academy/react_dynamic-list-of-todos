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

export enum FilterType {
  All = 'all',
  Active = 'active',
  Completed = 'completed',
}

function getVisibleGoods(todos: Todo[], query: string, filter: string) {
  let newTodosList = [...todos];

  if (filter) {
    switch (filter) {
      case FilterType.Active:
        newTodosList = newTodosList.filter(todo => !todo.completed);
        break;
      case FilterType.Completed:
        newTodosList = newTodosList.filter(todo => todo.completed);
        break;
      case FilterType.All:
      default:
        break;
    }
  }

  if (query) {
    return newTodosList.filter(todo =>
      todo.title.toLowerCase().includes(query.toLowerCase().trim()),
    );
  }

  return newTodosList;
}

export const App: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const [todos, setTodos] = useState<Todo[]>([]);
  const [selectedTodo, setSelectedTodo] = useState<Todo | null>(null);
  const [showModal, setShowModal] = useState(false);

  const [query, setQuery] = useState('');
  const [filter, setFilter] = useState(FilterType.All);

  const visibleTodos: Todo[] = getVisibleGoods(todos, query, filter);

  useEffect(() => {
    setLoading(true);

    getTodos()
      .then(setTodos)
      .finally(() => setLoading(false));
  }, []);

  return (
    <>
      <div className="section">
        <div className="container">
          <div className="box">
            <h1 className="title">Todos:</h1>

            <div className="block">
              <TodoFilter
                query={query}
                setQuery={setQuery}
                setFilter={setFilter}
                filter={filter}
              />
            </div>

            <div className="block">
              {loading && <Loader />}
              <TodoList
                todos={visibleTodos}
                onSelected={setSelectedTodo}
                isSelected={setShowModal}
                selectedTodo={selectedTodo}
              />
            </div>
          </div>
        </div>
      </div>

      {showModal && (
        <TodoModal
          todo={selectedTodo}
          onSelected={setSelectedTodo}
          showModal={showModal}
          setShowModal={setShowModal}
        />
      )}
    </>
  );
};
