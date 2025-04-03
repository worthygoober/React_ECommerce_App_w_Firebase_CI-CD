// Snapshot testing

import { render } from '@testing-library/react';
import Register from '../pages/Register/Register';

test('matches snapshot', () => {
    const { asFragment } = render(<Register />);

    expect(asFragment()).toMatchSnapshot();
});