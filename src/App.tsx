import {
  useEffect,
  useMemo,
  useState,
  FC,
} from 'react';
import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';

import { TodoList } from './components/TodoList';
import { TodoFilter } from './components/TodoFilter';
import { TodoModal } from './components/TodoModal';
import { Loader } from './components/Loader';
import { Todo } from './types/Todo';
import { getTodos } from './api';
import { Filter } from './types/Filter';

export const App: FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [loading, setLoading] = useState(false);
  const [selectedTodos, setSelectedTodos] = useState<Todo | null>(null);
  const [query, setQuery] = useState('');
  const [filterBy, setFilterBy] = useState<Filter>(Filter.all);

  useEffect(() => {
    setLoading(true);

    getTodos()
      .then(setTodos)
      .finally(() => setLoading(false));
  }, []);

  const prepTodos: Todo[] = useMemo(() => {
    let copyTodos = [...todos];

    if (query.length) {
      copyTodos = copyTodos.filter(
        todo => todo.title.toLowerCase().includes(query.toLowerCase()),
      );
    }

    switch (filterBy) {
      case Filter.active:
        return copyTodos.filter(item => !item.completed);

      case Filter.completed:
        return copyTodos.filter(item => item.completed);

      default:
        return copyTodos;
    }
  }, [query, filterBy, todos]);

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
                filterBy={filterBy}
                setFilterBy={setFilterBy}
              />
            </div>

            <div className="block">
              {loading && (
                <Loader />
              )}

              {(!loading && TodoList.length > 0) && (
                <TodoList
                  todos={prepTodos}
                  selected={selectedTodos}
                  onSelected={setSelectedTodos}
                />
              )}

            </div>
          </div>
        </div>
      </div>

      {selectedTodos && (
        <TodoModal
          selected={selectedTodos}
          onClose={() => setSelectedTodos(null)}
        />
      )}
    </>
  );
};
