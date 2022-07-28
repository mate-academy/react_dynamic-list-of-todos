/* eslint-disable max-len */
import React, { useEffect, useState } from 'react';
import { TodoList } from './components/TodoList';
import { TodoFilter } from './components/TodoFilter';
import { TodoModal } from './components/TodoModal';
import { Loader } from './components/Loader';
import { Todo } from './types/Todo';
import { getTodos } from './api';
import { SortedType } from './types/SortType';

const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [selectedTodo, setSelectedTodo] = useState<Todo | null>(null);
  const [query, setQuery] = useState('');
  const [onLoading, setOnLoading] = useState(true);
  const [sort, setSort] = useState<SortedType>(SortedType.all);
  let filteredTodos = [...todos];

  useEffect(() => {
    getTodos()
      .then(todosFromServer => {
        setTodos(todosFromServer);
        setOnLoading(false);
      });
  }, []);

  if (sort !== SortedType.all) {
    filteredTodos = sort === SortedType.completed
      ? todos.filter(todo => todo.completed === true)
      : todos.filter(todo => todo.completed === false);
  }

  filteredTodos = filteredTodos.filter(todo => todo.title.includes(query));

  return (
    <>
      <div className="section">
        <div className="container">
          <div className="box">
            <h1 className="title">Todos:</h1>

            <div className="block">
              <TodoFilter
                setSort={setSort}
                setQuery={setQuery}
                query={query}
              />
            </div>

            <div className="block">
              {onLoading && (
                <Loader />
              )}
              <TodoList
                todos={filteredTodos}
                setSelectedTodo={setSelectedTodo}
              />
            </div>
          </div>
        </div>
      </div>

      {selectedTodo && (
        <TodoModal
          setSelectedTodo={setSelectedTodo}
          todo={selectedTodo}
        />
      )}
    </>
  );
};

export default App;
