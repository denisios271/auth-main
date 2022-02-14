import React from 'react';
import { render } from '@testing-library/react';
import { Provider } from 'react-redux';
import { store } from './app/store';
import App from './App';

test('renders learn react link', () => {
  const { getByText } = render(
    <Provider store={store}>
      // @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
      <App />
    </Provider>
  );

  // @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'expect'.
  expect(getByText(/learn/i)).toBeInTheDocument();
});
