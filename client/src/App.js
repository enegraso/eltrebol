import "./App.css";
import {
  BrowserRouter as Router,
  Route,
  Redirect,
  Switch,
} from "react-router-dom";

import NavBar from "./components/navBar";
import Home from "./views/home";
import LogIn from "./views/login";

function App() {
  return (
    <div className="App">
      <NavBar />
        <Switch>
          <Route path="/" exact>
            <Home />
          </Route>
          <Route path="/login" exact>
            <LogIn />
          </Route>
          <Redirect to="/" />
        </Switch>
    </div>
  );
}

export default App;
