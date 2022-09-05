/* eslint-disable max-len */
import {
  FC,
  useState,
  useEffect,
  useCallback,
  useMemo,
} from 'react';
import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';

import { TodoList } from './components/TodoList';
import { TodoFilter } from './components/TodoFilter';
import { TodoModal } from './components/TodoModal';
import { Loader } from './components/Loader';
import { getTodos } from './api';
import { Todo } from './types/Todo';
import { TodoFilterBy } from './types/TodoFilterBy';

export const App: FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [query, setQuery] = useState('');
  const [filterBy, setFilterBy] = useState(TodoFilterBy.NONE);
  const [selectedTodo, setSelectedTodo] = useState<Todo | null>(null);

  useEffect(() => {
    getTodos()
      .then(data => setTodos(data));
  }, []);

  const closeInfo = useCallback(() => {
    setSelectedTodo(null);
  }, []);

  const visibleTodos = useMemo(() => (
    todos.filter(todo => {
      const queryFilter = todo.title.toLowerCase().includes(query.toLowerCase());

      switch (filterBy) {
        case TodoFilterBy.ACTIVE:
          return queryFilter && todo.completed === false;

        case TodoFilterBy.COMPLETED:
          return queryFilter && todo.completed === true;

        default:
          return queryFilter;
      }
    })
  ), [query, todos, filterBy]);

  return (
    <>
      <div className="section">
        <div className="container">
          <div className="box">
            <h1 className="title">Todos:</h1>

            <div className="block">
              <TodoFilter
                query={query}
                changeQuery={setQuery}
                filterBy={filterBy}
                changeFilter={setFilterBy}
              />
            </div>

            <div className="block">
              {todos.length > 0
                ? (
                  <TodoList
                    todos={visibleTodos}
                    onTodoSelect={setSelectedTodo}
                    selectedTodo={selectedTodo}
                  />
                )
                : (<Loader />)}

            </div>
          </div>
        </div>
      </div>

      {selectedTodo
        && (<TodoModal todo={selectedTodo} onClose={closeInfo} />)}
    </>
  );
};
