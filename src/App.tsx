/* eslint-disable max-len */
import React, { useEffect, useState } from 'react';
import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';

import { TodoList } from './components/TodoList';
import { TodoFilter } from './components/TodoFilter';
import { TodoModal } from './components/TodoModal';
import { Loader } from './components/Loader';
import { getTodos } from './api';
import { SelectCategory } from './types/SelectCategory';
import { Todo } from './types/Todo';
import { filterTodos } from './components/utils/filterTodos';

export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [query, setQuery] = useState('');
  const [selectTodoId, setSelectTodoId] = useState<number | null>(null);
  const [selectCategory, setSelectCategory] = useState<SelectCategory>(
    SelectCategory.all,
  );

  const selectedTodo = todos.find(todo => todo.id === selectTodoId);

  const filteredTodos = filterTodos(todos, { selectCategory, query });

  useEffect(() => {
    setIsLoading(true);

    getTodos()
      .then(data => setTodos(data))
      .finally(() => setIsLoading(false));
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
                setSelectCategory={setSelectCategory}
              />
            </div>

            <div className="block">
              {isLoading ? (
                <Loader />
              ) : (
                <TodoList
                  todos={filteredTodos}
                  selectTodoId={selectTodoId}
                  setSelectTodoId={setSelectTodoId}
                />
              )}
            </div>
          </div>
        </div>
      </div>

      {selectTodoId && (
        <TodoModal
          selectedTodo={selectedTodo}
          setSelectTodoId={setSelectTodoId}
        />
      )}
    </>
  );
};
