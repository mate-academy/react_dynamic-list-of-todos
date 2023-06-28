/* eslint-disable max-len */
import React, {
  useCallback,
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

export const App: React.FC = () => {
  const [isTodosLoad, setIsTodosLoad] = useState(false);
  const [todos, setTodos] = useState<Todo[]>([]);
  const [query, setQuery] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  const [selectedTodo, setSelectedTodo] = useState<Todo | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      setTodos(await getTodos());
      setIsTodosLoad(true);
    };

    fetchData();
  }, []);

  const checkStatus = useCallback((
    todoCompleted: boolean,
    filterStage: string,
  ) => {
    switch (filterStage) {
      case 'completed':
        return todoCompleted === true;
      case 'active':
        return todoCompleted === false;
      default:
        return true;
    }
  }, []);

  const preparedTodos = useMemo(() => {
    return todos.filter(todo => {
      const regex = new RegExp(query.trim(), 'gi');

      const isStatusMatch = checkStatus(todo.completed, filterStatus);

      return regex.test(todo.title) && isStatusMatch;
    });
  }, [todos, query, checkStatus, filterStatus]);

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
              {isTodosLoad
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
