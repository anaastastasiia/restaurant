import { RouteObject } from "react-router-dom";

export type Route = RouteObject & {
  children?: Array<Route>;
}

export const API_URL = 'http://localhost:3002';
export const API_URL_DB = 'http://localhost:3001';

export interface TableData {
  id: string;
  seats: number;
  isReserved: boolean;
}