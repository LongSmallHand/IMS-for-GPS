import React, {useContext, createContext, useState, useEffect} from 'react'
import { auth } from '../../firebase';
import {onAuthStateChanged, signOut as authSignOut} from 'firebase/auth'

// const AuthContext = React.createContext()

const AuthUserContext = createContext({
  authUser: null,
  isLoading: true
});

export function useFirebaseAuth(){
  const [authUser, setAuthUser] = useState(null);
  const [isLoading, setIsLoading] = useState(null);


  const clear = () => {
    setAuthUser(null);
    setIsLoading(false);
  }
  const authStateChanged = async (user) => {
    setIsLoading(true);
    if (!user) {
      clear();
      return;
    }
    setAuthUser({
      uid: user.uid,
      email: user.email
    });
    setIsLoading(false);
  };


  const signOut = () => authSignOut(auth).then(clear);

  useEffect(() =>{
    const unsubscribe = onAuthStateChanged(auth, authStateChanged);
    return () => unsubscribe();
  }, []);

  return {
    authUser,
    isLoading,
    signOut
  }
}


export function AuthUserProvider({children}) {
  const auth = useFirebaseAuth();

  return  <AuthUserContext.Provider value={auth}>{children}</AuthUserContext.Provider>
}

export const useAuth = () => useContext(AuthUserContext);

// export function AuthProvider({children, value}) {
//   return (
//     <AuthContext.Provider value={value}>
//       {children}
//     </AuthContext.Provider>
//   )
// }

// export function useAuthValue(){
//   return useContext(AuthContext)
// }
