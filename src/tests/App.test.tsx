import { render, screen } from '@testing-library/react';
import { describe, it } from 'vitest';

import App from '../app/App';

describe('App', () => {
  it('Render Hello world', () => {
    //APPANGE
    render(<App />);
    //ACT
    //EXPECT
    expect(
      screen.getAllByRole('heading', {
        level: 1,
      })
    ).toHaveTextContent('Hello world');
  });
});
