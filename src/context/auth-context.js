import { createContext } from "react";

export const Authcontext = createContext({
  user:null,
  userId: null,
  token: null,
  login: () => {},
  logout: () => {}
});
