import React from "react";
import { HashRouter as Router, Route, Routes } from "react-router-dom";
import Auth from "../routes/Auth";
import Home from "../routes/Home";
import Navigation from "components/Navigation";
import Profile from "routes/Profile";

const AppRouter = ({ refreshUser, isLoggedIn, userObj }) => {
  return (
    <div
      style={{
        maxWidth: 890,
        width: "100%",
        margin: "0 auto",
        marginTop: 80,
        display: "flex",
        justifyContent: "center",
      }}
    >
      <Router>
        {isLoggedIn && <Navigation userObj={userObj} />}
        <Routes>
          {isLoggedIn ? (
            <>
              <Route
                exact={true}
                path={"/"}
                element={<Home userObj={userObj} />}
              ></Route>
              <Route
                exact={true}
                path={"/Profile"}
                element={
                  <Profile userObj={userObj} refreshUser={refreshUser} />
                }
              ></Route>
            </>
          ) : (
            <Route exact={true} path={"/"} element={<Auth />}></Route>
          )}
        </Routes>
      </Router>
    </div>
  );
};

export default AppRouter;
