/* eslint-disable max-len */
import React, { useEffect, useState } from 'react';
import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';

import { Todo } from './types/Todo';
import { TodoList } from './components/TodoList';
import { TodoFilter } from './components/TodoFilter';
import { TodoModal } from './components/TodoModal';
import { Loader } from './components/Loader';
import { getTodos } from './api';

export const App: React.FC = () => {
  const [allToodo, setAllToodo] = useState<Todo[]>([]);
  const [filterToodo, setFilterToodo] = useState(allToodo);
  const [visibleToodo, setVisibleToodo] = useState(filterToodo);
  const [selectUserId, setSelectUserId] = useState(0);
  const [selectTodoId, setSelectTodoId] = useState(0);
  const [formItems, setFormItems] = useState({ statusSelect: 'all', input: '' });
  const selectItems = (UserId: number, todoId: number) => {
    setSelectUserId(UserId);
    setSelectTodoId(todoId);
  };

  const hanldleChange = (key: string, value: string) => {
    setFormItems(prev => ({
      ...prev,
      [key]: value,
    }));
  };

  const handleSelect = () => {
    switch (true) {
      case formItems.statusSelect === 'active':
        setFilterToodo(allToodo.filter(todo => !todo.completed));
        break;

      case formItems.statusSelect === 'completed':
        setFilterToodo(allToodo.filter(todo => todo.completed));
        break;

      default:
        setFilterToodo(allToodo);
    }
  };

  const handleSearch = () => {
    setVisibleToodo(filterToodo.filter(todo => todo.title.toLocaleLowerCase()
      .includes(formItems.input.toLocaleLowerCase())));
  };

  useEffect(() => {
    getTodos().then(res => setAllToodo(res));
  }, []);

  useEffect(() => {
    handleSelect();
  }, [formItems, allToodo]);

  useEffect(() => {
    handleSearch();
  }, [filterToodo, formItems]);

  return (
    <>
      <div className="section">
        <div className="container">
          <div className="box">
            <h1 className="title">Todos:</h1>

            <div className="block">
              <TodoFilter
                valueFormItems={formItems}
                hanldleChange={hanldleChange}
              />
            </div>

            <div className="block">
              {allToodo.length !== 0 ? (
                <TodoList
                  todos={visibleToodo}
                  selectTodo={selectTodoId}
                  selectItems={selectItems}
                />
              ) : <Loader />}
            </div>
          </div>
        </div>
      </div>

      {selectUserId && (
        <TodoModal
          selectUser={selectUserId}
          selectTodo={selectTodoId}
          selectItems={selectItems}
        />
      )}
    </>
  );
};
