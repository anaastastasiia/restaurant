import { RouteObject } from "react-router-dom";

export type Route = RouteObject & {
  children?: Array<Route>;
}

export const API_URL = 'http://localhost:3001';