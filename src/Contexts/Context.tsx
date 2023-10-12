import React from 'react';
import { User } from '../types/User';
import { Todo } from '../types/Todo';
import { getTodos } from '../api';

export interface LocalTodo extends Todo {
  isVisible: boolean;
}

export type ModalInfo = {
  user: Promise<User> | User;
  todo: LocalTodo;
  isVisible: boolean;
};

export type DefaultValueType = {
  fetchedItems: LocalTodo[];
  setFetchedItems: React.Dispatch<React.SetStateAction<LocalTodo[]>>;
  visibleItems: LocalTodo[];
  setVisibleItems: React.Dispatch<React.SetStateAction<LocalTodo[]>>;
  currentItem: ModalInfo;
  setCurrentItem: React.Dispatch<React.SetStateAction<ModalInfo>>;
  query: string,
  setQuery: React.Dispatch<React.SetStateAction<string>>,
  todoQueryCondition: QuryConditions,
  setTodoQueryCondition:React.Dispatch<React.SetStateAction<QuryConditions>>
  getFilteredItemsByCondition: (e: LocalTodo[]) => LocalTodo[],
};

const modalDefault: ModalInfo = {
  user: {} as User,
  todo: {} as Todo,
  isVisible: false,
};

export type QuryConditions = 'all' | 'active' | 'completed';

export const todoContext = React.createContext<DefaultValueType | null>(null);

export const AppContext: React.FC<React.ReactNode> = ({ children }) => {
  const [fetchedItems, setFetchedItems] = React.useState<LocalTodo[]>([]);
  const [visibleItems, setVisibleItems] = React.useState<LocalTodo[]>([]);
  const [currentItem, setCurrentItem] = React.useState<ModalInfo>(modalDefault);
  const [query, setQuery] = React.useState('');
  const [todoQueryCondition, setTodoQueryCondition]
    = React.useState<QuryConditions>('all');

  async function applyVisibleItems() {
    const response = await getTodos();

    const formatedResponse: LocalTodo[] = response.map(todo => {
      return { ...todo, isVisible: false };
    });

    setFetchedItems(formatedResponse);
    setVisibleItems(formatedResponse);
  }

  function getFilteredItemsByCondition(items: LocalTodo[]) {
    let filteredItems: LocalTodo[] = [...items];

    switch (todoQueryCondition) {
      case 'completed':
        filteredItems = [...fetchedItems.filter(item => item.completed)];
        break;
      case 'active':
        filteredItems = [...fetchedItems.filter(item => !item.completed)];
        break;
      default:
    }

    return filteredItems;
  }

  React.useEffect(() => {
    applyVisibleItems();
  }, []);

  const states:DefaultValueType = {
    visibleItems,
    currentItem,
    setVisibleItems,
    setCurrentItem,
    query,
    setQuery,
    todoQueryCondition,
    setTodoQueryCondition,
    fetchedItems,
    setFetchedItems,
    getFilteredItemsByCondition,
  };

  return (
    <todoContext.Provider value={{ ...states }}>
      {children}
    </todoContext.Provider>
  );
};
