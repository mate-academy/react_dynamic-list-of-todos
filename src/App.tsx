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
  const [loading, setLoading] = useState(false);
  const [activeTodo, setActiveTodo] = useState<Todo | null>();
  const [filteredPosts, setFilteredPosts] = useState<Todo[]>([]);
  const [inputValue, setInputValue] = useState('');

  useEffect(() => {
    setLoading(true);
    getTodos()
      .then(data => {
        setTodos(data);
        setFilteredPosts(data);
      })
      .catch(error => {
        {
          /* eslint-disable-next-line no-console */
          console.log(error);
        }
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  const handleShowTodo = (todo: Todo) => {
    setActiveTodo(todo);
  };

  const handleCloseModal = () => {
    setActiveTodo(null);
  };

  const handleFilteredSelectPosts = (value: string): void => {
    switch (value) {
      case 'all':
        setFilteredPosts(todos);
        break;
      case 'active':
        setFilteredPosts(todos.filter(todo => todo.completed === false));
        break;
      case 'completed':
        setFilteredPosts(todos.filter(todo => todo.completed === true));
        break;
      default:
        return;
    }
  };

  return (
    <>
      <div className="section">
        <div className="container">
          <div className="box">
            <h1 className="title">Todos:</h1>

            <div className="block">
              <TodoFilter
                filtered={handleFilteredSelectPosts}
                setInputValue={setInputValue}
              />
            </div>
            <div className="block">
              {loading ? (
                <Loader />
              ) : (
                <TodoList
                  todos={filteredPosts}
                  handleShowTodo={handleShowTodo}
                  activeTodo={activeTodo}
                  inputValue={inputValue}
                />
              )}
            </div>
          </div>
        </div>
      </div>
      {activeTodo && (
        <TodoModal todo={activeTodo} handleCloseModal={handleCloseModal} />
      )}
    </>
  );
};
