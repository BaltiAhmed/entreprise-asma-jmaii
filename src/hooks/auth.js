import { useState, useCallback, useEffect } from "react";



export const UserAuth = () => {
  const [token, setToken] = useState(false);
  const [userId, setUserId] = useState(false);
  const [user,Setuser]=useState(false)

  const login = useCallback((uid, token,user) => {
    setToken(token);
    setUserId(uid);
    Setuser(user)

    localStorage.setItem(
      "userData",
      JSON.stringify({
        userId: uid,
        token: token,
        user:user
      })
    );
  }, []);

  const logout = useCallback(() => {
    setToken(null);
    setUserId(null);
    Setuser(null)
    localStorage.removeItem("userData");
  }, []);



  useEffect(() => {
    const storedData = JSON.parse(localStorage.getItem("userData"));
    if (
      storedData &&
      storedData.token 
    ) {
      login(
        storedData.userId,
        storedData.token,
        storedData.user
      );
    }
  }, [login]);

  return { token, login, logout, userId,user };
};
