/* eslint-disable max-len */
import React, { useEffect, useState } from 'react';
import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';

import { TodoList } from './components/TodoList';
import { TodoFilter } from './components/TodoFilter';
import { TodoModal } from './components/TodoModal';
import { Loader } from './components/Loader';
import { Todo } from './types/Todo';
import { getTodos } from './services/getTodos';
import { FilteringType } from './types/FilteringType';

export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [todosLoading, setTodosLoading] = useState(false);
  const [filter, setFilter] = useState<FilteringType>(FilteringType.all);
  const [title, setTitle] = useState('');
  const [todoCard, setTodoCard] = useState<Todo>();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [iconId, setIconId] = useState(0);

  useEffect(() => {
    setTodosLoading(true);
    setTimeout(() => {
      getTodos().then((todo) => {
        setTodos(todo);
      })
        .finally(() => setTodosLoading(false));
    }, 300);
  }, []);

  return (
    <>
      <div className="section">
        <div className="container">
          <div className="box">
            <h1 className="title">Todos:</h1>

            <div className="block">
              <TodoFilter
                input={title}
                setInput={setTitle}
                selectedButton={filter}
                setSelectedButton={setFilter}
              />
            </div>

            <div className="block">
              {todosLoading && (
                <Loader />
              )}
              {!todosLoading && todos.length > 0 && (
                <TodoList
                  title={title}
                  todos={todos}
                  filter={filter}
                  iconId={iconId}
                  setIsModalOpen={setIsModalOpen}
                  setTodoCard={setTodoCard}
                  setIconId={setIconId}
                />
              )}
            </div>
          </div>
        </div>
      </div>

      {isModalOpen && (
        <TodoModal
          todoCard={todoCard}
          setIsModalOpen={setIsModalOpen}
          setIconId={setIconId}
        />
      )}

    </>
  );
};
