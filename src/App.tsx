/* eslint-disable max-len */
import React, {
  useEffect,
  useMemo,
  useState,
} from 'react';
import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';

import { TodoList } from './components/TodoList';
import { TodoFilter } from './components/TodoFilter';
import { Loader } from './components/Loader';
import { Todo } from './types/Todo';
import { getTodos } from './api';
import { TodoModal } from './components/TodoModal';
import { TodoFilterMode } from './Enums';

const checkStatus = (
  todoCompleted: boolean,
  filterStage: string,
) => {
  switch (filterStage) {
    case TodoFilterMode.COMPLETED:
      return todoCompleted === true;
    case TodoFilterMode.ACTIVE:
      return todoCompleted === false;
    default:
      return true;
  }
};

export const App: React.FC = () => {
  const [isTodosLoaded, setIsTodosLoaded] = useState(false);
  const [todos, setTodos] = useState<Todo[]>([]);
  const [query, setQuery] = useState('');
  const [filterStatus, setFilterStatus] = useState<TodoFilterMode>(TodoFilterMode.ALL);
  const [selectedTodo, setSelectedTodo] = useState<Todo | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setTodos(await getTodos());
        setIsTodosLoaded(true);
      } catch (error) {
        throw new Error('Something went wrong: Could load data');
      }
    };

    fetchData();
  }, []);

  const preparedTodos = useMemo(() => {
    return todos.filter(todo => {
      const regex = new RegExp(query.trim(), 'gi');

      const isStatusMatch = checkStatus(todo.completed, filterStatus);

      return regex.test(todo.title) && isStatusMatch;
    });
  }, [todos, query, filterStatus]);

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
                filterStatus={filterStatus}
                setFilterStatus={setFilterStatus}
              />
            </div>

            <div className="block">
              {isTodosLoaded
                ? (
                  <TodoList
                    todos={preparedTodos}
                    setSelectedTodo={setSelectedTodo}
                    selectedTodoId={selectedTodo?.id}
                  />
                ) : <Loader />}
            </div>
          </div>
        </div>
      </div>

      {selectedTodo
      && (
        <TodoModal
          todo={selectedTodo}
          onSelectTodo={setSelectedTodo}
        />
      )}
    </>
  );
};
