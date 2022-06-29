import React, {useContext} from "react";
import "./App.scss";
import HomePage from "./pages/HomePage/HomePage";
import DocumentsPage from "./pages/DocumentsPage/DocumentsPage";
import PageNavigation from "./components/PageNavigation/PageNavigation";
import Footer from "./components/Footer/Footer";
import AddDocumentPage from "./pages/AddDocumentPage/AddDocumentPage";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import { AuthProvider } from "./Contexts/AuthContext";

class App extends React.Component {

  render() {
    return (
      <AuthProvider>
        <BrowserRouter>
          <PageNavigation />
          <Switch>
            <Route path="/" exact component={HomePage} />
            <Route path="/documents" exact component={DocumentsPage} />
            <Route path="/documents/add" component={AddDocumentPage} />
            {/* <AuthRoute authenticated={this.state.authenticated} path="/documents" render={props => <DocumentsPage {...props}/>}/> */}
          </Switch>
          <Footer />
        </BrowserRouter>
      </AuthProvider>
    );
  }
}

export default App;
