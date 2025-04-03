// Snapshot testing

import { render } from '@testing-library/react';
import Login from '../pages/Login/Login';

test('matches snapshot', () => {
    const { asFragment } = render(<Login />);

    expect(asFragment()).toMatchSnapshot();
});