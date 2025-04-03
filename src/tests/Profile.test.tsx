// Snapshot testing

import { render } from '@testing-library/react';
import Profile from '../pages/Profile/Profile';

test('matches snapshot', () => {
    const { asFragment } = render(<Profile />);

    expect(asFragment()).toMatchSnapshot();
});