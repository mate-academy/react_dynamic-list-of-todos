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

export const enum Select {
  all = 'all',
  active = 'active',
  completed = 'completed',
}

export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [loading, setLoading] = useState(false);
  const [activeTodo, setActiveTodo] = useState<Todo | null>();
  const [inputValue, setInputValue] = useState('');
  const [selectValue, setSelectValue] = useState('all');

  useEffect(() => {
    setLoading(true);
    getTodos()
      .then(setTodos)
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

  const handleFilteredSelectPosts = (value: Select): Todo[] | null => {
    switch (value) {
      case Select.all:
        return todos;
      case Select.active:
        return todos.filter(todo => !todo.completed);
      case Select.completed:
        return todos.filter(todo => todo.completed);

      default:
        return null;
    }
  };

  const filteredPosts = (): Todo[] | null => {
    const filteredValue: Todo[] | null = handleFilteredSelectPosts(
      selectValue as Select,
    );

    if (!inputValue) {
      return filteredValue;
    } else {
      if (filteredValue) {
        return filteredValue.filter(todo =>
          todo.title.toLowerCase().includes(inputValue?.toLowerCase()),
        );
      }
    }

    return null;
  };

  const filter = filteredPosts() || [];

  return (
    <>
      <div className="section">
        <div className="container">
          <div className="box">
            <h1 className="title">Todos:</h1>

            <div className="block">
              <TodoFilter
                inputValue={inputValue}
                setInputValue={setInputValue}
                selectValue={selectValue}
                setSelectValue={setSelectValue}
              />
            </div>
            <div className="block">
              {loading ? (
                <Loader />
              ) : (
                <TodoList
                  todos={filter}
                  handleShowTodo={handleShowTodo}
                  activeTodo={activeTodo}
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
