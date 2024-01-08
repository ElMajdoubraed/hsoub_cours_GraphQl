import React from "react";
export default React.createContext({
  token: null as any,
  username: null as any,
  userId: null as any,
  login: () => {},
  logout: () => {},
});
