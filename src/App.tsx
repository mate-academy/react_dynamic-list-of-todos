import React, { useEffect, useMemo, useState } from 'react';
import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';

import { TodoList } from './components/TodoList';
import { TodoFilter } from './components/TodoFilter';
import { TodoModal } from './components/TodoModal';
import { Loader } from './components/Loader';
import { getTodos } from './api';
import { Todo, TodoWithUser } from './types/Todo';

export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [query, setQuery] = useState('');
  const [option, setOption] = useState('all');
  const [todo, setTodo] = useState<TodoWithUser | null>(null);
  const [isTodoModal, setIsTodoModal] = useState(false);

  useEffect(() => {
    getTodos()
      .then(todosFromServer => {
        setTodos(todosFromServer);
      });
  }, [JSON.stringify(getTodos())]);

  const filteredTodos = todos.filter(({ title, completed }) => {
    const result = title.toLowerCase().includes(query.toLowerCase().trim());

    switch (option) {
      case 'all':
        return result;
      case 'active':
        return result && !completed;
      case 'completed':
        return result && completed;

      default:
        throw new Error(`Errod: ${option} don't find`);
    }
  });

  const visibleTodos = useMemo(
    () => filteredTodos,
    [JSON.stringify(filteredTodos)],
  );

  return (
    <>
      <div className="section">
        <div className="container">
          <div className="box">
            <h1 className="title">Todos:</h1>

            <div className="block">
              <TodoFilter
                query={query}
                setQuery={setQuery}
                option={option}
                setOption={setOption}
              />
            </div>

            <div className="block">
              {!todos.length && <Loader />}
              <TodoList
                todos={visibleTodos}
                setTodo={setTodo}
                isTodoModal={isTodoModal}
                setIsTodoModal={setIsTodoModal}
              />
            </div>
          </div>
        </div>
      </div>

      {isTodoModal && (
        <TodoModal
          todo={todo}
          setTodo={setTodo}
          setIsTodoModal={setIsTodoModal}
        />
      )}
    </>
  );
};
