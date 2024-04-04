import React, { useEffect, useState } from 'react';
import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';

import { TodoList } from './components/TodoList';
import { TodoFilter } from './components/TodoFilter';
import { Loader } from './components/Loader';
import { Todo } from './types/Todo';
import { getTodos } from './api';
import { TodoModal } from './components/TodoModal';
import { Option } from './types/Option';

function getFilterTodos(
  todos: Todo[],
  sortOption: Option,
  query: string,
): Todo[] {
  let visibleTodos = [...todos];

  if (sortOption) {
    visibleTodos = visibleTodos.filter(todo => {
      switch (sortOption) {
        case Option.Active:
          return !todo.completed;

        case Option.Completed:
          return todo.completed;

        default:
          return true;
      }
    });
  }

  if (query) {
    visibleTodos = visibleTodos.filter(todo =>
      todo.title.toLowerCase().includes(query.toLowerCase()),
    );
  }

  return visibleTodos;
}

export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [selectedTodo, setSelectedTodo] = useState<Todo | null>(null);
  const [loading, setLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectOption, setSelectOption] = useState(Option.All);

  useEffect(() => {
    setLoading(true);

    getTodos()
      .then(setTodos)
      .finally(() => setLoading(false));
  }, []);

  const filteredTodos = getFilterTodos(todos, selectOption, searchQuery);

  return (
    <>
      <div className="section">
        <div className="container">
          <div className="box">
            <h1 className="title">Todos:</h1>

            <div className="block">
              <TodoFilter
                searchQuery={searchQuery}
                setSearchQuery={setSearchQuery}
                setSelectOption={setSelectOption}
              />
            </div>

            <div className="block">
              {loading && <Loader />}
              {!loading && (
                <TodoList
                  todos={filteredTodos}
                  setSelectedTodo={setSelectedTodo}
                  selectedTodo={selectedTodo}
                />
              )}
            </div>
          </div>
        </div>
        {selectedTodo?.userId && (
          <TodoModal todo={selectedTodo} setSelectedTodo={setSelectedTodo} />
        )}
      </div>
    </>
  );
};
