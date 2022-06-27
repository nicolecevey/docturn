import React, {useContext} from "react";
import "./App.scss";
import HomePage from "./pages/HomePage/HomePage";
import DocumentsPage from "./pages/DocumentsPage/DocumentsPage";
import PageNavigation from "./components/PageNavigation/PageNavigation";
import Footer from "./components/Footer/Footer";
import AddDocumentPage from "./pages/AddDocumentPage/AddDocumentPage";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import AuthRoute from "./components/AuthRoute/AuthRoute";

class App extends React.Component {
  state = {
    authenticated: null,
  };

  componentDidMount(){
    this.setState({
      authenticated: sessionStorage.authToken,
    })
  }

  componentDidUpdate(prevState){
    if(!prevState.authenticated && sessionStorage.authToken){
      this.setState({
        authenticated: sessionStorage.authToken,
      })
    }
  }

  render() {
    return (
      <BrowserRouter>
        <PageNavigation />
        <Switch>
          <Route path="/" exact component={HomePage} />
          <Route path="/documents" component={DocumentsPage} />
          <Route path="/documents/add" component={AddDocumentPage} />
          <AuthRoute authenticated={this.state.authenticated} path="/documents" render={props => <DocumentsPage {...props}/>}/>
        </Switch>
        <Footer />
      </BrowserRouter>
    );
  }
}

export default App;
