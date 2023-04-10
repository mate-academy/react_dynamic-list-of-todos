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

export const App: React.FC = () => {
  const [visibleTodos, setTodos] = useState<Todo[]>([]);
  const [filter, setFilter] = useState('all');
  const [query, setQuery] = useState('');
  const [loading, setLoading] = useState(false);
  const [selectedTodo, setSelectedTodo] = useState<Todo | null>(null);

  const stateChanger = (field: string, newValue: string) => {
    switch (field) {
      case 'select':
        setFilter(newValue);
        break;
      case 'input':
        setQuery(newValue);
        break;
      default:
        break;
    }
  };

  useEffect(() => {
    getTodos().then((todos) => {
      setTodos(todos);
      setLoading(true);
    });
  }, []);

  const filteredTodos = useMemo(() => {
    return visibleTodos.filter((todo) => {
      const filteredByQuery = todo.title
        .toLowerCase()
        .includes(query.toLowerCase());

      switch (filter) {
        case 'active':
          return !todo.completed && filteredByQuery;

        case 'all':
          return filteredByQuery;

        case 'completed':
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
                status={filter}
                query={query}
                stateChanger={stateChanger}
              />
            </div>
            <div className="block">
              {!loading ? (
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
