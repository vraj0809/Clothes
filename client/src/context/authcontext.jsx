import React from "react";
import { authDataContext as AuthDataContext } from "./contexts";
function AuthContext({ children }) {
  // Leave empty to use Vercel API proxy
  const serverurl = "";
  const value = {
    serverurl
  };

  return (
    <AuthDataContext.Provider value={value}>
      {children}
    </AuthDataContext.Provider>
  );
}

export default AuthContext;
