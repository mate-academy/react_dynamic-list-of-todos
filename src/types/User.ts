export interface User {
  id: number;
  name: string;
  email: string;
  phone: string;
}


// type Action = {
//   type: string;
//   allTodos?: Todo[] | null;
//   payload?: string;
// };

// interface FilteredTodosContextProps {
//   filteredTodos: Todo[];
//   dispatch: React.Dispatch<Action>;
// }

// export const FilteredTodosContext =
//   React.createContext<FilteredTodosContextProps>({
//     filteredTodos: initialTodos,
//     dispatch: () => { },
//   });

// export const todoReducer = (state: Todo[], action: Action) => {
//   switch (action.type) {
//     case 'ALL':
//       return action.allTodos;
//     default:
//       return initialTodos;
//   }
// };

// export const TodosProvider: React.FC<Props> = ({ children }) => {
//   const [todos, setTodos] = useState<Todo[] | null>(null);
//   const [filteredTodos, dispatch] = useReducer(todoReducer, initialTodos);
//   const [user, setUser] = useState<User | null>(null);
//   const [todo, setTodo] = useState<Todo | null>(null);
//   const [firtsLoadedPage, setFirtsLoadedPage] = useState<boolean>(true);

//   useEffect(() => {
//     dispatch({ type: 'ALL', allTodos: todos });
//   }, [todos]);

//   const valueOfFilteredTodos = useMemo(
//     () => ({
//       filteredTodos,
//       dispatch,
//     }),
//     [filteredTodos],
//   );

//   return (
//     <FilteredTodosContext.Provider value= { valueOfFilteredTodos } >
//     { children }
//     </FilteredTodosContext.Provider>
//     );
//   };