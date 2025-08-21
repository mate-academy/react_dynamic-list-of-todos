export const progressStatusOptions = ['all', 'active', 'completed'] as const;

export type ProgressStatusOption = (typeof progressStatusOptions)[number];
