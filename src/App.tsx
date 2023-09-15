import React, {
  useEffect,
  useState,
  useContext,
  useMemo,
} from 'react';
import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';

import { TodoList } from './components/TodoList';
import { TodoFilter } from './components/TodoFilter';
import { getTodos } from './api';
import { Todo } from './types/Todo';
import { TodoModal } from './components/TodoModal';
import { Loader } from './components/Loader';
import { TodoContext } from './components/TodoContext';
import { Filter, TodoStates } from './types/Filter';

const DEFAULT_FILTER: Filter = {
  select: TodoStates.All,
  input: '',
};

const getFiltredTodos = (filter: Filter, todos: Todo[]): Todo[] => {
  const { input, select } = filter;

  if (!input && select === TodoStates.All) {
    return todos;
  }

  const validatedInput = input.toLowerCase().trim();

  switch (select) {
    case TodoStates.Active:
      return todos.filter(({ completed, title }) => (
        title.toLowerCase().includes(validatedInput) && !completed));
    case TodoStates.Completed:
      return todos.filter(({ completed, title }) => (
        title.toLowerCase().includes(validatedInput) && completed));
    default:
      return todos.filter(({ title }) => (
        title.toLowerCase().includes(validatedInput)));
  }
};

export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [filter, setFilter] = useState<Filter>(DEFAULT_FILTER);
  const { showedTodo } = useContext(TodoContext);
  const [isLoading, setIsLoading] = useState(false);

  const filtredTodos = useMemo(
    () => getFiltredTodos(filter, todos),
    [filter, todos],
  );

  useEffect(() => {
    setIsLoading(true);
    getTodos()
      .then(setTodos)
      .catch((error) => {
        // eslint-disable-next-line no-console
        console.error(error);
      })
      .finally(() => setIsLoading(false));
  }, []);

  return (
    <>
      <div className="section">
        <div className="container">
          <div className="box">
            <h1 className="title">Todos:</h1>

            <div className="block">
              <TodoFilter filter={filter} onFilter={setFilter} />
            </div>

            <div className="block">
              {isLoading ? (
                <Loader />
              ) : (
                <>
                  {!filtredTodos.length ? 'No todos' : (
                    <TodoList todos={filtredTodos} />
                  )}
                </>
              )}
            </div>
          </div>
        </div>
      </div>

      {showedTodo && <TodoModal />}
    </>
  );
};
