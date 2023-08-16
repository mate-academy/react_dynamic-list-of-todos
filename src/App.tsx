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

enum Filter {
  all = 'all',
  active = 'active',
  completed = 'completed',
}

export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [isOpenedModal, setIsOpenedModal] = useState(false);
  const [currentTodo, setCurrentTodo] = useState<Todo | null>(null);
  const [filter, setFilter] = useState<string>(Filter.all);
  const [query, setQuery] = useState('');

  const filtredByQuery = (items: Todo[]) => {
    return items.filter(item => item.title.includes(query));
  };

  const filteredTodos = (items: Todo[]) => {
    switch (filter) {
      case 'active': {
        const filtredItems = items.filter(item => !item.completed);

        return filtredByQuery(filtredItems);
      }

      case 'completed': {
        const filtredItems = items.filter(item => item.completed);

        return filtredByQuery(filtredItems);
      }

      default:
        return filtredByQuery(items);
    }
  };

  useEffect(() => {
    getTodos().then(setTodos);
  }, []);

  const onOpenModal = (todo: Todo) => {
    setIsOpenedModal(true);
    setCurrentTodo(todo);
  };

  return (
    <>
      <div className="section">
        <div className="container">
          <div className="box">
            <h1 className="title">Todos:</h1>

            <div className="block">
              <TodoFilter
                query={query}
                onSetFilter={setFilter}
                onChangeQuery={(q) => setQuery(q)}
              />
            </div>

            <div className="block">
              {!todos ? (
                <Loader />
              ) : (
                <TodoList
                  todos={filteredTodos(todos)}
                  openModal={(todo: Todo) => onOpenModal(todo)}
                  isOpenedModal={isOpenedModal}
                  idTodo={currentTodo?.id}
                />
              )}
            </div>
          </div>
        </div>
      </div>

      {isOpenedModal && (
        <TodoModal
          userId={currentTodo?.userId}
          idTodo={currentTodo?.id}
          titleTodo={currentTodo?.title}
          completed={currentTodo?.completed}
          onRemoveModal={() => setIsOpenedModal(false)}
        />
      )}
    </>
  );
};
