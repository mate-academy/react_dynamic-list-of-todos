/*eslint-disable*/
import TodoInfo from '../TodoInfo/TodoInfo';
import { useAppContext } from '../Context/AppContext';

export const TodoList = () => {
  const { todos, searchQuery, filterType } = useAppContext();
  const preparedTodos = [...todos]
    .filter((todo) => {
      const normalizedQuery = searchQuery.toLowerCase().trim();
      const normalizedTitle = todo.title.toLowerCase().trim();

      return searchQuery ? normalizedTitle.includes(normalizedQuery) : true;
    })
    .filter((todo) => {
      switch (filterType) {
        case 'active': return !todo.completed;
        case 'completed': return todo.completed;
        default: return todo;
      }
    });

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
          <th> </th>
        </tr>
      </thead>

      <tbody>
        {preparedTodos.map(todo => (
          <TodoInfo todo={todo} key={todo.id}/>
        ))}
      </tbody>
    </table>
  );
};
