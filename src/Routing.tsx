import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { SignUp } from "./pages/authentication/SignUp";
import { SignIn } from "./pages/authentication/SignIn";
import { Home } from "./pages/Home/Home";
import { Provider } from "react-redux";
import { songStore } from "./redux/store/songStore";
import { Library } from "./pages/Library/Library";
import { SongPlayer } from "./Player/SongPlayer";
import Explore from "./pages/explore/Explore";

export const Routing = () => {
  return (
    <Router>
      <Provider store={songStore}>
        <Routes>
          <Route path="/" element={<Home />}></Route>
          <Route path="/signup" element={<SignUp />} />
          <Route path="/signin" element={<SignIn />} />
          <Route path="/library" element={<Library />}></Route>
          <Route path="/explore" element={<Explore />}></Route>
        </Routes>
        <SongPlayer />
      </Provider>
    </Router>
  );
};
