import { RouteObject } from "react-router-dom";

export type Route = RouteObject & {
  children?: Array<Route>;
}