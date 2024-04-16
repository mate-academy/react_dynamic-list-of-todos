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
import { Options } from './types/Options';

function filterTodos(items: Todo[], text: string, option: Options): Todo[] {
  return items
    .filter(item =>
      item.title.toLocaleLowerCase().includes(text.toLocaleLowerCase()),
    )
    .filter(item => {
      switch (option) {
        case Options.Active:
          return !item.completed;

        case Options.Completed:
          return item.completed;

        default:
          return true;
      }
    });
}

export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [todosUsed, setTodosUsed] = useState<Todo[]>([]);
  const [filterTextTodos, setFilterTextTodos] = useState<string>('');
  const [filterOptionTodos, setFilterOptionTodos] = useState<Options>(
    Options.All,
  );
  const [loadingTodos, setLoadingTodos] = useState(false);
  const [selectedTodo, setSelectedTodo] = useState<Todo>({
    id: 0,
    title: 'string',
    completed: false,
    userId: 0,
  });

  useEffect(() => {
    setLoadingTodos(true);
    getTodos()
      .then(setTodos)
      .finally(() => setLoadingTodos(false));
  }, []);

  useEffect(() => {
    setTodosUsed(filterTodos(todos, filterTextTodos, filterOptionTodos));
  }, [filterTextTodos, filterOptionTodos, todos]);

  return (
    <>
      <div className="section">
        <div className="container">
          <div className="box">
            <h1 className="title">Todos:</h1>

            <div className="block">
              <TodoFilter
                text={filterTextTodos}
                setText={setFilterTextTodos}
                option={filterOptionTodos}
                setOption={setFilterOptionTodos}
              />
            </div>

            <div className="block">
              {loadingTodos && <Loader />}
              <TodoList
                todos={todosUsed}
                selectedTodo={selectedTodo}
                setSelectedTodo={setSelectedTodo}
              />
            </div>
          </div>
        </div>
      </div>

      {selectedTodo.id !== 0 && (
        <TodoModal todo={selectedTodo} setSelectedTodo={setSelectedTodo} />
      )}
    </>
  );
};
