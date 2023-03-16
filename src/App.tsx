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
import { FilterCases } from './types/FilterCases';

function filterBySelect(
  filter: FilterCases,
  todos: Todo[],
) {
  switch (filter) {
    case 'active':
      return todos
        .filter(({ completed }) => !completed);

    case 'completed':
      return todos
        .filter(({ completed }) => completed);

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
  const [selectFilter, setSelectFilter] = useState<FilterCases>(FilterCases.All);
  const [activeTodo, setActiveTodo] = useState<Todo | undefined>(undefined);
  const [activeUser, setActiveUser] = useState<User | null>(null);
  const [isOpenModal, setIsOpenModal] = useState(false);

  const handleQueryUpdate = (value: string) => {
    setQuery(value);
  };

  const handleSelectUpdate = (value: FilterCases) => {
    setSelectFilter(value);
  };

  const handleTodoClick = async (id?: number) => {
    setIsOpenModal(current => !current);

    if (id) {
      const newActiveTodo = getTodo(todos, id);
      const user = await getUser(newActiveTodo?.userId);

      setActiveTodo(newActiveTodo);
      setActiveUser(user);
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
                onQueryUpdate={handleQueryUpdate}
                onSelectUpdate={handleSelectUpdate}
              />
            </div>

            <div className="block">
              {!todos.length
                ? <Loader />
                : (
                  <TodoList
                    onTodoClick={handleTodoClick}
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
            onModalClose={handleTodoClick}
          />
        )}
    </>
  );
};
