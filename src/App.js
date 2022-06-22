import React from 'react';
import './App.scss';
import HomePage from "./pages/HomePage/HomePage";
import PageNavigation from "./components/PageNavigation/PageNavigation";
import {BrowserRouter, Switch, Route} from "react-router-dom";

class App extends React.Component {

  render()  {
    return (
      <BrowserRouter>
        <PageNavigation />
        <Switch>
          <Route path="/" exact component={HomePage}/>
        </Switch>
      </BrowserRouter>
    );
  }
}

export default App;
