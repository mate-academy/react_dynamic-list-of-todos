import React, {
  useCallback, useEffect, useState, useMemo,
} from 'react';
import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';

import { TodoList } from './components/TodoList';
import { TodoFilter } from './components/TodoFilter';
import { TodoModal } from './components/TodoModal';
import { Loader } from './components/Loader';

import { Todo } from './types/Todo';
import { Filter } from './enums/Filter';

import { getTodos } from './api';
import { debounce } from './helpers/debounce';

export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[] | []>([]);
  const [userId, setUserId] = useState(0);
  const [filterValue, setFilterValue] = useState(Filter.All);
  const [todo, setTodo] = useState<Todo | null>(null);
  const [query, setQuery] = useState('');
  const [appliedQuery, setAppliedQuery] = useState('');

  const applyQuery = useCallback(debounce(setAppliedQuery, 500), []);

  useEffect(() => {
    const fetchData = async () => {
      await getTodos()
        .then(result => setTodos(result));
    };

    fetchData();
  }, []);

  const filteredTodos = useMemo(() => (
    todos.filter(todoItem => {
      switch (filterValue) {
        case Filter.Active:
          return !todoItem.completed;

        case Filter.Completed:
          return todoItem.completed;

        default:
          return todoItem;
      }
    })
  ), [todos, filterValue]);

  const handleSelectUser = (id: number) => {
    setUserId(id);
  };

  if (!todos.length) {
    return <Loader />;
  }

  return (
    <>
      <div className="section">
        <div className="container">
          <div className="box">
            <h1 className="title">Todos:</h1>

            <div className="block">
              <TodoFilter
                query={query}
                onSetQuery={setQuery}
                onApplyQuery={applyQuery}
                filterValue={filterValue}
                onSelectFilter={setFilterValue}
              />
            </div>

            <div className="block">
              <TodoList
                selectedTodo={todo}
                appliedQuery={appliedQuery}
                todos={filteredTodos}
                onSelectUser={handleSelectUser}
                onSelectTodo={setTodo}
              />
            </div>
          </div>
        </div>
      </div>

      {userId > 0 && (
        <TodoModal
          userId={userId}
          todo={todo}
          onSelectUser={handleSelectUser}
          onSelectTodo={setTodo}
        />
      )}
    </>
  );
};
