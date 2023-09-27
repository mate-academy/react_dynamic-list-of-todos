/* eslint-disable max-len */
import React, { useEffect, useState } from 'react';
import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';

import { TodoList } from './components/TodoList';
import { TodoFilter } from './components/TodoFilter';
import { TodoModal } from './components/TodoModal';
import { Loader } from './components/Loader';
import { getTodos } from './api';
import { Todo } from './types/Todo';
import { Filter } from './types/Filter';

export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [modal, setModal] = useState(false);
  const [filter, setFilter] = useState<Filter>('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedTodo, setSelectedTodo] = useState<Todo | null>(null);
  const [selectedTodoId, setSelectedTodoId] = useState<number | null>(null);

  const visibleTodos = () => {
    const visible = [...todos].filter((todo) => {
      if (filter === 'active' && todo.completed) {
        return false;
      }

      if (filter === 'completed' && !todo.completed) {
        return false;
      }

      if (!todo.title.toLowerCase().includes(searchTerm.toLowerCase())) {
        return false;
      }

      return true;
    });

    return visible;
  };

  useEffect(() => {
    getTodos()
      .then((todo) => {
        setTodos(todo);
      })
      .finally(() => {
        setIsLoading(false);
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
                setFilter={setFilter}
                setSearchTerm={setSearchTerm}
                searchTerm={searchTerm}
              />
            </div>

            <div className="block">
              {isLoading ? (
                <Loader />
              ) : (
                <TodoList
                  todos={visibleTodos()}
                  setModal={setModal}
                  setSelectedTodo={setSelectedTodo}
                  selectedTodoId={selectedTodoId}
                  setSelectedTodoId={setSelectedTodoId}
                />
              )}
            </div>
          </div>
        </div>
      </div>
      {modal && (
        <TodoModal
          setModal={(isVisible: boolean) => {
            setModal(isVisible);
            if (!isVisible) {
              setSelectedTodoId(null);
            }
          }}
          todo={
            selectedTodo || {
              id: 0,
              title: '',
              completed: false,
              userId: 0,
            }
          }
        />
      )}
    </>
  );
};
