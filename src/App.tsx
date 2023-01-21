import React, { useEffect, useState } from 'react';
import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';

import { TodoList } from './components/TodoList';
import { TodoFilter } from './components/TodoFilter';
import { TodoModal } from './components/TodoModal';
import { Loader } from './components/Loader';
import { Todo } from './types/Todo';
import { getTodos } from './api';
import { Filter } from './types/Filter';

export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [loadingStatus, setLoadingStatus] = useState(true);
  const [filter, setFilter] = useState<string>(Filter.all);
  const [query, setQuery] = useState('');
  const [selectedTodo, setSelectedTodo] = useState<Todo | null>(null);

  useEffect(() => {
    getTodos()
      .then((response) => setTodos(response))
      .then(() => setLoadingStatus(false));
  }, []);

  const filteredTodos = () => {
    const querryResult = todos
      .filter(todo => todo.title.toLowerCase().includes(query.toLowerCase()));

    return querryResult.filter(todo => {
      switch (filter) {
        case Filter.all:
          return todo;

        case Filter.active:
          return !todo.completed;

        case Filter.completed:
          return todo.completed;

        default:
          return todo;
      }
    });
  };

  return (
    <>
      <div className="section">
        <div className="container">
          <div className="box">
            <h1 className="title">Todos:</h1>

            <div className="block">
              <TodoFilter
                filter={filter}
                query={query}
                setFilter={setFilter}
                setQuery={setQuery}
              />
            </div>

            <div className="block">
              {loadingStatus && (<Loader />)}
              <TodoList
                todos={filteredTodos()}
                checkedTodo={selectedTodo}
                onCheckedTodo={setSelectedTodo}
              />
            </div>
          </div>
        </div>
      </div>
      {selectedTodo && (
        <TodoModal
          todo={selectedTodo}
          onClose={() => setSelectedTodo(null)}
        />
      )}
    </>
  );
};
