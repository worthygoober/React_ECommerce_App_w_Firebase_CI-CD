// Snapshot testing

import { render } from '@testing-library/react';
import Login from '../pages/Login/Login';

test('matches snapshot', () => {
    // Render the component
    const { asFragment } = render(<Login />);

    // create a snapshot of the rendered component
    expect(asFragment()).toMatchSnapshot();
});