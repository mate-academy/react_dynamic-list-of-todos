import React, { useEffect, useState } from 'react';
import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';

import { TodoList } from './components/TodoList';
import { TodoFilter } from './components/TodoFilter';
import { TodoModal } from './components/TodoModal';
import { Loader } from './components/Loader';

import { getTodos } from './api';
import { Todo } from './types/Todo';

import { FilterType } from './types/FilterType';

const getTodoById = (selectedId: number, todosArr: Todo[]) => {
  return todosArr.find(({ id }) => id === selectedId);
};

const filterTodoByStatus = (status: string, todosArr: Todo[]) => {
  if (status === 'all') {
    return todosArr;
  }

  let filteredTodos;

  switch (status) {
    case 'active':
      filteredTodos = todosArr.filter(({ completed }) => !completed);
      break;
    case 'completed':
      filteredTodos = todosArr.filter(({ completed }) => completed);
      break;
    default:
      filteredTodos = todosArr;
  }

  return filteredTodos;
};

const filterTodosBySearchQuery = (query: string, todosArr: Todo[]) => {
  return query === ''
    ? todosArr
    : todosArr.filter(({ title }) => title.toLocaleLowerCase().includes(query));
};

export const App: React.FC = () => {
  const [loadingTodoList, setLoadingTodoList] = useState(true);
  const [selectedTodoId, setSelectedTodoId] = useState(0);
  const [todos, setTodos] = useState<Todo[]>([]);

  const [filterType, setFilterType] = useState<string>(FilterType.All);
  const [searchQuery, setSearchQuery] = useState<string>('');

  const onSelect = (id: number) => {
    setSelectedTodoId(id);
  };

  useEffect(() => {
    getTodos()
      .then((todosFromServer) => {
        if (todosFromServer) {
          setTodos([...todosFromServer]);
          setLoadingTodoList(false);
        }
      });
  }, []);

  const filteredByStatus = filterTodoByStatus(filterType, todos);

  const todosToShow = filterTodosBySearchQuery(searchQuery, filteredByStatus);

  const selectedTodo = getTodoById(selectedTodoId, todos);

  return (
    <>
      <div className="section">
        <div className="container">
          <div className="box">
            <h1 className="title">Todos:</h1>

            <div className="block">
              <TodoFilter
                filterType={filterType}
                setFilterType={setFilterType}
                searchQuery={searchQuery}
                setSearchQuery={setSearchQuery}
              />
            </div>

            <div className="block">
              {loadingTodoList
                ? <Loader />
                : (
                  <TodoList
                    todos={todosToShow}
                    selectedTodoId={selectedTodoId}
                    onSelect={onSelect}
                  />
                )}
            </div>
          </div>
        </div>
      </div>
      {selectedTodo && (
        <TodoModal
          selectedTodo={selectedTodo}
          setSelectedTodoId={setSelectedTodoId}
        />
      )}
    </>
  );
};
