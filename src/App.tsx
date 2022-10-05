import { useState, useEffect } from 'react';
import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';
import { TodoList } from './components/TodoList';
import { TodoFilter } from './components/TodoFilter';
import { TodoModal } from './components/TodoModal';
import { Todo } from './types/Todo';
import { Loader } from './components/Loader';
import { getTodos } from './api';
import { FilterTypes } from './types/FilterTypes';

export const App: React.FC = () => {
  const [todo, setTodo] = useState<Todo | null>(null);
  const [todos, setTodos] = useState<Todo[]>([]);
  const [filterBy, setFilterBy] = useState(FilterTypes.all);
  const [query, setQuery] = useState('');
  const [loadedTodos, setLoadedTodos] = useState<Todo[]>(todos);

  const compareLower = (title: string) => (
    title.toLowerCase().includes(query.toLowerCase())
  );

  const isLoading = !todos.length;

  useEffect(() => {
    const fetchTodos = async () => {
      const response = await getTodos();

      setTodos(response);
    };

    fetchTodos();
  }, []);

  useEffect((() => {
    switch (filterBy) {
      case FilterTypes.all:
        setLoadedTodos(todos.filter(({ title }) => compareLower(title)));
        break;
      case FilterTypes.active:
        setLoadedTodos(todos
          .filter(({ completed, title }) => !completed && compareLower(title)));
        break;
      case FilterTypes.completed:
        setLoadedTodos(todos
          .filter(({ completed, title }) => completed && compareLower(title)));
        break;
      default:
        throw new Error('Warning!');
    }
  }), [todos, filterBy, query]);

  return (
    <>
      <div className="section">
        <div className="container">
          <div className="box">
            <h1 className="title">Todos:</h1>

            <div className="block">
              <TodoFilter
                filterBy={filterBy}
                setFilterBy={setFilterBy}
                query={query}
                setQuery={setQuery}
              />
            </div>

            <div className="block">
              {isLoading ? (
                <Loader />
              ) : (
                <TodoList
                  todos={loadedTodos}
                  setSelectedTodo={setTodo}
                  selectedTodo={todo}
                />
              )}
            </div>
          </div>
        </div>
      </div>

      <TodoModal todo={todo} setTodo={setTodo} />
    </>
  );
};
