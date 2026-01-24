import React from 'react';
import { Todo } from '../../types/Todo';
import { User } from '../../types/User';
import { get } from './../../api';

export const AddTodo: React.FC<{
  todoLength?: number;
  onAddTodo: (newTodo: Todo) => void;
}> = ({ todoLength, onAddTodo }) => {
  const [newTodoTitle, setNewTodoTitle] = React.useState('');
  const [selectedUser, setSelectedUser] = React.useState<number>(1);
  const [users, setUsers] = React.useState<User[]>([]);
  const [isLoadingUsers, setIsLoadingUsers] = React.useState(false);

  const getUsers = async (): Promise<User[]> => {
    return get<User[]>('/users');
  };

  // Завантажуємо користувачів при монтуванні
  React.useEffect(() => {
    setIsLoadingUsers(true);
    getUsers().then(fetchedUsers => {
      setUsers(fetchedUsers);
      setIsLoadingUsers(false);
    });
  }, []);

  const getNextId = () => (todoLength ? todoLength + 1 : 1);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (newTodoTitle.trim() === '') {
      return;
    }

    const newTodo: Todo = {
      id: getNextId(),
      title: newTodoTitle,
      completed: false,
      userId: selectedUser,
    };

    onAddTodo(newTodo);
    setNewTodoTitle('');
    setSelectedUser(1);
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div className="field is-grouped">
          <div className="control is-expanded">
            <input
              type="text"
              placeholder="Todo title"
              value={newTodoTitle}
              onChange={e => setNewTodoTitle(e.target.value)}
              className="input"
            />
          </div>

          <div className="control">
            <div className="select">
              <select
                name="userId"
                id="userId"
                value={selectedUser}
                onChange={e => setSelectedUser(Number(e.target.value))}
                disabled={isLoadingUsers}
              >
                {users.map(user => (
                  <option key={user.id} value={user.id}>
                    {user.name}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="control">
            <button type="submit" className="button is-info">
              Add Todo
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};
