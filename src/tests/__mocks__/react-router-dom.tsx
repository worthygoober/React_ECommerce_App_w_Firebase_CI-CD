export const useNavigate = jest.fn();

export const Link = jest.fn().mockImplementation(({ children }) => children);