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
  const [isLoading, setOnLoading] = useState(true);
  const [sortType, setSortType] = useState<SortedType>(SortedType.all);

  useEffect(() => {
    getTodos()
      .then(todosFromServer => {
        setTodos(todosFromServer);
        setOnLoading(false);
      });
  }, []);

  const filteredTodos = todos.filter(todo => {
    switch (sortType) {
      case SortedType.completed:
        return todo.title.includes(query) && todo.completed === true;
      case SortedType.active:
        return todo.title.includes(query) && todo.completed === false;
      default:
        return todo.title.includes(query);
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
                setSort={setSortType}
                setQuery={setQuery}
                query={query}
              />
            </div>

            <div className="block">
              {isLoading && (
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
          onClose={setSelectedTodo}
          todo={selectedTodo}
        />
      )}
    </>
  );
};

export default App;
