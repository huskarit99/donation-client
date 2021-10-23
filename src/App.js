import React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";

import "./App.css";
import Home from "./pages/Home/Home";
import Cart from "./pages/Cart/Cart";
import Login from "./pages/Login/Login";
import Detail from "./pages/Detail/Detail";
import TopVip from "./pages/TopVip/TopVip";
import Statistics from "./pages/Statistics/Statistics";
import PrivateRoute from "./parts/components/PrivateRoute/PrivateRoute";
const App = () => {
  return (
    <BrowserRouter>
      <Switch>
        <PrivateRoute exact path="/statistics" component={Statistics} />
        <PrivateRoute exact path="/statistics/top-vip" component={TopVip} />
        <PrivateRoute exact path="/statistics/detail/:id" component={Detail} />
        <PrivateRoute exact path="/login" component={Login} />
        <Route exact path="/cart" component={Cart} />
        <Route path="/page/:page" component={Home} />
        <Route path="/" component={Home} />
      </Switch>
    </BrowserRouter>
  );
};

export default App;
