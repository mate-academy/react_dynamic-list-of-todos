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
  const [visibleGoods, setVisibleGoods] = useState(todos);
  const [userId, setUserId] = useState(0);
  const [selectedTodo, setSelectedTodo] = useState<Todo | null>(null);

  useEffect(() => {
    getTodos()
      .then(todosFrom => {
        setTodos(todosFrom);
        setVisibleGoods(todosFrom);
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
                filterGoods={(showGoods) => setVisibleGoods(showGoods)}
                todos={todos}
              />
            </div>

            <div className="block">
              {visibleGoods.length > 0 && todos.length > 0
                && (
                  <TodoList
                    todos={visibleGoods}
                    selectedUserId={userId}
                    selectUserId={(newUserId) => setUserId(newUserId)}
                    selectedTodo={(todo) => setSelectedTodo(todo)}
                  />
                )}
              {visibleGoods.length === 0 && todos.length === 0 && <Loader />}
              {visibleGoods.length === 0 && todos.length > 0
                && (
                  <table className="table is-narrow is-fullwidth">
                    <thead>
                      <tr>
                        <th>#</th>
                        <th>
                          <span className="icon">
                            <i className="fas fa-check" />
                          </span>
                        </th>
                        <th>Title</th>
                        <th> </th>
                      </tr>
                    </thead>
                  </table>
                )}
            </div>
          </div>
        </div>
      </div>

      {userId !== 0
        && (
          <TodoModal
            userId={userId}
            selectedTodo={selectedTodo}
            closeTodoModal={() => setUserId(0)}
          />
        )}
    </>
  );
};
