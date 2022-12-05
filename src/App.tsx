import React, {
  useMemo, useCallback, useEffect, useState,
} from 'react';
import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';

import { TodoList } from './components/TodoList';
import { TodoFilter } from './components/TodoFilter';
import { TodoModal } from './components/TodoModal';
import { Loader } from './components/Loader';
import { Todo } from './types/Todo';
import { TodosCategory } from './types/TodosCategory';
import { getTodos } from './api';

export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [selectedTodo, setSelectedTodo] = useState<Todo | null>(null);
  const [areTodosLoaded, setAreTodosLoaded] = useState(false);
  const [query, setQuery] = useState('');
  const [selectValue, setSelectValue] = useState<TodosCategory>(
    TodosCategory.All,
  );

  const chooseUser = useCallback((todo: Todo | null) => {
    setSelectedTodo(todo);
  }, []);

  const filterTodos = useMemo(() => {
    const todosMatchedQuery = todos.filter(({ title }) => {
      const lowerCasedTitle = title.toLowerCase();
      const lowerCasedQuery = query.toLowerCase();

      return lowerCasedTitle.includes(lowerCasedQuery);
    });

    return todosMatchedQuery.filter(todo => {
      switch (selectValue) {
        case TodosCategory.Active:
          return !todo.completed;

        case TodosCategory.Completed:
          return todo.completed;

        default:
          return todo;
      }
    });
  }, [todos, selectValue]);

  useEffect(() => {
    getTodos()
      .then(todosFromServer => {
        setTodos(todosFromServer);
        setAreTodosLoaded(true);
      })
      .catch(error => {
        throw new Error(error);
      });
  }, []);

  return (
    <>
      <div className="section">
        <div className="container">
          <div className="box">
            <h1 className="title">Todos:</h1>

            <div className="block">
              <TodoFilter
                selectValue={selectValue}
                setSelectValue={setSelectValue}
                query={query}
                setQuery={setQuery}
              />
            </div>

            <div className="block">
              {areTodosLoaded
                ? (
                  <TodoList
                    todos={filterTodos}
                    selectedTodo={selectedTodo}
                    onSelect={chooseUser}
                  />
                )
                : <Loader />}
            </div>
          </div>
        </div>
      </div>

      {selectedTodo && (
        <TodoModal
          todo={selectedTodo}
          onClose={() => chooseUser(null)}
        />
      )}
    </>
  );
};
