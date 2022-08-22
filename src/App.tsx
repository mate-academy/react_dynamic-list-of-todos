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
  const [todoIdToShow, setTodoIdToShow] = useState(0);
  const [filterMethod, setFilterMethod] = useState('all');
  const [userQuary, setUserQuary] = useState('');

  const onClick = (id:number) => setTodoIdToShow(id);
  const onChangeOption = (option: string) => {
    setFilterMethod(option);
  };

  const onChangeQuary = (quary: string) => setUserQuary(quary);

  const todo = todos.find(el => el.id === todoIdToShow);

  useEffect(
    () => {
      getTodos()
        .then(setTodos);
    },
    [],
  );

  let todosToShow = [...todos];

  switch (filterMethod) {
    case 'active':
      todosToShow = todos.filter(todoToShow => todoToShow.completed === false);
      break;

    case 'completed':
      todosToShow = todos.filter(todoToShow => todoToShow.completed === true);
      break;

    case 'all':
    default:
      break;
  }

  if (userQuary) {
    todosToShow = todosToShow.filter(task => task.title.toLowerCase().includes(userQuary.toLowerCase()));
  }

  return (
    <>
      <div className="section">
        <div className="container">
          <div className="box">
            <h1 className="title">Todos:</h1>

            <div className="block">
              <TodoFilter
                onChangeOption={onChangeOption}
                onChangeQuary={onChangeQuary}
              />
            </div>

            <div className="block">
              {todos.length === 0
                ? <Loader />
                : (
                  <TodoList
                    todos={todosToShow}
                    onShowClick={onClick}
                    activeId={todoIdToShow}
                  />
                )}
            </div>
          </div>
        </div>
      </div>

      {todo && (
        <TodoModal
          todo={todo}
          onCloseClick={onClick}
        />
      )}
    </>
  );
};
