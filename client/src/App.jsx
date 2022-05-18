import './App.css';
import {
  BrowserRouter, //tells the application we can enable routing
  Switch, //allows us to indicate which routes we have and which components should show in specific routes
  Route, //allows us to define the route paths and which components belong to specific route paths
  Link  //just like an a href but it wont reload the page. You can format this as a button using bootstrap
} from "react-router-dom";
//import Component from path

import SignIn from './components/SignIn';
import Dashboard from './components/Dashboard';

function App() {
  return (
    <BrowserRouter>
      <div className="App container">
        <Switch>

          <Route exact path="/">
            <SignIn></SignIn>
          </Route>

          <Route exact path="/dashboard">
            <Dashboard></Dashboard>
          </Route>

        </Switch>
      </div>
    </BrowserRouter>
  )
}

export default App;
