/* eslint-disable max-len */
import React, {
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react';
import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';

import { TodoList } from './components/TodoList';
import { TodoFilter } from './components/TodoFilter';
import { TodoModal } from './components/TodoModal';
import { Loader } from './components/Loader';
import { Todo } from './types/Todo';
import { getAllTodos } from './api';
import { StateContext } from './components/Store';
import { TodosType } from './types/TodosType';

export const App: React.FC = () => {
  const [allTodos, setAllTodos] = useState<Todo[]>([]);
  const [visibleTodos, setVisibleTodos] = useState<Todo[]>([]);
  const [loading, setLoading] = useState(true);
  const [todosType, setTodosType] = useState(TodosType.all);
  const { selectedTodo } = useContext(StateContext);
  const [query, setQuery] = useState('');

  useEffect(() => {
    if (todosType === TodosType.all) {
      getAllTodos()
        .then(setVisibleTodos)
        .finally(() => setLoading(false));
    } else if (todosType === TodosType.active) {
      setVisibleTodos(allTodos.filter(todo => !todo.completed));
    } else {
      setVisibleTodos(allTodos.filter(todo => todo.completed));
    }
  }, [todosType, allTodos]);

  useEffect(() => {
    getAllTodos()
      .then(setAllTodos)
      .finally(() => setLoading(false));
  }, [allTodos]);

  const filteredPosts: Todo[] = useMemo(() => {
    return visibleTodos.filter(todo => todo.title.includes(query));
  }, [query, visibleTodos]);

  return (
    <>
      <div className="section">
        <div className="container">
          <div className="box">
            <h1 className="title">Todos:</h1>

            <div className="block">
              <TodoFilter
                setType={setTodosType}
                setAppliedQuery={setQuery}
              />
            </div>

            <div className="block">
              {loading && (<Loader />)}
              {!loading && (<TodoList todos={filteredPosts} />)}
            </div>
          </div>
        </div>
      </div>

      {selectedTodo && (<TodoModal />)}
    </>
  );
};
