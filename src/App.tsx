import React, { useEffect, useState } from 'react';
import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';

import { TodoList } from './components/TodoList';
import { TodoFilter } from './components/TodoFilter';
import { TodoModal } from './components/TodoModal';
import { Loader } from './components/Loader';
import { Todo } from './types/Todo';
import { getTodos } from './api';
import { FilterType } from './types/FilterType';

export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [queryFilter, setQueryFilter] = useState('');
  const [filterBy, setSelectStatus] = useState(FilterType.All);
  const [todoId, setTodoId] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      const todosFromServer = await getTodos();

      setTodos(todosFromServer);
      setIsLoading(false);
    };

    fetchData();
  }, []);

  const filteredTodos = todos.filter((todo) => {
    switch (filterBy) {
      case FilterType.Active:
        return !todo.completed;

      case FilterType.Completed:
        return todo.completed;

      default:
        return true;
    }
  });

  return (
    <>
      <div className="section">
        <div className="container">
          <div className="box">
            <h1 className="title">Todos:</h1>

            <div className="block">
              <TodoFilter
                selectStatus={filterBy}
                query={queryFilter}
                setSelectStatus={setSelectStatus}
                setQuery={setQueryFilter}
              />
            </div>

            <div className="block">
              {isLoading ? (
                <Loader />
              ) : (
                <TodoList
                  todos={filteredTodos}
                  selectedTodoId={todoId}
                  selectedTodo={setTodoId}
                />
              )}
            </div>
          </div>
        </div>
      </div>
      {todoId && (
        <TodoModal
          todoId={todoId}
          todos={filteredTodos}
          selectedTodo={setTodoId}
        />
      )}
    </>
  );
};
