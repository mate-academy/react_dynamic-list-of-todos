import React, { useEffect, useMemo, useState } from 'react';
import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';
import './App.scss';

import { TodoList } from './components/TodoList';
import { TodoFilter } from './components/TodoFilter';
import { TodoModal } from './components/TodoModal';
import { Loader } from './components/Loader';
import { Todo } from './types/Todo';
import { TodoStatus } from './types/TodoStatus';
import { getTodos } from './api';

export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [selectedOption, setSelectedOption] = useState<TodoStatus>(
    TodoStatus.All,
  );
  const [title, setTitle] = useState('');
  const [loading, setLoading] = useState(false);
  const [currentTodo, setCurrentTodo] = useState<Todo | null>(null);

  useEffect(() => {
    setLoading(true);
    getTodos()
      .then(setTodos)
      .finally(() => setLoading(false));
  }, []);

  const vissibleTodos = useMemo(() => {
    const filterTodos = (option: TodoStatus, titl: string): Todo[] => {
      let filteredTodos = todos;

      switch (option) {
        case TodoStatus.Active:
          filteredTodos = todos.filter(todo => !todo.completed);
          break;

        case TodoStatus.Completed:
          filteredTodos = todos.filter(todo => todo.completed);
          break;

        default:
          filteredTodos = todos;
          break;
      }

      if (titl.trim()) {
        filteredTodos = filteredTodos.filter(todo =>
          todo.title.toLowerCase().includes(titl.toLowerCase()),
        );
      }

      return filteredTodos;
    };

    return filterTodos(selectedOption, title);
  }, [selectedOption, title, todos]);

  return (
    <>
      <div className="section">
        <div className="container">
          <div className="box">
            <h1 className="title">Todos:</h1>

            <div className="block">
              <TodoFilter
                selectedOption={selectedOption}
                setSelectedOption={setSelectedOption}
                setTitle={setTitle}
                title={title}
              />
            </div>

            <div className="block">
              {loading && <Loader />}
              {!loading && (
                <TodoList
                  todos={vissibleTodos}
                  setCurrentTodo={setCurrentTodo}
                  currentTodo={currentTodo}
                />
              )}
            </div>
          </div>
        </div>
      </div>
      {currentTodo && (
        <TodoModal todo={currentTodo} setCurrentTodo={setCurrentTodo} />
      )}
    </>
  );
};
