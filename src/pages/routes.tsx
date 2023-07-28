import { Root } from '../app/Root';
import { Route } from '../model/types';

export const routes: Route[] = [
  {
    path: '/',
    element: <Root />,
    children: [
      {
        path: '',
        element: <div>Hello</div>,
      } as Route,
    ],
  },
];
