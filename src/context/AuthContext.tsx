import { createContext } from 'react';

type AuthContextType = { handleSignIn: () => {} };

const AuthContext = createContext({});
export default AuthContext;
