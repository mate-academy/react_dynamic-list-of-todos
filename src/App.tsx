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
  const [quary, setQuary] = useState('');
  const [task, setTask] = useState<Todo | null>(null);
  const [option, setOption] = useState<boolean | null>(null);

  useEffect(() => {
    setLoading(true);

    getTodos()
      .then((date) => {
        setTodos(date);
      })
      .catch(() => setTodos([]))
      .finally(() => setLoading(false));
  }, []);

  const handleQuery = (value: string) => {
    setQuary(value);
  };

  const handleOption = (value: boolean | null) => {
    setOption(value);
  };

  const showTodoModal = (todo: Todo) => {
    setTask(todo);
  };

  const closeTodoModal = () => {
    setTask(null);
  };

  return (
    <>
      <div className="section">
        <div className="container">
          <div className="box">
            <h1 className="title">Todos:</h1>

            <div className="block">
              <TodoFilter
                handleQuery={handleQuery}
                handleOption={handleOption}
              />
            </div>

            <div className="block">
              {loading && <Loader />}
              <TodoList
                todos={todos}
                quary={quary}
                option={option}
                showTodoModal={(todo) => showTodoModal(todo)}
                activeTaskId={task?.id || null}
              />
            </div>
          </div>
        </div>
      </div>

      {task
        && (
          <TodoModal
            todo={task}
            closeTodoModal={closeTodoModal}
          />
        )}
    </>
  );
};
