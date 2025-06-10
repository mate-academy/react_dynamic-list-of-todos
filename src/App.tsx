import React, { useEffect, useState } from 'react';
import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';

import { TodoList } from './components/TodoList';
import { TodoFilter } from './components/TodoFilter';
import { TodoModal } from './components/TodoModal';
import { Loader } from './components/Loader';
import { getTodos } from './api';
import { Todo } from './types/Todo';
import { Select } from './types/Select';

interface Filter {
  search: string;
  select: Select;
}

const prepareTodo = (todos: Todo[], filter: Filter): Todo[] => {
  let preparedTodo = [...todos];

  if (filter.search !== '') {
    const normalizeSearch = filter.search.trim().toLowerCase();

    preparedTodo = preparedTodo.filter(todo =>
      todo.title.toLowerCase().includes(normalizeSearch),
    );
  }

  if (filter.select === Select.Active) {
    preparedTodo = preparedTodo.filter(todo => todo.completed === false);
  }

  if (filter.select === Select.Completed) {
    preparedTodo = preparedTodo.filter(todo => todo.completed === true);
  }

  return preparedTodo;
};

export const App: React.FC = () => {
  const [loaded, setLoaded] = useState(false);

  const [todos, setTodos] = useState<Todo[]>([]);

  const [userId, setUserId] = useState(0);
  const [todo, setTodo] = useState<Todo | null>(null);

  const [search, setSearch] = useState('');
  const [select, setSelect] = useState(Select.All);

  useEffect(() => {
    getTodos().then(todosFromServer => {
      setLoaded(true);
      setTodos(todosFromServer);
    });
  }, []);

  const visibleTodos = prepareTodo(todos, { search, select });

  return (
    <>
      <div className="section">
        <div className="container">
          <div className="box">
            <h1 className="title">Todos:</h1>

            <div className="block">
              <TodoFilter
                search={search}
                onChangeInput={setSearch}
                chooseStatus={setSelect}
                select={select}
              />
            </div>

            <div className="block">
              {loaded ? (
                <TodoList
                  todos={visibleTodos}
                  onClickSetUserId={setUserId}
                  onClickSetTodo={setTodo}
                  oneTodoForCheck={todo}
                />
              ) : (
                <Loader />
              )}
            </div>
          </div>
        </div>
      </div>

      {todo && (
        <TodoModal userId={userId} todo={todo} closeModalWindow={setTodo} />
      )}
    </>
  );
};
