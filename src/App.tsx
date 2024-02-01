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
  const [selectedAction, setSelectedAction] = useState<Todo | null>(null);
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
        return todos?.filter(todo => !todo.completed);

      case 'completed':
        return todos?.filter(todo => todo.completed);

      default:
        return todos;
    }
  };

  const queryFilter = (todoList: Todo[]) => {
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
    setSelectedAction(item);
  };

  const handleCloseTodo = () => {
    setSelectedAction(null);
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
              ? <Loader data-cy="loader" />
              : (
                <TodoList
                  todos={queryFilter(filtredTodos())}
                  onTodoSelected={handleSelectedChange}
                  todoId={selectedAction?.id}
                />
              )}

          </div>
        </div>
      </div>
      {selectedAction
      && <TodoModal todo={selectedAction} onClose={handleCloseTodo} />}
    </>
  );
};
