import { useState, useEffect, useMemo } from 'react';
import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';
import './Style.scss';
import { Todo } from './types/Todo';
import { TodoList } from './components/TodoList';
import { TodoFilter } from './components/TodoFilter';
import { TodoModal } from './components/TodoModal';
import { Loader } from './components/Loader';
import { getTodos } from './api';
import { Status } from './types/Status';

export const App: React.FC = () => {
  const [visibleTodos, setTodos] = useState<Todo[]>([]);
  const [filter, setFilter] = useState<Status>(Status.ALL);
  const [query, setQuery] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [selectedTodo, setSelectedTodo] = useState<Todo | null>(null);

  const loadTodosFromServer = async () => {
    try {
      const todosFromServer = await getTodos();

      setTodos(todosFromServer);
      setIsLoading(true);
    } catch {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadTodosFromServer();
  }, []);

  const filteredTodos = useMemo(() => {
    return visibleTodos.filter((todo) => {
      const filteredByQuery = todo.title
        .toLowerCase()
        .includes(query.toLowerCase());

      switch (filter) {
        case Status.ACTIVE:
          return !todo.completed && filteredByQuery;

        case Status.ALL:
          return filteredByQuery;

        case Status.COMPLETED:
          return todo.completed && filteredByQuery;

        default:
          return filteredByQuery;
      }
    });
  }, [filter, visibleTodos, query]);

  return (
    <>
      <div className="section">
        <div className="container">
          <div className="box">
            <h1 className="title">Todos:</h1>
            <div className="block">
              <TodoFilter
                select={filter}
                query={query}
                selectChanger={setFilter}
                queryChanger={setQuery}
              />
            </div>
            <div className="block">
              {!isLoading ? (
                <Loader />
              ) : (
                <TodoList
                  todos={filteredTodos}
                  selectedTodo={selectedTodo}
                  selectTodo={setSelectedTodo}
                />
              )}
            </div>
          </div>
        </div>
      </div>

      {selectedTodo && (
        <TodoModal selectedTodo={selectedTodo} setTodo={setSelectedTodo} />
      )}
    </>
  );
};
