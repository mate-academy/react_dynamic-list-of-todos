import React, { useEffect, useState } from 'react';
import { Todo } from '../../types/Todo';
import { getTodos } from '../../api';
import { TodoModal } from '../TodoModal';
import { Loader } from '../Loader';
import { TodoItem } from '../TodoItem';

export interface TodoListProps {
  todoQuery: string;
  todoSearchQuery: string;
}

enum statusQuery {
  Completed= 'completed',
  Active = 'active',
}

export const TodoList: React.FC<TodoListProps>= ({ todoQuery , todoSearchQuery }) => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [selectTodo, setSelectTodo] = useState<Todo | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
      getTodos()
        .then(setTodos)
        .finally(() => setLoading(false));
  }, []);


  const filterTodos = (todos: Todo[], query: string, searchQuery: string) => {
    let filteredTodos = [...todos];


    if (query ===  statusQuery['Completed']) {
      filteredTodos = filteredTodos.filter(todo => todo.completed);
    } else if (query ===statusQuery['Active']) {
      filteredTodos = filteredTodos.filter(todo => !todo.completed);
    }

    if (searchQuery) {
      filteredTodos = filteredTodos.filter(todo =>
        todo.title.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    return filteredTodos;
  };

  const visibleTodos = filterTodos(todos, todoQuery, todoSearchQuery);

  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <table className="table is-narrow is-fullwidth">
          <thead>
            <tr>
              <th>#</th>
              <th>
                <span className="icon">
                  <i className="fas fa-check" />
                </span>
              </th>
              <th>Title</th>
              <th></th>
            </tr>
          </thead>

          {visibleTodos.map(todo  => (
          <TodoItem  todoItem={todo} setSelectTodo={setSelectTodo} selectTodo={selectTodo} key={todo.id} />
          ))}
        </table>
      )}
      {selectTodo && <TodoModal selectedTodo={selectTodo} setSelectTodo={setSelectTodo} />}
    </>
  );
};
