import React from "react"
import {BrowserRouter as Router, Route, Switch} from "react-router-dom"

import Builder from "./components/Builder";
import Viewer from "./components/Viewer";
import DashBoard from "./components/Dashboard";

const App = () => (
  <Router>
    <Switch>
      <Route path="/" exact component={DashBoard} />
      <Route path="/builder" component={Builder} />
      <Route path="/viewer" component={Viewer} />
    </Switch>
  </Router>
)

export default App
