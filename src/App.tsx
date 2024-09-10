import React, { useEffect, useState } from 'react';
import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';

import { TodoList } from './components/TodoList';
import { TodoFilter } from './components/TodoFilter';
import { TodoModal } from './components/TodoModal';
import { Todo } from './types/Todo';
import { Loader } from './components/Loader';
import { getTodos } from './api';
import { Filter } from './types/FilterEnum';

export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [query, setQuery] = useState('');
  const [filter, setFilter] = useState<Filter>(Filter.all);
  const [loader, setLoader] = useState(false);
  const [selectedTodo, setSelectedTodo] = useState<Todo | null>(null);

  const handleClose = () => {
    setSelectedTodo(null);
  };

  const handleSelectTodo = (todo: Todo) => {
    setSelectedTodo(todo);
  };

  const handleChangeTitle = (event: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(event.target.value);
  };

  useEffect(() => {
    setLoader(true);
    getTodos()
      .then(setTodos)
      .finally(() => setLoader(false));
  }, []);

  const filteredTodos = todos
    .filter(todo => {
      if (filter === Filter.active) {
        return !todo.completed;
      }

      if (filter === Filter.completed) {
        return todo.completed;
      }

      return true;
    })
    .filter(todo => todo.title.toLowerCase().includes(query.toLowerCase()));

  return (
    <>
      <div className="section">
        <div className="container">
          <div className="box">
            <h1 className="title">Todos:</h1>

            <div className="block">
              <TodoFilter
                query={query}
                onChangeTitle={handleChangeTitle}
                setFilter={setFilter}
                setQuery={setQuery}
              />
            </div>

            <div className="block">
              {loader && <Loader />}
              {!loader && !!todos.length && (
                <TodoList
                  todos={filteredTodos}
                  selectedTodo={selectedTodo}
                  onSelect={handleSelectTodo}
                />
              )}
            </div>
          </div>
        </div>
      </div>

      {selectedTodo && (
        <TodoModal
          userId={selectedTodo.userId}
          todo={selectedTodo}
          onClose={handleClose}
        />
      )}
    </>
  );
};
