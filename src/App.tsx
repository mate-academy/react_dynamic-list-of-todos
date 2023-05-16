/* eslint-disable max-len */
import React, { useEffect, useMemo, useState } from 'react';
import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';

import { TodoList } from './components/TodoList';
import { TodoFilter } from './components/TodoFilter';
import { TodoModal } from './components/TodoModal';
import { Loader } from './components/Loader';
import { Todo } from './types/Todo';
import { getTodos } from './api';
import { PrepaparedTodo } from './types/PreparedTodo';
import { FilterBy } from './types/FilterBy';

export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [query, setQuery] = useState('');
  const [filterBy, setFilterBy] = useState(FilterBy.ALL);
  const [selectedTodo, setSelectedTodo] = useState<PrepaparedTodo | null>(null);
  const [isModalOpen, setIsOpenModal] = useState(false);

  const handleCloseModal = () => {
    setSelectedTodo(null);
    setIsOpenModal(false);
  };

  useEffect(() => {
    getTodos()
      .then(todosFromServer => {
        setTodos(todosFromServer);
      });
  }, []);

  const filteredTodos = useMemo(() => (
    todos.filter(todo => {
      const filtered = todo.title.toLowerCase().includes(query.toLowerCase().trim());

      switch (filterBy) {
        case FilterBy.ACTIVE:
          return filtered && !todo.completed;
        case FilterBy.COMPLETED:
          return filtered && todo.completed;
        default:
          return filtered;
      }
    })), [todos, filterBy, query]);

  return (
    <>
      <div className="section">
        <div className="container">
          <div className="box">
            <h1 className="title">Todos:</h1>

            <div className="block">
              <TodoFilter
                query={query}
                onChange={setQuery}
                selectValue={filterBy}
                onSelect={setFilterBy}
              />
            </div>

            <div className="block">
              {!todos.length && <Loader />}

              <TodoList
                todos={filteredTodos}
                setTodo={setSelectedTodo}
                isOpen={isModalOpen}
                onOpen={setIsOpenModal}
              />
            </div>
          </div>
        </div>
      </div>
      {
        isModalOpen && (
          <TodoModal
            selectedTodo={selectedTodo}
            handleCloseModal={handleCloseModal}
          />
        )
      }
    </>
  );
};
