import { GetData } from '../utils/httpClient';

export function getUser(id: number) {
  return GetData(`users/${id}.json`);
}
