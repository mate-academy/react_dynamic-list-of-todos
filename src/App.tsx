/* eslint-disable max-len */
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
  const [filterBy, setFilterBy] = useState('all');
  const [query, setQuery] = useState('');
  const [load, setLoad] = useState<Todo[]>(todos);

  const compareLower = (title: string) => (
    title.toLowerCase().includes(query.toLowerCase())
  );

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
        setLoad(todos.filter(({ title }) => compareLower(title)));
        break;
      case FilterTypes.active:
        setLoad(todos
          .filter(({ completed, title }) => !completed && compareLower(title)));
        break;
      case FilterTypes.completed:
        setLoad(todos
          .filter(({ completed }) => completed)
          .filter(({ title }) => compareLower(title)));
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
              {!todos.length ? (
                <Loader />
              ) : (
                <TodoList
                  todos={load}
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
