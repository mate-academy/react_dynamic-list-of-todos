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
  const [todos, setTodos] = useState<Todo[]>();
  const [selected, setSelected] = useState<Todo | null>(null);
  const [query, setQuery] = useState('');
  const [filter, setFilter] = useState('all');

  useEffect(() => {
    getTodos().then(setTodos);
  }, [todos]);

  const filtredTodos = () => {
    switch (filter) {
      case 'all':
        return todos;

      case 'active':
        return todos?.filter(todo => todo.completed === false);

      case 'completed':
        return todos?.filter(todo => todo.completed === true);

      default:
        return todos;
    }
  };

  const queryFilter = (todoList: Todo[] | undefined) => {
    return todoList
      ?.filter(todo => todo
        .title.toLowerCase().includes(query.toLowerCase().trim()));
  };

  const handleFilterChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setFilter(event.target.value);
  };

  const handleQueryChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(event.target.value);
  };

  const handleDeleteQuery = () => {
    setQuery('');
  };

  const handleSelectedChange = (item: Todo) => {
    setSelected(item);
  };

  const handleCloseTodo = () => {
    setSelected(null);
  };

  return (
    <>
      <div className="section" />
      <div className="container">
        <div className="box">
          <h1 className="title">Todos:</h1>

          <div className="block">
            <TodoFilter
              onQueryChange={handleQueryChange}
              onFilterChange={handleFilterChange}
              onDelete={handleDeleteQuery}
              query={query}
              filter={filter}
            />
          </div>

          <div className="block">
            {!todos
              ? <Loader />
              : (
                <TodoList
                  todos={queryFilter(filtredTodos())}
                  onTodoSelected={handleSelectedChange}
                  todoId={selected?.id}
                />
              )}

          </div>
        </div>
      </div>
      {selected && <TodoModal todo={selected} onClose={handleCloseTodo} />}
    </>
  );
};
