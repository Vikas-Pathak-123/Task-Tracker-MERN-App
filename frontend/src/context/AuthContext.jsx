import { createContext } from 'react';

const AuthContext = createContext({
  authToken: null,
  setToken: () => {},
  logout: () => {},
});

export default AuthContext;