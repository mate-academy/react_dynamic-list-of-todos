/* eslint-disable max-len */
import React, { useEffect, useMemo, useState } from 'react';
import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';
import { TodoList } from './components/TodoList';
import { TodoFilter } from './components/TodoFilter';
import { TodoModal } from './components/TodoModal';
import { Loader } from './components/Loader';
import { getTodos, getUser } from './api';
import { Todo } from './types/Todo';
import { User } from './types/User';

function filterBySelect(
  selectValue: string,
  todos: Todo[],
) {
  switch (selectValue) {
    case 'active':
      return todos
        .filter(({ completed }) => completed === false);

    case 'completed':
      return todos
        .filter(({ completed }) => completed === true);

    default:
      return todos;
  }
}

function getTodo(todos: Todo[], id: number) {
  return todos.find(todo => todo.id === id);
}

export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [query, setQuery] = useState('');
  const [selectFilter, setSelectFilter] = useState('all');
  const [activeTodo, setActiveTodo] = useState<Todo | undefined>(undefined);
  const [activeUser, setActiveUser] = useState<User | null>(null);
  const [isOpenModal, setIsOpenModal] = useState(false);

  const handleQueryUpdate = (value: string) => {
    setQuery(value);
  };

  const handleSelectUpdate = (value: string) => {
    setSelectFilter(value);
  };

  const handleModal = (id?: number) => {
    setIsOpenModal(current => !current);

    if (id) {
      const newActiveTodo = getTodo(todos, id);

      setActiveTodo(newActiveTodo);
      const fetchUser = async () => {
        setActiveUser(await getUser(newActiveTodo?.userId));
      };

      fetchUser();
    } else {
      setActiveTodo(undefined);
      setActiveUser(null);
    }
  };

  useEffect(() => {
    const fetchTodos = async () => {
      setTodos(await getTodos());
    };

    fetchTodos();
  }, []);

  const filteredTodos = useMemo(() => {
    const filteredByQuery = [...todos.filter(({ title }) => {
      const lowerCaseTitle = title.toLocaleLowerCase();
      const lowerCaseQuery = query.toLocaleLowerCase();

      return lowerCaseTitle.includes(lowerCaseQuery);
    }),
    ];

    return filterBySelect(selectFilter, filteredByQuery);
  }, [query, todos, selectFilter]);

  return (
    <>
      <div className="section">
        <div className="container">
          <div className="box">
            <h1 className="title">Todos:</h1>

            <div className="block">
              <TodoFilter
                query={query}
                handleQueryUpdate={handleQueryUpdate}
                handleSelectUpdate={handleSelectUpdate}
              />
            </div>

            <div className="block">
              {todos.length === 0
                ? <Loader />
                : (
                  <TodoList
                    handleTodoClick={handleModal}
                    activeTodo={activeTodo}
                    todos={filteredTodos}
                  />
                )}
            </div>
          </div>
        </div>
      </div>
      {isOpenModal
        && (
          <TodoModal
            todo={activeTodo}
            user={activeUser}
            handleModal={handleModal}
          />
        )}
    </>
  );
};
