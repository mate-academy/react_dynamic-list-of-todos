export const StatusMap = {
  All: 'all',
  Active: 'active',
  Completed: 'completed',
} as const;

export type Status = (typeof StatusMap)[keyof typeof StatusMap];
