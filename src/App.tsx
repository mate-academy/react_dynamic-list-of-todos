/* eslint-disable max-len */
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
  const [filter, setFilter] = useState('all');
  const [query, setQuery] = useState<string>('');

  const [loading, setLoading] = useState(true);
  const [isOpen, setIsOpen] = useState(false);

  const [selectedTodo, setSelectedTodo] = useState<Todo>();
  const [selectedTodoUserId, setSelectedTodoUserId] = useState<number>(0);

  useEffect(() => {
    getTodos().then(fetchedTodos => {
      setTodos(fetchedTodos);
      setLoading(false);
    });
  }, []);

  function getFiltered(listOfTodos: Todo[]) {
    let copyTodos = [...listOfTodos];

    if (query) {
      copyTodos = copyTodos.filter(todo =>
        todo.title.toLowerCase().includes(query.toLowerCase()),
      );
    }

    switch (filter) {
      case 'all':
        return copyTodos;
      case 'active':
        return copyTodos.filter(todo => !todo.completed);
      case 'completed':
        return copyTodos.filter(todo => todo.completed);
    }

    return copyTodos;
  }

  return (
    <>
      <div className="section">
        <div className="container">
          <div className="box">
            <h1 className="title">Todos:</h1>

            <div className="block">
              <TodoFilter onFilter={setFilter} onQuery={setQuery} />
            </div>

            <div className="block">
              {loading ? (
                <Loader />
              ) : (
                <TodoList
                  todos={getFiltered(todos)}
                  selectedTodo={selectedTodo}
                  onSelectedTodo={setSelectedTodo}
                  onSelectedTodoUserId={setSelectedTodoUserId}
                  onIsOpen={setIsOpen}
                  isOpen={isOpen}
                />
              )}
            </div>
          </div>
        </div>
      </div>

      {selectedTodo && isOpen && (
        <TodoModal
          onIsOpen={setIsOpen}
          selectedTodo={selectedTodo}
          selectedTodoUserId={selectedTodoUserId}
        />
      )}
    </>
  );
};
