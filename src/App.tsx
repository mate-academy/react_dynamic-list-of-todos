/* eslint-disable max-len */
import React, { useEffect, useMemo, useState } from 'react';
import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';

import { TodoList } from './components/TodoList';
import { TodoFilter } from './components/TodoFilter';
import { TodoModal } from './components/TodoModal';
import { Loader } from './components/Loader';
import { getTodos } from './api';
import { Todo } from './types/Todo';

export const App: React.FC = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [todos, setTodos] = useState<Todo[]>([]);
  const [query, setQuery] = useState('');
  const [selectedBy, setSelectedBy] = useState('all');
  const [selectedTodo, setSelectedTodo] = useState<Todo | null>(null);
  const [selectedTodoId, setSelectedTodoId] = useState<number | null>(null);

  useEffect(() => {
    const delayTimer = setTimeout(() => setIsLoading(true), 200);

    getTodos()
      .then(setTodos)
      .catch(error => new Error(error.message))
      .finally(() => {
        clearTimeout(delayTimer);
        setTimeout(() => setIsLoading(false), 500);
      });
  }, []);

  const todosFilteredBy = useMemo(() => {
    let filteredTodos = todos;

    if (query !== '') {
      filteredTodos = filteredTodos.filter(todo =>
        todo.title.toLowerCase().includes(query.toLowerCase()),
      );
    }

    switch (selectedBy) {
      case 'active':
        filteredTodos = filteredTodos.filter(todo => !todo.completed);
        break;
      case 'completed':
        filteredTodos = filteredTodos.filter(todo => todo.completed);
        break;
      default:
        break;
    }

    return filteredTodos;
  }, [todos, query, selectedBy]);

  const handelShowModal = (todoID: number) => {
    setSelectedTodoId(todoID);

    if (todoID !== null) {
      setSelectedTodo(todosFilteredBy.find(todo => todo.id === todoID) ?? null);
      setShowModal(true);
    }
  };

  const handleHideModal = () => {
    setSelectedTodoId(null);
    setSelectedTodo(null);
    setShowModal(false);
  };

  return (
    <>
      <div className="section">
        <div className="container">
          <div className="box">
            <h1 className="title">Todos:</h1>

            <div className="block">
              <TodoFilter
                /* eslint-disable @typescript-eslint/no-shadow */
                onQuery={query => setQuery(query)}
                onSelectBy={selectedBy => setSelectedBy(selectedBy)}
              />
            </div>

            <div className="block">
              {isLoading ? (
                <Loader />
              ) : (
                <TodoList
                  todos={todosFilteredBy}
                  onShowModal={handelShowModal}
                  selectedTodoId={selectedTodoId}
                />
              )}
            </div>
          </div>
        </div>
      </div>

      {showModal && selectedTodo !== null && (
        <TodoModal todo={selectedTodo} onHideModal={handleHideModal} />
      )}
    </>
  );
};
