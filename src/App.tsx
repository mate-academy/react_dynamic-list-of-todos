import {
  FC,
  useCallback,
  useEffect,
  useState,
} from 'react';
import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';

import { TodoList } from './components/TodoList';
import { TodoFilter } from './components/TodoFilter';
import { TodoModal } from './components/TodoModal';
import { Loader } from './components/Loader';

import { getTodos } from './api';
import { Todo } from './types/Todo';
import { Filter } from './types/FilterEnum';

export const App: FC = () => {
  const [visibleTodos, setVisibleTodos] = useState<Todo[]>([]);
  const [selectedOption, setSelectedOption] = useState(Filter.ALL);
  const [currentTodo, setCurrentTodo] = useState<Todo | null>(null);
  const [query, setQuery] = useState('');

  const loadTodosFromApi = useCallback(async () => {
    const todos = await getTodos();

    setVisibleTodos(todos);
  }, []);

  const changeQuery = useCallback((str: string) => {
    setQuery(str.trimStart());
  }, []);

  const changeFilter = useCallback((filter: Filter) => {
    setSelectedOption(filter);
  }, []);

  const filterTodosByRequirments = useCallback(
    (str: string, filter: Filter, todos: Todo[]) => {
      let copyTodos = todos;

      switch (filter) {
        case Filter.COMPLETED:
          copyTodos = todos.filter(({ completed }) => completed);
          break;
        case Filter.ACTIVE:
          copyTodos = todos.filter(({ completed }) => !completed);
          break;
        default:
          copyTodos = todos;
      }

      return copyTodos.filter(({ title }) => (
        title.toLowerCase().includes(str.toLowerCase())));
    }, [],
  );

  const chooseTodo = (todo: Todo) => {
    setCurrentTodo(todo);
  };

  const clearTodo = () => {
    setCurrentTodo(null);
  };

  const filteredTodos = filterTodosByRequirments(
    query, selectedOption, visibleTodos,
  );

  useEffect(() => {
    loadTodosFromApi();
  }, []);

  return (
    <>
      <div className="section">
        <div className="container">
          <div className="box">
            <h1 className="title">Todos:</h1>

            <div className="block">
              <TodoFilter
                changeQuery={changeQuery}
                changeFilter={changeFilter}
                selectedOption={selectedOption}
                query={query}
              />
            </div>

            <div className="block">
              {(!filteredTodos.length && !query)
                ? <Loader />
                : (
                  <TodoList
                    todos={filteredTodos}
                    chooseTodo={chooseTodo}
                    currentTodo={currentTodo}
                  />
                )}
            </div>
          </div>
        </div>
      </div>
      {
        currentTodo && (
          <TodoModal todo={currentTodo} onReset={clearTodo} />
        )
      }
    </>
  );
};
