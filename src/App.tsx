/* eslint-disable max-len */
import React, {
  useEffect,
  useState,
} from 'react';
import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';

import { TodoList } from './components/TodoList';
import { TodoFilter } from './components/TodoFilter';
import { Loader } from './components/Loader';
import { Todo } from './types/Todo';
import { getTodos } from './api';
import { SelectValues } from './types/SelectValues';
import { TodoModal } from './components/TodoModal';

export const App: React.FC = () => {
  const [isTodosLoaded, setIsTodosLoaded] = useState(false);
  const [todosFromServer, setTodosFromServer] = useState<Todo[]>([]);
  const [select, setSelect] = useState(SelectValues.All);
  const [query, setQuery] = useState('');
  const [selectedTodo, setSelectedTodo] = useState<Todo | null>(null);

  function getPreparedTodos(todos: Todo[]): Todo[] {
    let filteredTodos: Todo[] = [...todos];

    switch (select) {
      case SelectValues.Active:
        filteredTodos = filteredTodos.filter(todo => todo.completed === false);
        break;

      case SelectValues.Completed:
        filteredTodos = filteredTodos.filter(todo => todo.completed === true);
        break;

      default:
        break;
    }

    filteredTodos = filteredTodos.filter(todo => {
      return todo.title.trim().toLowerCase().includes(query.trim().toLowerCase());
    });

    return filteredTodos;
  }

  useEffect(() => {
    getTodos()
      .then(todos => {
        setTodosFromServer(todos);
        setIsTodosLoaded(true);
      });
  }, []);

  const filterdTodos = getPreparedTodos(todosFromServer);

  return (
    <>
      <div className="section">
        <div className="container">
          <div className="box">
            <h1 className="title">Todos:</h1>

            <div className="block">
              <TodoFilter
                select={select}
                setSelect={setSelect}
                query={query}
                setQuery={setQuery}
              />
            </div>

            <div className="block">
              {!isTodosLoaded && <Loader />}
              <TodoList
                todos={filterdTodos}
                setSelectedTodo={setSelectedTodo}
                selectedTodo={selectedTodo}
              />
            </div>
          </div>
        </div>
      </div>

      {selectedTodo && (
        <TodoModal
          selectedTodo={selectedTodo}
          setSelectedTodo={setSelectedTodo}
        />
      )}
    </>
  );
};
