// Snapshot testing

import { render, waitFor } from "@testing-library/react";
import Profile from "../pages/Profile/Profile";
import { MemoryRouter, useNavigate } from "react-router-dom"; // Wrap in Router for useNavigate to work

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: jest.fn(), // Mock useNavigate
}));

jest.mock('../context/AuthContext', () => ({
  useAuth: jest.fn(),
}));

import { useAuth } from "../context/AuthContext";

test('matches snapshot for Profile', async () => {
  const mockedNavigate = jest.fn(); // Mock navigate function
  (useNavigate as jest.Mock).mockReturnValue(mockedNavigate); // Mock the navigate return value

  (useAuth as jest.Mock).mockReturnValue({ user: null });

  // Render the Profile component with MemoryRouter
  const { asFragment } = render(
    <MemoryRouter>
        <Profile />
    </MemoryRouter>
  );

  // Create a snapshot of the rendered component
  expect(asFragment()).toMatchSnapshot();

  await waitFor(() => {
    expect(mockedNavigate).toHaveBeenCalledWith('/login');
  });
});