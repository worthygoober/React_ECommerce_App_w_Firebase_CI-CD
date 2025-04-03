// Snapshot testing

import { render } from "@testing-library/react";
import Profile from "../pages/Profile/Profile";
import { AuthProvider } from "../context/AuthContext"; // Assuming you have this provider
import { BrowserRouter as Router, useNavigate } from 'react-router-dom'; // Wrap in Router for useNavigate to work

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: jest.fn(), // Mock useNavigate
}));

test('matches snapshot for Profile', () => {
  const mockedNavigate = jest.fn(); // Mock function for navigate
  (useNavigate as jest.Mock).mockReturnValue(mockedNavigate); // Mock the navigate return value

  // Render the Profile component with the AuthContextProvider to provide the user context
  const { asFragment } = render(
    <Router>
      <AuthProvider>
        <Profile />
      </AuthProvider>
    </Router>
  );

  // Create a snapshot of the rendered component
  expect(asFragment()).toMatchSnapshot();

  // You can add assertions if needed, for example:
  // Expect that navigate is called with the correct arguments
  // expect(mockedNavigate).toHaveBeenCalledWith('/login');
});