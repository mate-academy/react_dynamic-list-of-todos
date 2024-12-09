/* eslint-disable max-len */
import React, { useEffect, useState } from 'react';
import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';

import { TodoList } from './components/TodoList';
import { TodoFilter } from './components/TodoFilter';
import { TodoModal } from './components/TodoModal';
import { Loader } from './components/Loader';

import { getTodos } from './services/todos';

import { Todo } from './types/Todo';
import { Visible } from './types/Visible';

export const App: React.FC = () => {
  const [todoList, setTodoList] = useState<Todo[]>([]);
  const [isListLoading, setIsListLoading] = useState<boolean>(false);
  const [listErrorMessage, setListErrorMessage] = useState<string>('');

  const [visible, setVisible] = useState<Visible>('all');
  const [filterBy, setFilterBy] = useState<string>('');

  const [activeTodo, setActiveTodo] = useState<Todo | null>(null);

  useEffect(() => {
    setIsListLoading(true);

    getTodos()
      .then(data => {
        setTodoList(data);
      })
      .catch(() => setListErrorMessage('Try again Later'))
      .finally(() => {
        setIsListLoading(false);
      });
  }, []);

  const currentTodoList = todoList.filter(el => {
    if (visible == 'all') {
      return el.title.toLowerCase().includes(filterBy.toLowerCase()) && el;
    } else if (visible == 'completed') {
      return (
        el.completed === true &&
        el.title.toLowerCase().includes(filterBy.toLowerCase()) &&
        el
      );
    }

    return (
      el.completed === false &&
      el.title.toLowerCase().includes(filterBy.toLowerCase()) &&
      el
    );
  });

  return (
    <>
      <div className="section">
        <div className="container">
          <div className="box">
            <h1 className="title">Todos:</h1>

            <div className="block">
              <TodoFilter
                visible={visible}
                setVisible={setVisible}
                filterBy={filterBy}
                setFilterBy={setFilterBy}
              />
            </div>

            <div className="block">
              {isListLoading && <Loader />}
              {!isListLoading && !listErrorMessage && todoList.length > 0 && (
                <TodoList
                  list={currentTodoList}
                  activeTodo={activeTodo}
                  setActiveTodo={setActiveTodo}
                />
              )}
            </div>
          </div>
        </div>
      </div>

      {activeTodo && <TodoModal todo={activeTodo} setTodo={setActiveTodo} />}
    </>
  );
};
