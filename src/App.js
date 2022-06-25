import React from 'react';
import './App.scss';
import HomePage from "./pages/HomePage/HomePage";
import DocumentsPage from "./pages/DocumentsPage/DocumentsPage";
import PageNavigation from "./components/PageNavigation/PageNavigation";
import {BrowserRouter, Switch, Route} from "react-router-dom";

class App extends React.Component {

  render()  {

    return (
      <BrowserRouter>
        <PageNavigation />
        <Switch>
          <Route path="/" exact component={HomePage}/>
          <Route path="/documents" component={DocumentsPage}/>
        </Switch>
      </BrowserRouter>
    );
  }
}

export default App;
