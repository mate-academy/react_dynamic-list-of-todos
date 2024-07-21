import React from 'react';
import { Todo } from '../../types/Todo';
import TodoInfo from './TodoInfo';

type Props = {
  todos: Todo[];
  onCLickDetails: (todo: Todo) => void;
  chosedTodo: Todo | null;
};

// completed: false
// ​​​
// id: 1
// ​​​
// title: "delectus aut autem"
// ​​​
// userId: 1

export const TodoList: React.FC<Props> = ({
  todos,
  onCLickDetails,
  chosedTodo,
}) => (
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
      {todos.map(todo => (
        <TodoInfo
          key={todo.id}
          todo={todo}
          onClickDetails={onCLickDetails}
          chosedTodo={chosedTodo}
        />
      ))}
    </tbody>
  </table>
);
