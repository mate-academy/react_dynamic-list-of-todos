const [selectedTodo, setSelectedTodo] = useState<Todo | null>(null);
const [selectedUser, setSelectedUser] = useState<User | null>(null);
const [isUserLoading, setIsUserLoading] = useState(false);

const handleShow = (todo: Todo) => {
  setSelectedTodo(todo);
  setIsUserLoading(true);

  getUser(todo.userId)
    .then(setSelectedUser)
    .finally(() => setIsUserLoading(false));
};

{selectedTodo && (
  <TodoModal
    todo={selectedTodo}
    user={selectedUser}
    onClose={() => setSelectedTodo(null)}
    isLoading={isUserLoading}
  />
)}

const [statusFilter, setStatusFilter] = useState<'all' | 'completed' | 'active'>('all');
const [searchQuery, setSearchQuery] = useState('');

const filteredTodos = todos
  .filter(todo => {
    if (statusFilter === 'completed') return todo.completed;
    if (statusFilter === 'active') return !todo.completed;
    return true;
  })
  .filter(todo => todo.title.toLowerCase().includes(searchQuery.toLowerCase()));

  {searchQuery && (
    <button onClick={() => setSearchQuery('')}>x</button>
  )}
