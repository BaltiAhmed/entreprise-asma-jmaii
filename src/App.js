import { UserAuth } from "./hooks/auth";
import { Authcontext } from "./context/auth-context";
import { Route, BrowserRouter } from "react-router-dom";
import Home from "./pages/home";
import NavBar from "./components/navBar";
import Signup from "./pages/signup";
import React from "react";
import AjoutOffre from "./pages/ajoutAnnoces";
import ListOffre from "./pages/listeOffre";
import Footer from "./components/footer";
import UpdateOffre from "./pages/updateAnnoce";
import ListeCondidat from "./pages/listeCondidat";

function App() {
  const { userId, token, login, logout, user } = UserAuth();

  let routes;
  if (token) {
    routes = (
      <React.Fragment>
        <Route path="/" exact component={Home} />
        <Route path="/ajout"  component={AjoutOffre} />
        <Route path="/offre"  component={ListOffre} />
        <Route path="/update-offre/:id"  component={UpdateOffre} />
        <Route path="/liste-condidat/:id"  component={ListeCondidat} />
      </React.Fragment>
    );
  } else {
    routes = (
      <React.Fragment>
        <Route path="/" exact component={Home} />
        <Route path="/signup" exact component={Signup} />
      </React.Fragment>
    );
  }
  return (
    <Authcontext.Provider
      value={{
        userId: userId,
        token: token,
        login: login,
        logout: logout,
        user: user,
      }}
    >
      <BrowserRouter>
        <NavBar />
        {routes}
        <Footer/>
      </BrowserRouter>
    </Authcontext.Provider>
  );
}

export default App;
