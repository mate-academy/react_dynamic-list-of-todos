import React, {
  useCallback, useEffect, useMemo, useState,
} from 'react';
import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';

import { TodoList } from './components/TodoList';
import { TodoFilter } from './components/TodoFilter';
import { TodoModal } from './components/TodoModal';
import { getTodos } from './api';
import { Todo } from './types/Todo';
import { Loader } from './components/Loader';
import { Filter } from './types/EnumFilter';

export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [query, setQuery] = useState('');
  const [filter, setFilter] = useState(Filter.ALL);
  const [selectTodoID, setTodoID] = useState(0);

  useEffect(() => {
    getTodos()
      .then(setTodos);
  }, []);

  const handleSearch = useCallback((value: string) => {
    setQuery(value);
  }, [query]);

  const visibleTodos = todos
    .filter(todo => todo.title.toLocaleLowerCase()
      .includes(query.toLocaleLowerCase().trim()));

  const filteredTodos = useMemo(() => {
    switch (filter) {
      case Filter.COMPLETED:
        return visibleTodos.filter(todo => todo.completed === true);

      case Filter.ACTIVE:
        return visibleTodos.filter(todo => todo.completed === false);

      default:
        return visibleTodos;
    }
  }, [todos, query, filter]);

  const selectedTodo = useMemo(() => {
    const selectTodo = todos.find(todo => todo.id === selectTodoID) || null;

    return selectTodo;
  }, [selectTodoID, todos]);

  return (
    <>
      <div className="section">
        <div className="container">
          <div className="box">
            <h1 className="title">Todos:</h1>

            <div className="block">
              <TodoFilter
                onSearch={handleSearch}
                onFilter={setFilter}
                query={query}
              />
            </div>

            <div className="block">
              {todos.length === 0 && <Loader />}
              <TodoList
                todos={filteredTodos}
                selectedID={setTodoID}
                nowSelected={selectTodoID}
              />
            </div>
          </div>
        </div>
      </div>

      {selectTodoID && (
        <TodoModal
          closeModal={setTodoID}
          todo={selectedTodo}
        />
      )}
    </>
  );
};
