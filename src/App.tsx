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
import { Filter, FilterEnum } from './types/Filter';

const DEFAULT_FILTER: Filter = {
  select: FilterEnum.All,
  input: '',
};

const getFiltredTodos = (filter: Filter, todos: Todo[]): Todo[] => {
  const { input, select } = filter;

  if (!input && select === FilterEnum.All) {
    return todos;
  }

  const validatedInput = input.toLowerCase().trim();
  let newTodos = todos
    .filter(({ title }) => title.toLowerCase().includes(validatedInput));

  switch (select) {
    case FilterEnum.Active:
      newTodos = newTodos.filter(({ completed }) => !completed);
      break;
    case FilterEnum.Completed:
      newTodos = newTodos.filter(({ completed }) => completed);
      break;
    default:
  }

  return newTodos;
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
      .catch(() => setTodos([]))
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
                  <TodoList todos={filtredTodos} />
                  {!filtredTodos.length && 'No todos'}
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
