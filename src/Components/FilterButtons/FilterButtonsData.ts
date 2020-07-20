import { Todo, Sorting } from "../interfaces/interfaces";

interface ButtonData {
  title: string;
  sortingPattern: Sorting;
}

export const filterButtonsData: ButtonData[] = [
  {
    title: 'By title',
    sortingPattern: (itemA: Todo, itemB: Todo) => itemA.title.localeCompare(itemB.title),
  },
  {
    title: 'Completed',
    sortingPattern: (itemA: Todo, itemB: Todo) => Number(itemA.completed) - Number(itemB.completed),
  },
  {
    title: 'By name',
    sortingPattern: (itemA: Todo, itemB: Todo) => (
      itemA.user.name.localeCompare(itemB.user.name)
    ),
  },
];
