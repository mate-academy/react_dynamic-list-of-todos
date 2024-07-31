import React, { useEffect, useState } from 'react';
import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';

import { TodoList } from './components/TodoList';
import { TodoFilter } from './components/TodoFilter';
import { TodoModal } from './components/TodoModal';
import { Todo } from './types/Todo';
import { Loader } from './components/Loader';
import { getTodos } from './api';

export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [query, setQuery] = useState('');
  const [filter, setFilter] = useState('all');
  const [loader, setLoader] = useState(false);

  const [selectedUserId, setSelectedUserId] = useState<number | null>(null);
  const [selectedTodo, setSelectedTodo] = useState<Todo | null>(null);

  const handleClose = () => {
    setSelectedUserId(null);
    setSelectedTodo(null);
  };

  const handleSelectUser = (userId: number, todo: Todo) => {
    setSelectedUserId(userId);
    setSelectedTodo(todo);
  };

  const handlChangeTitle = (event: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(event.target.value);
  };

  useEffect(() => {
    setLoader(true);
    getTodos()
      .then(setTodos)
      .finally(() => setLoader(false));
  }, []);

  const filteredTodos = todos
    .filter(todo => {
      if (filter === 'active') {
        return !todo.completed;
      }

      if (filter === 'completed') {
        return todo.completed;
      }

      return true;
    })
    .filter(todo => todo.title.toLowerCase().includes(query.toLowerCase()));

  return (
    <>
      <div className="section">
        <div className="container">
          <div className="box">
            <h1 className="title">Todos:</h1>

            <div className="block">
              <TodoFilter
                query={query}
                onChangeTitle={handlChangeTitle}
                setFilter={setFilter}
                setQuery={setQuery}
              />
            </div>

            <div className="block">
              {loader && <Loader />}
              {!loader && todos.length > 0 && (
                <TodoList
                  todos={filteredTodos}
                  selectedTodo={selectedTodo}
                  onSelect={handleSelectUser}
                />
              )}
            </div>
          </div>
        </div>
      </div>

      <TodoModal
        userId={selectedUserId}
        todo={selectedTodo}
        onClose={handleClose}
      />
    </>
  );
};
