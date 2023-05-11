import {
  useEffect,
  FC,
  useState,
  useMemo,
} from 'react';
import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';
import { TodoList } from './components/TodoList';
import { TodoFilter } from './components/TodoFilter';
import { TodoModal } from './components/TodoModal';
import { getTodos } from './api';
import { Todo } from './types/Todo';
import { Loader } from './components/Loader';
import { FilterOption } from './types/FilterOption';

export const App: FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [
    selectedTodoCard,
    setSelectedTodoCard,
  ] = useState<Todo | null>(null);
  const [
    filterOption,
    setfilterOption,
  ] = useState<FilterOption>(FilterOption.All);
  const [query, setQuery] = useState<string>('');

  useEffect(() => {
    getTodos().then(response => setTodos(response));
  }, []);

  const filteredTodos = useMemo(() => {
    return todos.filter(todo => {
      const todoTitle = todo.title
        .toLowerCase()
        .includes(query.toLowerCase().trim());

      switch (filterOption) {
        case FilterOption.Active:
          return !todo.completed && todoTitle;
        case FilterOption.Completed:
          return todo.completed && todoTitle;
        case FilterOption.All:
        default:
          return todoTitle;
      }
    });
  }, [todos, filterOption, query]);

  return (
    <>
      <div className="section">
        <div className="container">
          <div className="box">
            <h1 className="title">Todos:</h1>

            <div className="block">
              <TodoFilter
                filterOption={filterOption}
                query={query}
                onSelectOption={setfilterOption}
                onChange={setQuery}
              />
            </div>

            <div className="block">
              {todos.length
                ? (
                  <TodoList
                    todos={filteredTodos}
                    selectedTodoCard={selectedTodoCard}
                    onSelectTodoCard={setSelectedTodoCard}
                  />
                ) : (
                  <Loader />
                )}
            </div>
          </div>
        </div>
      </div>

      {selectedTodoCard && (
        <TodoModal
          selectedTodoCard={selectedTodoCard}
          onSelectTodoCard={setSelectedTodoCard}
        />
      )}
    </>
  );
};
