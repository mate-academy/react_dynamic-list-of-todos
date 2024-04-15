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

function filterTodos(items: Todo[], text: string, option: string): Todo[] {
  return items
    .filter(item =>
      item.title.toLocaleLowerCase().includes(text.toLocaleLowerCase()),
    )
    .filter(item => {
      switch (option) {
        case 'active':
          return !item.completed;

        case 'completed':
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
  const [filterOptionTodos, setFilterOptionTodos] = useState<string>('all');
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
    debugger;
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
