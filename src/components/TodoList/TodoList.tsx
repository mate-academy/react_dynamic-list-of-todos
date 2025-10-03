import React from 'react';
import { Todo } from '../../types/Todo';
import { TodoItem } from '../TodoItem';

type Props = {
  todos: Todo[];
  onSelectTodo: (id: number) => void;
  selectedTodo?: Todo;
};

const TodoList: React.FC<Props> = ({
  todos,
  selectedTodo,
  onSelectTodo,
}: Props) => (
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
        <th> </th>
      </tr>
    </thead>

    <tbody>
      {todos.map(todo => {
        const isSelected = todo.id === selectedTodo?.id;

        return (
          <TodoItem
            key={todo.id}
            todo={todo}
            isSelected={isSelected}
            onSelectTodo={onSelectTodo}
          />
        );
      })}
    </tbody>
  </table>
);

export default React.memo(TodoList);
