import { useContext } from 'react';
import { ToDo } from '../Todo/Todo';
import { TodoContext } from '../Todocontext/TodoContext';

export const TodoList = () => {
  const { preparedList } = useContext(TodoContext);

  return (
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

      <tbody>
        {preparedList.map(todo => (
          <ToDo todo={todo} key={todo.id} />
        ))}
      </tbody>
    </table>
  );
};
