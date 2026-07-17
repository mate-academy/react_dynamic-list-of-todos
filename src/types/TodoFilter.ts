export const TodoFilter = {
  All: 'all',
  Active: 'active',
  Completed: 'completed',
} as const;

export type TodoFilterType = (typeof TodoFilter)[keyof typeof TodoFilter];

export function isTodoFilterType(value: string): value is TodoFilterType {
  return Object.values(TodoFilter).includes(value as TodoFilterType);
}
