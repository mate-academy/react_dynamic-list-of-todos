export enum Option {
  ALL = 'all',
  ACTIVE = 'active',
  COMPLETED = 'completed',
}

export type OptionType = keyof typeof Option;
